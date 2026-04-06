;(function () {
  const form = document.getElementById("suggestion-form")
  if (!form) return

  const anonymous = document.getElementById("anonymous")
  const identityBlock = document.getElementById("identity-block")
  const messageInput = document.getElementById("message")
  const submitBtn = document.getElementById("submit-btn")
  const submitHtmlDefault = submitBtn ? submitBtn.innerHTML : ""

  function syncAnonymous() {
    if (!identityBlock || !anonymous) return
    identityBlock.classList.toggle("hidden", anonymous.checked)
  }

  anonymous && anonymous.addEventListener("change", syncAnonymous)
  syncAnonymous()

  form.addEventListener("submit", function (e) {
    e.preventDefault()
    if (!messageInput || !messageInput.value.trim()) return

    const type = (form.querySelector('input[name="type"]:checked') || {}).value || "suggestion"
    submitBtn.disabled = true
    submitBtn.innerHTML =
      '<span class="spinner" aria-hidden="true"></span> Envoi en cours...'

    setTimeout(function () {
      if (submitBtn) {
        submitBtn.disabled = false
        submitBtn.innerHTML = submitHtmlDefault
      }
      window.location.href = "merci.html?type=" + encodeURIComponent(type)
    }, 1200)
  })

  function updateSubmitState() {
    if (!messageInput || !submitBtn) return
    submitBtn.disabled = !messageInput.value.trim()
  }
  messageInput && messageInput.addEventListener("input", updateSubmitState)
  updateSubmitState()
})()
