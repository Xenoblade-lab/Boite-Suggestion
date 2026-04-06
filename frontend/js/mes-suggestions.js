;(function () {
  const data = window.MES_SUGGESTIONS_DATA
  if (!data || !Array.isArray(data)) return

  const listEl = document.getElementById("suggestion-list")
  const emptyEl = document.getElementById("suggestion-empty")
  const search = document.getElementById("search-suggestions")
  const tabs = document.querySelectorAll(".tab[data-tab]")

  const typeLabels = {
    suggestion: { label: "Suggestion", cls: "badge--amber" },
    probleme: { label: "Problème", cls: "badge--red" },
    idee: { label: "Idée", cls: "badge--primary" },
  }

  const statusLabels = {
    en_attente: { label: "En attente", cls: "badge--muted" },
    en_cours: { label: "En cours", cls: "badge--amber" },
    approuve: { label: "Approuvé", cls: "badge--accent" },
    resolu: { label: "Résolu", cls: "badge--accent" },
    rejete: { label: "Rejeté", cls: "badge--red" },
  }

  let activeTab = "toutes"
  let query = ""

  function matches(s) {
    const q = query.toLowerCase()
    const okSearch = !q || s.message.toLowerCase().includes(q)
    const okTab = activeTab === "toutes" || s.type === activeTab
    return okSearch && okTab
  }

  const typeEmoji = { suggestion: "💡", probleme: "⚠️", idee: "🚀" }

  function render() {
    const filtered = data.filter(matches)
    if (!listEl) return
    listEl.innerHTML = ""
    if (filtered.length === 0) {
      emptyEl && emptyEl.classList.remove("hidden")
      return
    }
    emptyEl && emptyEl.classList.add("hidden")

    const I = window.FasiIcons
    filtered.forEach(function (s) {
      const t = typeLabels[s.type] || typeLabels.suggestion
      const st = statusLabels[s.status] || statusLabels.en_attente
      const dateStr = new Date(s.date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      const el = document.createElement("article")
      el.className = "suggestion-item"
      el.innerHTML =
        '<div class="suggestion-item__head">' +
        '<div style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center">' +
        '<span class="badge ' +
        t.cls +
        '">' +
        (typeEmoji[s.type] || "📌") +
        " " +
        t.label +
        "</span>" +
        '<span class="badge badge--muted">' +
        escapeHtml(s.promotion) +
        "</span></div>" +
        '<span class="badge ' +
        st.cls +
        '">' +
        (I && I.clock ? '<span style="display:inline-flex;vertical-align:middle">' + I.clock + "</span> " : "") +
        st.label +
        "</span></div>" +
        '<div class="suggestion-item__body"><p style="margin:0 0 1rem;line-height:1.6">' +
        escapeHtml(s.message) +
        '</p><div style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;color:var(--muted-foreground)">' +
        (I && I.calendar ? '<span style="display:inline-flex">' + I.calendar + "</span>" : "") +
        "<span>Soumis le " +
        dateStr +
        "</span></div></div>"
      listEl.appendChild(el)
    })
  }

  function escapeHtml(t) {
    const d = document.createElement("div")
    d.textContent = t
    return d.innerHTML
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      activeTab = tab.dataset.tab || "toutes"
      tabs.forEach(function (t) {
        t.classList.toggle("is-active", t === tab)
      })
      render()
    })
  })

  search &&
    search.addEventListener("input", function () {
      query = search.value
      render()
    })

  render()
})()
