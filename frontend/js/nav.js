;(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("nav-toggle")
    const mobile = document.getElementById("nav-mobile")
    if (!toggle || !mobile) return

    toggle.addEventListener("click", function () {
      const open = mobile.classList.toggle("is-open")
      toggle.setAttribute("aria-expanded", open ? "true" : "false")
      toggle.innerHTML = open
        ? (window.FasiIcons && window.FasiIcons.close) || "×"
        : (window.FasiIcons && window.FasiIcons.menu) || "≡"
    })

    mobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobile.classList.remove("is-open")
        toggle.setAttribute("aria-expanded", "false")
        if (window.FasiIcons) toggle.innerHTML = window.FasiIcons.menu
      })
    })
  })
})()
