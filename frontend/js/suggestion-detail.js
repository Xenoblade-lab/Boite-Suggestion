;(function () {
  const listEl = document.getElementById("comments-list")
  const input = document.getElementById("new-comment")
  const btn = document.getElementById("add-comment")
  if (!listEl || !input || !btn) return

  const initial = window.SUGGESTION_COMMENTS_DATA || []
  const comments = initial.slice()

  function escapeHtml(t) {
    const d = document.createElement("div")
    d.textContent = t
    return d.innerHTML
  }

  function renderComment(c) {
    const div = document.createElement("div")
    div.className = "comment-block"
    div.innerHTML =
      "<div style='display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.5rem'>" +
      "<div style='display:flex;align-items:center;gap:0.5rem'><strong>" +
      escapeHtml(c.author) +
      "</strong>" +
      (c.role === "admin"
        ? "<span class='badge badge--primary' style='font-size:0.65rem'>Admin</span>"
        : "") +
      "</div><span style='font-size:0.75rem;color:var(--muted-foreground)'>" +
      escapeHtml(c.date) +
      "</span></div><p style='margin:0;font-size:0.875rem'>" +
      escapeHtml(c.content) +
      "</p>"
    return div
  }

  function redraw() {
    listEl.innerHTML = ""
    comments.forEach(function (c) {
      listEl.appendChild(renderComment(c))
    })
    const count = document.getElementById("comment-count")
    if (count) count.textContent = String(comments.length)
  }

  btn.addEventListener("click", function () {
    const text = input.value.trim()
    if (!text) return
    comments.push({
      id: String(comments.length + 1),
      author: "Vous",
      role: "student",
      content: text,
      date: new Date().toLocaleString("fr-FR"),
    })
    input.value = ""
    redraw()
  })

  redraw()
})()
