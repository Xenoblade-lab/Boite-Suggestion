"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Lightbulb, 
  AlertTriangle, 
  Rocket, 
  MessageSquare,
  CheckCircle2,
  Clock,
  TrendingUp,
  Users
} from "lucide-react"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, Pie, PieChart, Cell } from "recharts"

// Données simulées pour les statistiques
const statsOverview = [
  { label: "Total soumissions", value: 156, icon: MessageSquare, color: "bg-primary/10 text-primary" },
  { label: "Suggestions", value: 78, icon: Lightbulb, color: "bg-amber-500/10 text-amber-600" },
  { label: "Problèmes signalés", value: 45, icon: AlertTriangle, color: "bg-red-500/10 text-red-600" },
  { label: "Idées innovantes", value: 33, icon: Rocket, color: "bg-accent/10 text-accent" },
]

const monthlyData = [
  { month: "Sept", suggestions: 12, problemes: 8, idees: 5 },
  { month: "Oct", suggestions: 18, problemes: 10, idees: 7 },
  { month: "Nov", suggestions: 15, problemes: 12, idees: 9 },
  { month: "Dec", suggestions: 10, problemes: 5, idees: 4 },
  { month: "Jan", suggestions: 23, problemes: 10, idees: 8 },
]

const statusData = [
  { name: "Résolu", value: 45, fill: "var(--chart-2)" },
  { name: "En cours", value: 38, fill: "var(--chart-3)" },
  { name: "En attente", value: 52, fill: "var(--chart-1)" },
  { name: "Approuvé", value: 21, fill: "var(--chart-4)" },
]

const promotionData = [
  { promotion: "L1", count: 28 },
  { promotion: "L2", count: 35 },
  { promotion: "L3", count: 42 },
  { promotion: "M1", count: 31 },
  { promotion: "M2", count: 20 },
]

const barChartConfig = {
  suggestions: {
    label: "Suggestions",
    color: "var(--chart-3)",
  },
  problemes: {
    label: "Problèmes",
    color: "var(--destructive)",
  },
  idees: {
    label: "Idées",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const promotionChartConfig = {
  count: {
    label: "Soumissions",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export default function StatistiquesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Statistiques</h1>
              <p className="text-muted-foreground">
                Aperçu des tendances et statistiques des soumissions étudiantes
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {statsOverview.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.label}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {/* Monthly Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Évolution mensuelle
                  </CardTitle>
                  <CardDescription>
                    Nombre de soumissions par type sur les 5 derniers mois
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={barChartConfig} className="h-[300px] w-full">
                    <BarChart data={monthlyData}>
                      <XAxis dataKey="month" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="suggestions" fill="var(--chart-3)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="problemes" fill="var(--destructive)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="idees" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    Répartition par statut
                  </CardTitle>
                  <CardDescription>
                    État actuel du traitement des soumissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-[300px] w-full">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Participation by Promotion */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Participation par promotion
                </CardTitle>
                <CardDescription>
                  Nombre de soumissions par niveau d&apos;études
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={promotionChartConfig} className="h-[250px] w-full">
                  <BarChart data={promotionData} layout="vertical">
                    <XAxis type="number" tickLine={false} axisLine={false} />
                    <YAxis dataKey="promotion" type="category" tickLine={false} axisLine={false} width={40} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--chart-1)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Quick Stats Cards */}
            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <Card className="bg-accent/5 border-accent/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-accent" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">87%</p>
                      <p className="text-sm text-muted-foreground">Taux de résolution</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Clock className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">3.2 jours</p>
                      <p className="text-sm text-muted-foreground">Temps moyen de réponse</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-amber-500/5 border-amber-500/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-amber-600" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">+24%</p>
                      <p className="text-sm text-muted-foreground">Participation ce mois</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
