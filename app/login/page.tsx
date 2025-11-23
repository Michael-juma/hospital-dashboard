"use client"

import React from "react"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "../../components/ui/label"
import Link from "next/link"
import { Hospital, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const role = searchParams.get("role") || "patient"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      const data = await response.json()
      router.push(`/${role}/dashboard`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <style>{`
        @keyframes slow-pan {
          0% { transform: scale(1.06) translateY(0px); }
          50% { transform: scale(1.12) translateY(-6px); }
          100% { transform: scale(1.06) translateY(0px); }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="https://i.pinimg.com/736x/9e/07/5c/9e075c505f35b79b592a0ebae0d88538.jpg"
          alt="decorative background"
          className="w-full h-full object-cover filter blur-[2px] opacity-50"
          style={{ animation: "slow-pan 18s ease-in-out infinite", transformOrigin: "center" }}
        />
        {/* subtle gradient to focus the card */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-white/20 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,_rgba(0,0,0,0.03)_100%)]" />
      </div>

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
          <h2 className="text-2xl font-bold mb-2 text-center text-slate-900 capitalize">Sign in as {role}</h2>
          <p className="text-sm text-slate-600 text-center mb-8">Enter your credentials to access the system</p>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center gap-2">
                <span className="text-lg">!</span>
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-slate-700 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="mt-2 border-slate-300"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-700 font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="mt-2 border-slate-300"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 mt-6"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200 space-y-3 text-center text-sm">
            <p className="text-slate-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-teal-600 hover:text-teal-700 font-semibold">
                Create one
              </Link>
            </p>
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
