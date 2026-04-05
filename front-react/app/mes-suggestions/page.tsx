"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Lightbulb, 
  AlertTriangle, 
  Rocket, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Search,
  Filter,
  FileText,
  Calendar
} from "lucide-react"

// Données simulées pour la démo
const mockSuggestions = [
  {
    id: 1,
    type: "suggestion",
    message: "Il serait utile d'avoir plus de prises électriques dans la salle de lecture pour pouvoir charger nos ordinateurs pendant les révisions.",
    date: "2024-01-15",
    status: "en_cours",
    promotion: "L3",
  },
  {
    id: 2,
    type: "probleme",
    message: "Le projecteur de l'amphi B ne fonctionne pas correctement depuis plusieurs semaines. L'image est floue et les couleurs sont altérées.",
    date: "2024-01-12",
    status: "resolu",
    promotion: "M1",
  },
  {
    id: 3,
    type: "idee",
    message: "Organiser des hackathons mensuels pour permettre aux étudiants de travailler sur des projets innovants et de développer leur portfolio.",
    date: "2024-01-10",
    status: "en_attente",
    promotion: "L2",
  },
  {
    id: 4,
    type: "suggestion",
    message: "Mettre en place un système de mentorat entre les étudiants de Master et ceux de Licence pour faciliter l'intégration et le partage de connaissances.",
    date: "2024-01-08",
    status: "approuve",
    promotion: "M2",
  },
  {
    id: 5,
    type: "probleme",
    message: "La connexion WiFi est très instable dans le bâtiment principal, ce qui rend difficile l'accès aux ressources en ligne pendant les cours.",
    date: "2024-01-05",
    status: "en_cours",
    promotion: "L1",
  },
]

const typeConfig = {
  suggestion: { icon: Lightbulb, color: "bg-amber-500/10 text-amber-600", label: "Suggestion" },
  probleme: { icon: AlertTriangle, color: "bg-red-500/10 text-red-600", label: "Problème" },
  idee: { icon: Rocket, color: "bg-primary/10 text-primary", label: "Idée" },
}

const statusConfig = {
  en_attente: { icon: Clock, color: "bg-muted text-muted-foreground", label: "En attente" },
  en_cours: { icon: Clock, color: "bg-amber-500/10 text-amber-600", label: "En cours" },
  approuve: { icon: CheckCircle2, color: "bg-accent/10 text-accent", label: "Approuvé" },
  resolu: { icon: CheckCircle2, color: "bg-accent/10 text-accent", label: "Résolu" },
  rejete: { icon: XCircle, color: "bg-red-500/10 text-red-600", label: "Rejeté" },
}

export default function MesSuggestionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("toutes")

  const filteredSuggestions = mockSuggestions.filter((suggestion) => {
    const matchesSearch = suggestion.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "toutes" || suggestion.type === activeTab
    return matchesSearch && matchesTab
  })

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Mes Suggestions</h1>
              <p className="text-muted-foreground">
                Consultez l&apos;historique des suggestions soumises et leur statut de traitement
              </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Rechercher dans les suggestions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button variant="outline" className="h-12 gap-2">
                <Filter className="w-4 h-4" />
                Filtrer
              </Button>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid grid-cols-4 h-12">
                <TabsTrigger value="toutes" className="gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Toutes</span>
                </TabsTrigger>
                <TabsTrigger value="suggestion" className="gap-2">
                  <Lightbulb className="w-4 h-4" />
                  <span className="hidden sm:inline">Suggestions</span>
                </TabsTrigger>
                <TabsTrigger value="probleme" className="gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="hidden sm:inline">Problèmes</span>
                </TabsTrigger>
                <TabsTrigger value="idee" className="gap-2">
                  <Rocket className="w-4 h-4" />
                  <span className="hidden sm:inline">Idées</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                {filteredSuggestions.length === 0 ? (
                  <Card className="border-dashed">
                    <CardContent className="py-12 text-center">
                      <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Aucune suggestion trouvée
                      </h3>
                      <p className="text-muted-foreground">
                        {searchQuery
                          ? "Essayez avec d'autres termes de recherche"
                          : "Vous n'avez pas encore soumis de suggestions"}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {filteredSuggestions.map((suggestion) => {
                      const TypeIcon = typeConfig[suggestion.type as keyof typeof typeConfig].icon
                      const StatusIcon = statusConfig[suggestion.status as keyof typeof statusConfig].icon

                      return (
                        <Card key={suggestion.id} className="hover:shadow-lg transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <Badge
                                  variant="secondary"
                                  className={typeConfig[suggestion.type as keyof typeof typeConfig].color}
                                >
                                  <TypeIcon className="w-3.5 h-3.5 mr-1.5" />
                                  {typeConfig[suggestion.type as keyof typeof typeConfig].label}
                                </Badge>
                                <Badge variant="outline" className="text-muted-foreground">
                                  {suggestion.promotion}
                                </Badge>
                              </div>
                              <Badge
                                variant="secondary"
                                className={statusConfig[suggestion.status as keyof typeof statusConfig].color}
                              >
                                <StatusIcon className="w-3.5 h-3.5 mr-1.5" />
                                {statusConfig[suggestion.status as keyof typeof statusConfig].label}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-foreground leading-relaxed mb-4">
                              {suggestion.message}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>
                                Soumis le{" "}
                                {new Date(suggestion.date).toLocaleDateString("fr-FR", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
