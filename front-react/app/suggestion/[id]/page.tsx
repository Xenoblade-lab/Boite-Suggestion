"use client"

import { useState } from "react"
import { ArrowLeft, CheckCircle2, Clock, MessageSquare, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Comment = {
  id: string
  author: string
  role: "student" | "admin"
  content: string
  date: string
  avatar?: string
}

const mockSuggestion = {
  id: "1",
  author: "Ahmed Ben Ali",
  promotion: "2023",
  type: "suggestion",
  title: "Amélioration des équipements du laboratoire",
  message: "Je propose d'améliorer les équipements du laboratoire d'informatique. Les ordinateurs sont vieillissants et les logiciels ne sont pas à jour. Cela impacte notre apprentissage et notre productivité. Je suggère l'achat de nouveaux ordinateurs et la mise à jour des logiciels.",
  date: "2024-04-03",
  status: "in-progress" as const,
  isAnonymous: false,
}

const mockComments: Comment[] = [
  {
    id: "1",
    author: "Prof. Mohamed Karim",
    role: "admin",
    content: "Merci pour cette suggestion pertinente. Nous avons transmis votre demande à la direction. Une réunion est programmée la semaine prochaine pour discuter du budget.",
    date: "2024-04-03 10:30",
  },
  {
    id: "2",
    author: "Ahmed Ben Ali",
    role: "student",
    content: "Merci pour la réponse rapide. Y a-t-il une estimation du délai pour la mise à jour?",
    date: "2024-04-03 14:15",
  },
]

export default function SuggestionDetailPage({ params }: { params: { id: string } }) {
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState("")

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: String(comments.length + 1),
        author: "Vous",
        role: "student",
        content: newComment,
        date: new Date().toLocaleString("fr-FR"),
      }
      setComments([...comments, comment])
      setNewComment("")
    }
  }

  const statusConfig = {
    pending: { label: "En attente", icon: Clock, color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
    "in-progress": { label: "En cours", icon: MessageSquare, color: "bg-blue-50 text-blue-700 border-blue-200" },
    resolved: { label: "Résolu", icon: CheckCircle2, color: "bg-green-50 text-green-700 border-green-200" },
    approved: { label: "Approuvé", icon: CheckCircle2, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  }

  const typeConfig = {
    suggestion: "Suggestion",
    problem: "Problème",
    idea: "Idée",
  }

  const StatusIcon = statusConfig[mockSuggestion.status].icon

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/mes-suggestions">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">{mockSuggestion.title}</h1>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={`border ${
                      mockSuggestion.type === "suggestion"
                        ? "bg-purple-50 text-purple-700 border-purple-200"
                        : mockSuggestion.type === "problem"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-orange-50 text-orange-700 border-orange-200"
                    }`}>
                      {typeConfig[mockSuggestion.type]}
                    </Badge>
                    <Badge className={`border ${statusConfig[mockSuggestion.status].color}`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusConfig[mockSuggestion.status].label}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Author Info */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarFallback>{mockSuggestion.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-foreground">{mockSuggestion.author}</div>
                  {!mockSuggestion.isAnonymous && (
                    <div className="text-sm text-muted-foreground">Promo {mockSuggestion.promotion}</div>
                  )}
                  <div className="text-xs text-muted-foreground">{mockSuggestion.date}</div>
                </div>
              </div>

              <div className="border-t border-border pt-4 mt-4">
                <p className="text-foreground leading-relaxed">{mockSuggestion.message}</p>
              </div>
            </Card>

            {/* Comments Section */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Commentaires ({comments.length})
              </h3>

              <div className="space-y-4 mb-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-l-2 border-primary pl-4 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="font-medium text-foreground">{comment.author}</div>
                        {comment.role === "admin" && (
                          <Badge className="bg-primary text-primary-foreground text-xs">Admin</Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">{comment.date}</div>
                    </div>
                    <p className="text-foreground text-sm">{comment.content}</p>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="space-y-3">
                <Textarea
                  placeholder="Ajouter un commentaire..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-24"
                />
                <Button onClick={handleAddComment} className="w-full sm:w-auto">
                  Publier le commentaire
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="font-bold text-foreground mb-4">Informations</h4>
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-medium text-muted-foreground uppercase mb-1">ID</div>
                  <div className="text-sm text-foreground font-mono">#{mockSuggestion.id}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-foreground uppercase mb-1">Date de création</div>
                  <div className="text-sm text-foreground">{mockSuggestion.date}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-foreground uppercase mb-1">Catégorie</div>
                  <div className="text-sm text-foreground capitalize">{typeConfig[mockSuggestion.type]}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-foreground uppercase mb-1">Statut</div>
                  <div className="flex items-center gap-2">
                    <StatusIcon className="w-4 h-4" />
                    <span className="text-sm text-foreground">{statusConfig[mockSuggestion.status].label}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-accent/5 border-accent/20">
              <h4 className="font-bold text-foreground mb-2">Merci pour votre contribution!</h4>
              <p className="text-sm text-muted-foreground">
                Votre suggestion aide à améliorer la faculté. Nous examinerons votre demande dans les plus brefs délais.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
