;(function () {
  const items = document.querySelectorAll(".faq-item")
  const filterBtns = document.querySelectorAll(".filter-btn[data-cat]")

  items.forEach(function (item) {
    const btn = item.querySelector(".faq-q")
    btn &&
      btn.addEventListener("click", function () {
        item.classList.toggle("is-open")
      })
  })

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const cat = btn.dataset.cat
      filterBtns.forEach(function (b) {
        b.classList.toggle("is-active", b === btn)
      })
      items.forEach(function (item) {
        const ic = item.dataset.category
        const show = cat === "all" || ic === cat
        item.style.display = show ? "" : "none"
      })
    })
  })
})()
