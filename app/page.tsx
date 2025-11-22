// Landing page with authentication options
// Cache buster: rebuild triggered
import Link from "next/link"
import { Button } from "../components/ui/button"
import Card from "@/components/ui/card"
import { Hospital, Users, Heart, Pill, BarChart3, Activity, Clock, Shield } from "lucide-react"

export default function HomePage() {
  const roles = [
    {
      title: "Patient",
      icon: Users,
      description: "View your health records, bills, and medication reminders",
      href: "/login?role=patient",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
    },
    {
      title: "Doctor",
      icon: Heart,
      description: "Manage patient diagnoses and treatment plans",
      href: "/login?role=doctor",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Nurse",
      icon: Pill,
      description: "Track medications and patient care updates",
      href: "/login?role=nurse",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
    },
    {
      title: "Receptionist",
      icon: Users,
      description: "Register new patients and manage appointments",
      href: "/login?role=receptionist",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ]

  const features = [
    {
      icon: BarChart3,
      title: "Smart Billing",
      description: "Automatic calculation of charges with insurance deductions",
    },
    {
      icon: Pill,
      title: "Medication Tracking",
      description: "Personalized reminders to prevent medication errors",
    },
    {
      icon: Heart,
      title: "AI Assistant",
      description: "Patient-friendly AI for health questions",
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Instant notifications and status changes",
    },
    {
      icon: Shield,
      title: "Secure & HIPAA",
      description: "Enterprise-grade security for patient data",
    },
    {
      icon: Activity,
      title: "Health Monitoring",
      description: "Track vital signs and patient progress",
    },
  ]

  const heroImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/images/hero-healthcare-4sjsyDxIMbqIt6DixFZMjrRQ3USeu8.jpg"

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-teal-600 to-blue-600 rounded-lg">
              <Hospital className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">MediCare</span>
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <a href="#features" className="text-sm text-slate-600 hover:text-slate-900">
              Features
            </a>
            <Button asChild size="sm" className="bg-teal-600 hover:bg-teal-700">
              <Link href="/login?role=patient">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4">
        {/* Hero with Image */}
        <div className="py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="mb-6 inline-block">
              <span className="px-3 py-1 bg-teal-100 text-teal-700 text-sm font-medium rounded-full">
                Modern Healthcare Management
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 text-balance">
              Streamlined Hospital Care for Everyone
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mb-8 text-balance">
              Unified platform for patients, doctors, nurses, and administrative staff to collaborate seamlessly
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
                <Link href="/login?role=patient">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={heroImage || "/placeholder.svg"}
              alt="Healthcare professionals working together"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Role Selection */}
        <div className="py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Select Your Role</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role) => {
              const Icon = role.icon
              return (
                <Card
                  key={role.title}
                  className={`p-6 hover:shadow-lg transition-all duration-300 border-2 border-slate-200 hover:border-teal-500 group ${role.bgColor}`}
                >
                  <div className={`p-3 rounded-lg w-fit mb-4 ${role.bgColor} border border-current`}>
                    <Icon className={`w-6 h-6 ${role.color}`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-slate-900">{role.title}</h3>
                  <p className="text-sm text-slate-600 mb-6">{role.description}</p>
                  <Link href={role.href} className="block">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">Sign In</Button>
                  </Link>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Features with Images */}
        <div id="features" className="py-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, i) => {
              const Icon = feature.icon
              const images = [
                "https://i.pinimg.com/1200x/8b/83/f8/8b83f837ba741bc70e06c7fe0a66c367.jpg",
                "https://i.pinimg.com/1200x/18/2c/a7/182ca7f420be7d11cf979cefbb6f78f1.jpg",
                "https://i.pinimg.com/1200x/37/9d/dc/379ddcc32d24d5a7e712ab4d2a8a65cd.jpg",
                "https://i.pinimg.com/1200x/b3/2f/71/b32f71050a80b102107e7c8b86ee2501.jpg",
                "https://i.pinimg.com/736x/89/8b/7e/898b7eac0382b77db7cf493752305234.jpg",
                "https://i.pinimg.com/1200x/3e/7c/0c/3e7c0c2695d71d93e75a387688ce4ca5.jpg",
              ]
              return (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden border border-slate-200 hover:border-teal-200 hover:shadow-md transition-all group"
                >
                  <div className="h-40 bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center overflow-hidden">
                    <img
                      src={images[i % images.length] || "/placeholder.svg"}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="p-3 bg-teal-50 rounded-lg w-fit mb-4">
                      <Icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-slate-900">{feature.title}</h3>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 px-8 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl text-center mb-20">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/90 mb-8 text-lg">
            Join thousands of healthcare professionals managing patient care efficiently
          </p>
          <Button asChild size="lg" className="bg-white text-teal-600 hover:bg-slate-100 font-semibold">
            <Link href="/login?role=patient">Start Now</Link>
          </Button>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-200 py-8 text-center text-slate-600 mb-8">
          <p>Secure • HIPAA Compliant • Real-time Updates • Enterprise Grade</p>
        </footer>
      </div>
    </main>
  )
}
