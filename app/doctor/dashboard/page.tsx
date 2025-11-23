// Doctor dashboard
"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, AlertCircle, CheckCircle2, Clock } from "lucide-react"

export default function DoctorDashboard() {
  const stats = [
    {
      title: "Total Patients",
      value: "24",
      description: "Under your care",
      icon: Users,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Pending Reviews",
      value: "8",
      description: "Require attention",
      icon: AlertCircle,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      title: "Active Treatments",
      value: "19",
      description: "Currently ongoing",
      icon: CheckCircle2,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Follow-ups Due",
      value: "5",
      description: "This week",
      icon: Clock,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ]

  return (
    <div className="p-8">
      {/* Hero Banner with Image */}
      <div className="mb-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl overflow-hidden shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 items-center">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2">Doctor Dashboard</h1>
            <p className="text-white/90 mb-4">Manage your patients efficiently and stay updated on their progress.</p>
            <p className="text-white/80">
              With 24 patients under your care, keep track of updates and pending reviews in one place.
            </p>
          </div>
          <div className="hidden lg:block">
            <img
              src="/images/doctor-consultation.jpg"
              alt="Doctor consultation"
              className="w-full h-48 object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2 text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Patients */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Recent Patient Updates</h2>
            <div className="space-y-4">
              {[
                {
                  name: "John Doe",
                  condition: "Type 2 Diabetes",
                  status: "Stable",
                  lastUpdate: "2 hours ago",
                },
                {
                  name: "Sarah Smith",
                  condition: "Hypertension",
                  status: "Needs Attention",
                  lastUpdate: "5 hours ago",
                },
                {
                  name: "Mike Johnson",
                  condition: "COPD",
                  status: "Improving",
                  lastUpdate: "1 day ago",
                },
              ].map((patient) => (
                <div key={patient.name} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">{patient.condition}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-medium ${
                        patient.status === "Stable"
                          ? "text-green-600"
                          : patient.status === "Improving"
                            ? "text-blue-600"
                            : "text-orange-600"
                      }`}
                    >
                      {patient.status}
                    </p>
                    <p className="text-xs text-muted-foreground">{patient.lastUpdate}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button className="w-full">Add Diagnosis</Button>
              <Button className="w-full bg-transparent" variant="outline">
                Prescribe Medication
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Update Treatment Plan
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Review Test Results
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
