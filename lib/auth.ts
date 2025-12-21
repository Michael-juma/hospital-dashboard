import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import prisma from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'change-me'
const COOKIE_NAME = process.env.COOKIE_NAME || 'session'
const TOKEN_EXPIRES_IN = 60 * 60 * 24 * 7 // 7 days in seconds

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export function createToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as any
  } catch (e) {
    return null
  }
}

export function setSessionCookie(response: any, token: string) {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: TOKEN_EXPIRES_IN,
    sameSite: 'lax',
    path: '/',
  })
}

export function clearSessionCookie(response: any) {
  response.cookies.delete(COOKIE_NAME)
}

export async function getCurrentUserFromRequest(request: Request | any) {
  // For route handlers using NextRequest or Node Request
  const token = request.cookies?.get?.('session')?.value ?? (cookies().get('session')?.value)
  if (!token) return null
  const data = verifyToken(token)
  if (!data || !data.userId) return null
  const user = await prisma.user.findUnique({ where: { id: data.userId } })
  return user
}
