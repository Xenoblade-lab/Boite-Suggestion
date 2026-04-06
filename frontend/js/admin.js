;(function () {
  const data = window.ADMIN_SUGGESTIONS_DATA
  if (!data || !Array.isArray(data)) return

  let rows = data.slice()
  const tbody = document.querySelector("#admin-table tbody")
  const search = document.getElementById("admin-search")
  const filterType = document.getElementById("filter-type")
  const filterStatus = document.getElementById("filter-status")
  const modal = document.getElementById("admin-modal")
  const modalMsg = document.getElementById("modal-message")
  const modalText = document.getElementById("modal-response")
  const modalSend = document.getElementById("modal-send")
  const modalClose = document.getElementById("modal-close")

  const typeCfg = {
    suggestion: { label: "Suggestion", cls: "badge--primary" },
    problem: { label: "Problème", cls: "badge--red" },
    idea: { label: "Idée", cls: "badge--amber" },
  }

  const statusCfg = {
    pending: { label: "En attente", cls: "badge--amber" },
    "in-progress": { label: "En cours", cls: "badge--primary" },
    resolved: { label: "Résolu", cls: "badge--accent" },
    approved: { label: "Approuvé", cls: "badge--accent" },
  }

  let selectedId = null

  function filtered() {
    const q = (search && search.value.toLowerCase()) || ""
    const ft = filterType && filterType.value
    const fs = filterStatus && filterStatus.value
    return rows.filter(function (s) {
      const okQ =
        !q ||
        s.message.toLowerCase().includes(q) ||
        (s.name && s.name.toLowerCase().includes(q))
      const okT = !ft || ft === "all" || s.type === ft
      const okS = !fs || fs === "all" || s.status === fs
      return okQ && okT && okS
    })
  }

  function updateStats() {
    document.getElementById("stat-total").textContent = rows.length
    document.getElementById("stat-pending").textContent = rows.filter(function (s) {
      return s.status === "pending"
    }).length
    document.getElementById("stat-resolved").textContent = rows.filter(function (s) {
      return s.status === "resolved"
    }).length
    document.getElementById("stat-approved").textContent = rows.filter(function (s) {
      return s.status === "approved"
    }).length
  }

  function escapeHtml(t) {
    const d = document.createElement("div")
    d.textContent = t
    return d.innerHTML
  }

  function render() {
    const list = filtered()
    tbody.innerHTML = ""
    if (list.length === 0) {
      tbody.innerHTML =
        "<tr><td colspan='6' style='text-align:center;padding:3rem;color:var(--muted-foreground)'>Aucune suggestion trouvée</td></tr>"
      return
    }

    list.forEach(function (s) {
      const tr = document.createElement("tr")
      const tc = typeCfg[s.type] || typeCfg.suggestion
      const sc = statusCfg[s.status] || statusCfg.pending
      tr.innerHTML =
        "<td><div><div style='font-weight:600'>" +
        escapeHtml(s.name) +
        "</div>" +
        (!s.isAnonymous && s.promotion
          ? "<div style='font-size:0.75rem;color:var(--muted-foreground)'>Promo " +
            escapeHtml(s.promotion) +
            "</div>"
          : "") +
        "</td><td><span class='badge " +
        tc.cls +
        "'>" +
        tc.label +
        "</span></td><td class='truncate' title='" +
        escapeHtml(s.message) +
        "'>" +
        escapeHtml(s.message) +
        "</td><td><select class='input admin-status' data-id='" +
        s.id +
        "' style='min-height:2.25rem;width:auto'>" +
        ["pending", "in-progress", "resolved", "approved"]
          .map(function (st) {
            return (
              "<option value='" +
              st +
              "'" +
              (s.status === st ? " selected" : "") +
              ">" +
              statusCfg[st].label +
              "</option>"
            )
          })
          .join("") +
        "</select></td><td style='color:var(--muted-foreground)'>" +
        escapeHtml(s.date) +
        "</td><td><div class='table-actions'><button type='button' class='btn btn--ghost btn--sm admin-reply' data-id='" +
        s.id +
        "' title='Répondre'>💬</button><button type='button' class='btn btn--ghost btn--sm text-destructive admin-del' data-id='" +
        s.id +
        "' title='Supprimer'>🗑</button></div></td>"
      tbody.appendChild(tr)
    })

    tbody.querySelectorAll(".admin-status").forEach(function (sel) {
      sel.addEventListener("change", function () {
        const id = sel.dataset.id
        const ns = sel.value
        rows = rows.map(function (r) {
          return r.id === id ? Object.assign({}, r, { status: ns }) : r
        })
        updateStats()
      })
    })

    tbody.querySelectorAll(".admin-reply").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const id = btn.dataset.id
        const row = rows.find(function (r) {
          return r.id === id
        })
        if (!row) return
        selectedId = id
        modalMsg.textContent = row.message
        modalText.value = ""
        modal.classList.add("is-open")
      })
    })

    tbody.querySelectorAll(".admin-del").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const id = btn.dataset.id
        rows = rows.filter(function (r) {
          return r.id !== id
        })
        updateStats()
        render()
      })
    })
  }

  search &&
    search.addEventListener("input", function () {
      render()
    })
  filterType &&
    filterType.addEventListener("change", function () {
      render()
    })
  filterStatus &&
    filterStatus.addEventListener("change", function () {
      render()
    })

  modalClose &&
    modalClose.addEventListener("click", function () {
      modal.classList.remove("is-open")
    })
  modal &&
    modal.addEventListener("click", function (e) {
      if (e.target === modal) modal.classList.remove("is-open")
    })
  const modalPanel = modal && modal.querySelector(".modal")
  modalPanel &&
    modalPanel.addEventListener("click", function (e) {
      e.stopPropagation()
    })

  modalSend &&
    modalSend.addEventListener("click", function () {
      if (selectedId && modalText.value.trim()) {
        console.log("Réponse pour", selectedId, modalText.value)
      }
      modal.classList.remove("is-open")
    })

  updateStats()
  render()
})()
