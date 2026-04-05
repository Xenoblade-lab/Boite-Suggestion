"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Lightbulb, AlertTriangle, Rocket, Send, User, GraduationCap } from "lucide-react"

const suggestionTypes = [
  { value: "suggestion", label: "Suggestion", icon: Lightbulb, color: "text-amber-500" },
  { value: "probleme", label: "Problème", icon: AlertTriangle, color: "text-red-500" },
  { value: "idee", label: "Idée", icon: Rocket, color: "text-primary" },
]

const promotions = ["L1", "L2", "L3", "M1", "M2"]

export function SuggestionForm() {
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [selectedType, setSelectedType] = useState("suggestion")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nom: "",
    promotion: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setIsSubmitted(false)
    setFormData({ nom: "", promotion: "", message: "" })
    setSelectedType("suggestion")
    setIsAnonymous(false)
  }

  if (isSubmitted) {
    return (
      <Card className="border-0 shadow-xl">
        <CardContent className="pt-12 pb-12">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-accent" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">Merci pour votre contribution !</h3>
              <p className="text-muted-foreground max-w-md">
                Votre {selectedType === "suggestion" ? "suggestion" : selectedType === "probleme" ? "signalement" : "idée"} a été envoyé(e) avec succès. Le PREFAC examinera votre message attentivement.
              </p>
            </div>
            <Button onClick={handleReset} variant="outline" className="mt-4">
              Soumettre une autre suggestion
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl">Nouvelle soumission</CardTitle>
        <CardDescription>
          Partagez vos préoccupations, suggestions ou idées pour améliorer la FASI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Type de suggestion */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Type de soumission</Label>
            <RadioGroup
              value={selectedType}
              onValueChange={setSelectedType}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {suggestionTypes.map((type) => {
                const Icon = type.icon
                return (
                  <Label
                    key={type.value}
                    htmlFor={type.value}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedType === type.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem value={type.value} id={type.value} className="sr-only" />
                    <Icon className={`w-5 h-5 ${type.color}`} />
                    <span className="font-medium">{type.label}</span>
                  </Label>
                )
              })}
            </RadioGroup>
          </div>

          {/* Option anonyme */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label htmlFor="anonymous" className="font-medium cursor-pointer">
                  Soumission anonyme
                </Label>
                <p className="text-sm text-muted-foreground">
                  Votre identité restera confidentielle
                </p>
              </div>
            </div>
            <Switch
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={setIsAnonymous}
            />
          </div>

          {/* Informations personnelles */}
          {!isAnonymous && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nom" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nom (optionnel)
                </Label>
                <Input
                  id="nom"
                  placeholder="Votre nom"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="promotion" className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Promotion
                </Label>
                <Select
                  value={formData.promotion}
                  onValueChange={(value) => setFormData({ ...formData, promotion: value })}
                >
                  <SelectTrigger id="promotion" className="h-12">
                    <SelectValue placeholder="Sélectionnez votre niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    {promotions.map((promo) => (
                      <SelectItem key={promo} value={promo}>
                        {promo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-base font-semibold">
              Votre message *
            </Label>
            <Textarea
              id="message"
              placeholder="Décrivez votre suggestion, problème ou idée en détail..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="min-h-[150px] resize-none"
            />
            <p className="text-sm text-muted-foreground">
              Soyez précis et constructif dans votre message
            </p>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            size="lg"
            className="w-full h-14 text-base font-semibold"
            disabled={!formData.message || isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Envoi en cours...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Envoyer ma soumission
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
