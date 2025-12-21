// Logout API route
import { type NextRequest, NextResponse } from 'next/server'
import { clearSessionCookie } from '../../../lib/auth'

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 })
  clearSessionCookie(response)
  return response
}
