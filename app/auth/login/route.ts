import { type NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { verifyPassword, createToken, setSessionCookie } from '../../../lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

    const ok = await verifyPassword(password, user.password)
    if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

    const token = createToken({ userId: user.id, role: user.role })
    const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, message: 'Login successful' }, { status: 200 })
    setSessionCookie(response, token)
    return response
  } catch (error) {
    console.error('Login error', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
