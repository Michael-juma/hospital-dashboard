import { type NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '../../../lib/auth'
import prisma from '../../../lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('session')?.value
    if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const data = verifyToken(token)
    if (!data || !data.userId) return NextResponse.json({ error: 'Invalid session' }, { status: 401 })

    const user = await prisma.user.findUnique({ where: { id: String(data.userId) } })
    if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const safe = { id: user.id, name: user.name, email: user.email, role: user.role }
    return NextResponse.json({ user: safe }, { status: 200 })
  } catch (error) {
    console.error('Me error', error)
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
  }
}
