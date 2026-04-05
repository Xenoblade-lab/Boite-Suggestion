import { Lightbulb, AlertTriangle, Rocket, Users } from "lucide-react"

const features = [
  {
    icon: Lightbulb,
    title: "Suggestions",
    description: "Proposez des améliorations",
  },
  {
    icon: AlertTriangle,
    title: "Problèmes",
    description: "Signalez vos préoccupations",
  },
  {
    icon: Rocket,
    title: "Idées",
    description: "Partagez vos innovations",
  },
]

export function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Users className="w-4 h-4" />
            Gouvernement du PREFAC
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
            Votre voix compte,{" "}
            <span className="text-primary">exprimez-vous !</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            La Faculté des Sciences Informatiques vous offre un espace pour partager vos suggestions, signaler des problèmes ou proposer des idées innovantes.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
