import { type NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { hashPassword, createToken, setSessionCookie } from '../../../lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json()

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const normalizedRole = String(role).toUpperCase()
    if (!['RECEPTIONIST', 'ADMIN', 'DOCTOR', 'NURSE', 'PATIENT'].includes(normalizedRole)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 })
    }

    const hashed = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: normalizedRole as any,
      },
    })

    const token = createToken({ userId: user.id, role: user.role })

    const response = NextResponse.json({ message: 'Account created', user: { id: user.id, name: user.name, email: user.email, role: user.role } }, { status: 201 })
    setSessionCookie(response, token)
    return response
  } catch (error) {
    console.error('Signup error', error)
    return NextResponse.json({ error: 'Failed to create account' }, { status: 500 })
  }
}
