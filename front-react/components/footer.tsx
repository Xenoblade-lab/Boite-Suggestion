import { Heart, MessageSquarePlus } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquarePlus className="w-4 h-4 text-primary" />
            </div>
            <div className="text-sm">
              <span className="font-semibold text-foreground">Boîte à Suggestions FASI</span>
              <span className="text-muted-foreground ml-2">| Gouvernement du PREFAC</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Fait avec <Heart className="w-4 h-4 text-destructive fill-destructive" /> pour les étudiants de la FASI
          </p>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Faculté des Sciences Informatiques. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
