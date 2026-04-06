/**
 * Injecte l’en-tête et le pied de page communs.
 * data-page sur <body> : home | mes-suggestions | statistiques | guide | a-propos | (autres → aucun onglet actif)
 */
;(function () {
  const I = window.FasiIcons
  if (!I) return

  const links = [
    { id: "home", href: "index.html", label: "Accueil", icon: "home" },
    { id: "mes-suggestions", href: "mes-suggestions.html", label: "Mes Suggestions", icon: "file" },
    { id: "statistiques", href: "statistiques.html", label: "Statistiques", icon: "chart" },
    { id: "guide", href: "guide.html", label: "Guide", icon: "help" },
    { id: "a-propos", href: "a-propos.html", label: "À propos", icon: "info" },
  ]

  function navItems(activeId, mobile) {
    return links
      .map((l) => {
        const active = l.id === activeId ? " is-active" : ""
        const cls = mobile ? "nav-link" : "nav-link"
        return `<a href="${l.href}" class="${cls}${active}">${I[l.icon]}<span>${l.label}</span></a>`
      })
      .join("")
  }

  function header(activeId) {
    return `
<header class="site-header">
  <div class="container site-header__inner">
    <a href="index.html" class="site-logo">
      <span class="site-logo__icon">${I.messagePlus}</span>
      <span>
        <span class="site-logo__title">FASI</span>
        <span class="site-logo__subtitle">| Boîte à Suggestions</span>
      </span>
    </a>
    <nav class="nav-desktop" aria-label="Navigation principale">
      ${navItems(activeId, false)}
    </nav>
    <div class="header-actions">
      <span class="badge-prefac">PREFAC</span>
      <button type="button" class="btn-menu" id="nav-toggle" aria-expanded="false" aria-controls="nav-mobile">
        ${I.menu}
      </button>
    </div>
  </div>
  <nav class="nav-mobile" id="nav-mobile" aria-label="Navigation mobile">
    ${navItems(activeId, true)}
  </nav>
</header>`
  }

  function footer() {
    const y = new Date().getFullYear()
    return `
<footer class="site-footer">
  <div class="container">
    <div class="site-footer__row">
      <div class="site-footer__brand">
        <span class="icon-box-sm">${I.messagePlus}</span>
        <div class="text-sm">
          <span style="font-weight:600;color:var(--foreground)">Boîte à Suggestions FASI</span>
          <span style="color:var(--muted-foreground);margin-left:0.5rem">| Gouvernement du PREFAC</span>
        </div>
      </div>
      <p class="site-footer__meta">${I.heart} pour les étudiants de la FASI</p>
    </div>
    <nav class="site-footer__legal" aria-label="Informations légales">
      <a href="charte.html">Charte d'utilisation</a>
      <span aria-hidden="true">·</span>
      <a href="confidentialite.html">Confidentialité</a>
      <span aria-hidden="true">·</span>
      <a href="mentions-legales.html">Mentions légales</a>
      <span aria-hidden="true">·</span>
      <a href="login.html">Connexion admin</a>
      <span aria-hidden="true">·</span>
      <a href="admin.html">Tableau de bord (démo)</a>
    </nav>
    <div class="site-footer__copy">© ${y} Faculté des Sciences Informatiques. Tous droits réservés.</div>
  </div>
</footer>`
  }

  const active = document.body.dataset.page || "home"
  const hEl = document.getElementById("site-header-root")
  const fEl = document.getElementById("site-footer-root")
  if (hEl) hEl.innerHTML = header(active)
  if (fEl) fEl.innerHTML = footer()
})()
