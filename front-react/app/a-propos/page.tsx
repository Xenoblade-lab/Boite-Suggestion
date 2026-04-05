import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  MessageSquarePlus, 
  Target, 
  Users, 
  Shield, 
  Heart,
  Mail,
  MapPin,
  Clock,
  CheckCircle2
} from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Confidentialité",
    description: "Vos soumissions anonymes sont protégées. Nous garantissons la confidentialité de vos préoccupations.",
  },
  {
    icon: Target,
    title: "Transparence",
    description: "Suivez le statut de vos suggestions et consultez les statistiques de traitement en temps réel.",
  },
  {
    icon: Heart,
    title: "Écoute active",
    description: "Chaque suggestion est lue et analysée par l'équipe du PREFAC pour améliorer votre expérience.",
  },
  {
    icon: Users,
    title: "Participation",
    description: "Ensemble, nous construisons une faculté meilleure grâce à vos idées et retours constructifs.",
  },
]

const processSteps = [
  { step: 1, title: "Soumission", description: "L'étudiant soumet sa suggestion via le formulaire" },
  { step: 2, title: "Réception", description: "Le PREFAC reçoit et enregistre la soumission" },
  { step: 3, title: "Analyse", description: "L'équipe analyse et catégorise la demande" },
  { step: 4, title: "Action", description: "Mise en place de solutions ou réponse appropriée" },
]

export default function AProposPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
                <MessageSquarePlus className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
                À propos de la Boîte à Suggestions
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Une initiative du PREFAC pour donner la parole aux étudiants de la Faculté 
                des Sciences Informatiques et améliorer continuellement notre environnement académique.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Notre mission</h2>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Le gouvernement étudiant PREFAC a mis en place cette plateforme numérique 
                    pour faciliter la communication entre les étudiants et l&apos;administration 
                    de la FASI.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Notre objectif est de créer un canal de communication efficace où chaque 
                    voix compte, chaque problème est entendu et chaque idée innovante est 
                    considérée pour améliorer la vie universitaire.
                  </p>
                </div>
                <Card className="border-0 shadow-xl bg-primary/5">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                        <span className="text-foreground">Soumissions anonymes acceptées</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                        <span className="text-foreground">Traitement sous 72 heures</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                        <span className="text-foreground">Suivi transparent des demandes</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                        <span className="text-foreground">Rapports mensuels publiés</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground text-center mb-10">
                Nos valeurs
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {values.map((value) => {
                  const Icon = value.icon
                  return (
                    <Card key={value.title} className="border-0 shadow-md">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{value.title}</CardTitle>
                        <CardDescription>{value.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground text-center mb-10">
                Comment ça fonctionne ?
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {processSteps.map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-foreground mb-6">Contactez le PREFAC</h2>
              <p className="text-muted-foreground mb-8">
                Pour toute question concernant la boîte à suggestions ou le gouvernement étudiant
              </p>
              <div className="grid sm:grid-cols-3 gap-6">
                <Card className="border-0 shadow-md">
                  <CardContent className="pt-6 text-center">
                    <Mail className="w-6 h-6 text-primary mx-auto mb-3" />
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">prefac@fasi.edu</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="pt-6 text-center">
                    <MapPin className="w-6 h-6 text-primary mx-auto mb-3" />
                    <p className="text-sm font-medium text-foreground">Bureau</p>
                    <p className="text-sm text-muted-foreground">Bâtiment A, Salle 102</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="pt-6 text-center">
                    <Clock className="w-6 h-6 text-primary mx-auto mb-3" />
                    <p className="text-sm font-medium text-foreground">Horaires</p>
                    <p className="text-sm text-muted-foreground">Lun-Ven: 9h-16h</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
