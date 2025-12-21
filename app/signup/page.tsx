"use client"

import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Hospital, ArrowLeft } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("patient")
  const [autoLogin, setAutoLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      })

      if (!response.ok) {
        const ct = response.headers.get('content-type') || ''
        const body = ct.includes('application/json') ? await response.json().catch(() => ({})) : await response.text().catch(() => '')
        const msg = (body && body.error) || (typeof body === 'string' && body) || 'Signup failed'
        throw new Error(msg)
      }

      // If signup succeeds the server sets the session cookie.
      // If user wants auto-login, just redirect to their dashboard.
      if (autoLogin) {
        router.push(`/${role}/dashboard`)
      } else {
        router.push(`/login?role=${role}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50 flex flex-col items-center justify-center p-4">
      <div className="relative z-10">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4 gap-2">
            <div className="p-2 bg-gradient-to-br from-teal-600 to-blue-600 rounded-lg">
              <Hospital className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">MediCare</span>
          </div>
        </div>

        <Card className="w-full max-w-md p-8 shadow-xl bg-white/80 backdrop-blur-sm ring-1 ring-white/60 border border-white/20">
          <h2 className="text-2xl font-bold mb-2 text-center text-slate-900">Create an account</h2>
          <p className="text-sm text-slate-600 text-center mb-8">Register a new account and optionally sign in automatically</p>

          <form onSubmit={handleSignup} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center gap-2">
                <span className="text-lg">!</span>
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="name" className="text-slate-700 font-medium">Full name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} className="mt-2" />
            </div>

            <div>
              <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} className="mt-2" />
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} className="mt-2" />
            </div>

            <div>
              <Label htmlFor="role" className="text-slate-700 font-medium">Role</Label>
              <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="mt-2 w-full p-2 border rounded">
                <option value="patient">Patient</option>
                <option value="receptionist">Receptionist</option>
                <option value="doctor">Doctor</option>
                <option value="nurse">Nurse</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input id="auto" type="checkbox" checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)} />
              <Label htmlFor="auto" className="text-slate-700">Sign me in after creating the account</Label>
            </div>

            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 mt-6" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200 space-y-3 text-center text-sm">
            <p className="text-slate-600">Already have an account? <Link href="/login" className="text-teal-600 hover:text-teal-700 font-semibold">Sign in</Link></p>
            <Link href="/" className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </div>
        </Card>
      </div>
    </main>
  )
}
