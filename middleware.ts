import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const protectedRoutes = {
  patient: ["/patient"],
  doctor: ["/doctor"],
  nurse: ["/nurse"],
  receptionist: ["/receptionist"],
  pharmacy: ["/pharmacy"],
  admin: ["/admin"],
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for public routes
  if (pathname === "/" || pathname === "/login") {
    return NextResponse.next()
  }

  // Add authentication logic here
  const hasSession = request.cookies.get("session")?.value

  if (!hasSession && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Get user role from session (TODO: implement proper session management)
  const userRole = request.cookies.get("userRole")?.value || "patient"

  // Only receptionists can access patient registration
  if (pathname.includes("/receptionist/register-patient")) {
    if (userRole !== "receptionist") {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  // Doctors can access patients to update medications
  if (pathname.includes("/doctor/patients")) {
    if (userRole !== "doctor") {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
