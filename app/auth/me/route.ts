// Get current user
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("session")?.value

    if (!sessionCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const user = JSON.parse(sessionCookie)
    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 })
  }
}
