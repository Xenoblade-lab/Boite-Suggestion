"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle, Lightbulb, AlertCircle, Shield, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type FAQItem = {
  id: string
  question: string
  answer: string
  category: "general" | "submission" | "privacy" | "technical"
}

const faqItems: FAQItem[] = [
  {
    id: "1",
    category: "general",
    question: "Qu'est-ce que la boîte à suggestions FASI?",
    answer:
      "La boîte à suggestions FASI est une plateforme numérique qui permet aux étudiants de soumettre leurs suggestions, préoccupations et idées pour améliorer la Faculté des Sciences Informatiques. Cette plateforme facilite la communication entre les étudiants et l'administration pour une meilleure qualité de vie universitaire.",
  },
  {
    id: "2",
    category: "submission",
    question: "Comment soumettre une suggestion?",
    answer:
      "C'est très simple! Allez sur la page d'accueil, remplissez le formulaire en sélectionnant le type de contribution (suggestion, problème ou idée), entrez votre message et cliquez sur 'Envoyer'. Vous pouvez choisir de soumettre anonymement ou avec votre nom.",
  },
  {
    id: "3",
    category: "submission",
    question: "Quels types de contributions puis-je soumettre?",
    answer:
      "Vous pouvez soumettre trois types de contributions: les Suggestions (propositions d'amélioration), les Problèmes (signalements d'inconvénients), et les Idées (concepts novateurs). Chaque type aide l'administration à mieux comprendre et traiter votre contribution.",
  },
  {
    id: "4",
    category: "privacy",
    question: "Ma soumission est-elle confidentielle?",
    answer:
      "Oui! Vous pouvez choisir de soumettre anonymement. Si vous cochez l'option 'Soumission anonyme', votre nom et votre promotion ne seront pas collectés. L'administration ne pourra donc pas vous identifier. Vos données sont sécurisées et traitées de manière confidentielle.",
  },
  {
    id: "5",
    category: "privacy",
    question: "Que faire de mes données personnelles?",
    answer:
      "Vos données ne sont collectées que si vous choisissez la soumission non-anonyme. Elles sont utilisées uniquement pour vous contacter concernant votre suggestion. Vous pouvez à tout moment demander la suppression de vos données en contactant l'administration.",
  },
  {
    id: "6",
    category: "general",
    question: "Combien de temps faut-il pour obtenir une réponse?",
    answer:
      "L'administration s'engage à répondre à toutes les suggestions dans un délai de 7 jours. Cependant, pour les suggestions complexes, ce délai peut être prolongé. Vous pouvez suivre le statut de votre suggestion en consultant votre page 'Mes Suggestions'.",
  },
  {
    id: "7",
    category: "technical",
    question: "Puis-je modifier ma suggestion après l'envoi?",
    answer:
      "Une fois votre suggestion envoyée, vous ne pouvez pas la modifier directement. Si vous devez ajouter des informations ou clarifier quelque chose, vous pouvez ajouter un commentaire sur la page de votre suggestion.",
  },
  {
    id: "8",
    category: "general",
    question: "Qui peut voir ma suggestion?",
    answer:
      "Seul l'administration de la faculté et le PREFAC peuvent voir votre suggestion. Les suggestions anonymes ne sont pas associées à votre profil. Les suggestions acceptées et résolues peuvent être partagées sur la plateforme pour informer les autres étudiants des améliorations apportées.",
  },
]

const categories = [
  { id: "general", label: "Général", icon: HelpCircle },
  { id: "submission", label: "Soumettre une suggestion", icon: Zap },
  { id: "privacy", label: "Confidentialité", icon: Shield },
  { id: "technical", label: "Technique", icon: AlertCircle },
]

export default function GuidePage() {
  const [openItems, setOpenItems] = useState<string[]>(["1"])
  const [selectedCategory, setSelectedCategory] = useState<"all" | "general" | "submission" | "privacy" | "technical">(
    "all"
  )

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredFAQ =
    selectedCategory === "all" ? faqItems : faqItems.filter((item) => item.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Guide d&apos;utilisation</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez comment utiliser la boîte à suggestions FASI et trouvez des réponses à vos questions.
          </p>
        </div>

        {/* How It Works */}
        <Card className="mb-12 p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-6">Comment ça marche?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: 1, title: "Remplissez le formulaire", desc: "Exprimez votre suggestion" },
              { step: 2, title: "Soumettez", desc: "Envoyez votre contribution" },
              { step: 3, title: "Suivi", desc: "Suivez l'évolution" },
              { step: 4, title: "Résultat", desc: "Voyez les changements" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto mb-3">
                  {item.step}
                </div>
                <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Lightbulb,
              title: "Soyez précis",
              desc: "Plus votre suggestion est détaillée, plus elle sera facile à comprendre et à traiter.",
            },
            {
              icon: Shield,
              title: "Confidentialité garantie",
              desc: "Vous pouvez soumettre anonymement. Vos données sont sécurisées et confidentielles.",
            },
            {
              icon: Zap,
              title: "Réponse rapide",
              desc: "Nous nous engageons à répondre dans les 7 jours. Suivez votre suggestion en temps réel.",
            },
          ].map((tip, index) => {
            const Icon = tip.icon
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{tip.title}</h3>
                <p className="text-sm text-muted-foreground">{tip.desc}</p>
              </Card>
            )
          })}
        </div>

        {/* FAQ */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Questions fréquentes</h2>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              size="sm"
            >
              Tous
            </Button>
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </Button>
              )
            })}
          </div>

          {/* FAQ Items */}
          <div className="space-y-2">
            {filteredFAQ.map((item) => (
              <div key={item.id} className="border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left font-semibold text-foreground hover:bg-muted/50 transition-colors flex items-center justify-between"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={cn("w-5 h-5 text-muted-foreground transition-transform", {
                      "rotate-180": openItems.includes(item.id),
                    })}
                  />
                </button>
                {openItems.includes(item.id) && (
                  <div className="px-6 py-4 bg-muted/30 border-t border-border text-muted-foreground">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQ.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Aucune question trouvée pour cette catégorie</p>
            </div>
          )}
        </Card>

        {/* Contact */}
        <Card className="mt-8 p-8 bg-primary/5 border-primary/20">
          <h3 className="text-xl font-bold text-foreground mb-3">Vous n&apos;avez pas trouvé votre réponse?</h3>
          <p className="text-muted-foreground mb-4">
            N&apos;hésitez pas à nous contacter directement. Vous pouvez envoyer un email au PREFAC ou à l&apos;administration
            de la faculté.
          </p>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold text-foreground">Email PREFAC:</span> prefac@fasi.edu
            </p>
            <p>
              <span className="font-semibold text-foreground">Bureau:</span> Bâtiment A, 2ème étage
            </p>
            <p>
              <span className="font-semibold text-foreground">Heures de disponibilité:</span> Lundi - Vendredi, 10h-17h
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
