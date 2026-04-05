"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageSquarePlus, Home, FileText, Info, BarChart3, Menu, X, HelpCircle } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/mes-suggestions", label: "Mes Suggestions", icon: FileText },
  { href: "/statistiques", label: "Statistiques", icon: BarChart3 },
  { href: "/guide", label: "Guide", icon: HelpCircle },
  { href: "/a-propos", label: "À propos", icon: Info },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <MessageSquarePlus className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <span className="font-bold text-foreground">FASI</span>
            <span className="text-muted-foreground ml-1 hidden sm:inline">| Boîte à Suggestions</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-accent/10 text-accent hidden sm:block">
            PREFAC
          </span>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border bg-card p-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
