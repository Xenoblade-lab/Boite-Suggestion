"use client"

import { useState } from "react"
import { Search, Filter, Eye, CheckCircle2, Clock, XCircle, MessageSquare, Trash2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

type Suggestion = {
  id: string
  name: string
  promotion: string
  type: "suggestion" | "problem" | "idea"
  message: string
  date: string
  status: "pending" | "in-progress" | "resolved" | "approved"
  isAnonymous: boolean
}

const mockSuggestions: Suggestion[] = [
  {
    id: "1",
    name: "Ahmed Ben Ali",
    promotion: "2023",
    type: "suggestion",
    message: "Améliorer les équipements du laboratoire d'informatique",
    date: "2024-04-03",
    status: "in-progress",
    isAnonymous: false,
  },
  {
    id: "2",
    name: "Anonymous",
    promotion: "",
    type: "problem",
    message: "Les salles ne sont pas assez climatisées",
    date: "2024-04-02",
    status: "pending",
    isAnonymous: true,
  },
  {
    id: "3",
    name: "Fatima Khaled",
    promotion: "2024",
    type: "idea",
    message: "Créer un club de développement logiciel",
    date: "2024-04-01",
    status: "approved",
    isAnonymous: false,
  },
  {
    id: "4",
    name: "Anonymous",
    promotion: "",
    type: "problem",
    message: "Augmenter les heures d'ouverture de la bibliothèque",
    date: "2024-03-31",
    status: "resolved",
    isAnonymous: true,
  },
]

const statusConfig = {
  pending: { label: "En attente", icon: Clock, color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  "in-progress": { label: "En cours", icon: MessageSquare, color: "bg-blue-50 text-blue-700 border-blue-200" },
  resolved: { label: "Résolu", icon: CheckCircle2, color: "bg-green-50 text-green-700 border-green-200" },
  approved: { label: "Approuvé", icon: CheckCircle2, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
}

const typeConfig = {
  suggestion: { label: "Suggestion", color: "bg-purple-50 text-purple-700 border-purple-200" },
  problem: { label: "Problème", color: "bg-red-50 text-red-700 border-red-200" },
  idea: { label: "Idée", color: "bg-orange-50 text-orange-700 border-orange-200" },
}

export default function AdminPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(mockSuggestions)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "suggestion" | "problem" | "idea">("all")
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "in-progress" | "resolved" | "approved">("all")
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null)
  const [response, setResponse] = useState("")

  const filteredSuggestions = suggestions.filter((s) => {
    const matchesSearch = s.message.toLowerCase().includes(searchTerm.toLowerCase()) || s.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || s.type === filterType
    const matchesStatus = filterStatus === "all" || s.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const handleStatusChange = (id: string, newStatus: Suggestion["status"]) => {
    setSuggestions(suggestions.map((s) => (s.id === id ? { ...s, status: newStatus } : s)))
  }

  const handleDelete = (id: string) => {
    setSuggestions(suggestions.filter((s) => s.id !== id))
  }

  const handleSendResponse = () => {
    if (selectedSuggestion && response.trim()) {
      console.log("Réponse envoyée à:", selectedSuggestion.id, response)
      setResponse("")
      setSelectedSuggestion(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Tableau de Bord Admin</h1>
          <p className="text-muted-foreground">Gérez toutes les suggestions et préoccupations des étudiants</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="text-sm font-medium text-muted-foreground mb-2">Total</div>
            <div className="text-3xl font-bold text-primary">{suggestions.length}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-medium text-muted-foreground mb-2">En attente</div>
            <div className="text-3xl font-bold text-yellow-600">
              {suggestions.filter((s) => s.status === "pending").length}
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-medium text-muted-foreground mb-2">Résolus</div>
            <div className="text-3xl font-bold text-green-600">
              {suggestions.filter((s) => s.status === "resolved").length}
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-medium text-muted-foreground mb-2">Approuvés</div>
            <div className="text-3xl font-bold text-emerald-600">
              {suggestions.filter((s) => s.status === "approved").length}
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="suggestion">Suggestion</SelectItem>
                <SelectItem value="problem">Problème</SelectItem>
                <SelectItem value="idea">Idée</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="in-progress">En cours</SelectItem>
                <SelectItem value="resolved">Résolu</SelectItem>
                <SelectItem value="approved">Approuvé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Auteur</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Message</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Statut</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredSuggestions.map((suggestion) => {
                  const TypeIcon = typeConfig[suggestion.type]
                  const StatusIcon = statusConfig[suggestion.status].icon
                  return (
                    <tr key={suggestion.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm">
                        <div>
                          <div className="font-medium text-foreground">{suggestion.name}</div>
                          {!suggestion.isAnonymous && (
                            <div className="text-xs text-muted-foreground">Promo {suggestion.promotion}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Badge className={`${typeConfig[suggestion.type].color} border`}>
                          {typeConfig[suggestion.type].label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground max-w-xs truncate">
                        {suggestion.message}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Select
                          value={suggestion.status}
                          onValueChange={(value: any) => handleStatusChange(suggestion.id, value)}
                        >
                          <SelectTrigger className={`w-32 ${statusConfig[suggestion.status].color}`}>
                            <div className="flex items-center gap-2">
                              <StatusIcon className="w-4 h-4" />
                              <SelectValue />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">En attente</SelectItem>
                            <SelectItem value="in-progress">En cours</SelectItem>
                            <SelectItem value="resolved">Résolu</SelectItem>
                            <SelectItem value="approved">Approuvé</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{suggestion.date}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setSelectedSuggestion(suggestion)}
                              >
                                <MessageSquare className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Répondre à la suggestion</DialogTitle>
                                <DialogDescription>
                                  {selectedSuggestion?.message}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <Textarea
                                  placeholder="Votre réponse..."
                                  value={response}
                                  onChange={(e) => setResponse(e.target.value)}
                                  className="min-h-32"
                                />
                                <Button onClick={handleSendResponse} className="w-full">
                                  <Send className="w-4 h-4 mr-2" />
                                  Envoyer la réponse
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(suggestion.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {filteredSuggestions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucune suggestion trouvée</p>
          </div>
        )}
      </div>
    </div>
  )
}
