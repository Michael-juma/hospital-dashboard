import { type NextRequest, NextResponse } from "next/server"

type ValidationResult = { isValid: boolean; reason?: string }

function validateQuestion(question: string): ValidationResult {
  if (!question || typeof question !== "string" || question.trim().length < 5) {
    return { isValid: false, reason: "Question is too short or invalid." }
  }

  const banned = ["suicide", "kill", "bomb", "harm"]
  const lower = question.toLowerCase()
  for (const word of banned) {
    if (lower.includes(word)) {
      return { isValid: false, reason: "Question contains disallowed content." }
    }
  }

  return { isValid: true }
}

function buildAIContextPrompt(context: unknown) {
  if (!context) return "You are a helpful healthcare assistant."
  if (typeof context === "string") return context
  try {
    return JSON.stringify(context)
  } catch {
    return "You are a helpful healthcare assistant."
  }
}

async function callOpenAI(prompt: string, systemPrompt?: string) {
  const key = process.env.OPENAI_API_KEY
  if (!key) {
    // Fallback for local development when no key is available
    return `AI service unavailable (no API key). Echo: ${prompt}`
  }

  const body = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemPrompt ?? "You are a helpful healthcare assistant." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 500,
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`OpenAI error: ${res.status} ${text}`)
  }

  const json = await res.json()
  const answer = json?.choices?.[0]?.message?.content
  return typeof answer === "string" ? answer.trim() : String(answer ?? "")
}

export async function POST(request: NextRequest) {
  try {
    const { patientId, question, context } = await request.json()

    // Validate inputs
    if (!patientId || !question) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate question for safety
    const validation = validateQuestion(question)
    if (!validation.isValid) {
      return NextResponse.json({ answer: validation.reason, isWarning: true }, { status: 200 })
    }

    // Build context prompt
    const contextPrompt = context ? buildAIContextPrompt(context) : "You are a helpful healthcare assistant."

    // Call OpenAI or fallback
    const answer = await callOpenAI(question, contextPrompt)

    // TODO: Save conversation to database for history
    return NextResponse.json(
      {
        patientId,
        question,
        answer,
        timestamp: new Date(),
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("AI Assistant error:", error)
    return NextResponse.json({ error: "Failed to process your question. Please try again." }, { status: 500 })
  }
}
