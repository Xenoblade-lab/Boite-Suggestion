import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { SuggestionForm } from "@/components/suggestion-form"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        
        <section className="py-8 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <SuggestionForm />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
