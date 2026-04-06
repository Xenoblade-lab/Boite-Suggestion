;(function () {
  var Y_MAX = 24

  var monthlyData = [
    { month: "Sept", s: 12, p: 8, i: 5 },
    { month: "Oct", s: 18, p: 10, i: 7 },
    { month: "Nov", s: 15, p: 12, i: 9 },
    { month: "Dec", s: 10, p: 5, i: 4 },
    { month: "Jan", s: 23, p: 10, i: 8 },
  ]

  var statusData = [
    { name: "Résolu", value: 45, color: "#22c55e" },
    { name: "En cours", value: 38, color: "#ea580c" },
    { name: "En attente", value: 52, color: "#1e40af" },
    { name: "Approuvé", value: 21, color: "#9333ea" },
  ]

  var promotionData = [
    { promotion: "L1", count: 28 },
    { promotion: "L2", count: 35 },
    { promotion: "L3", count: 42 },
    { promotion: "M1", count: 31 },
    { promotion: "M2", count: 20 },
  ]

  var H_MAX = 60

  function donutSegment(cx, cy, r0, r1, a0, a1) {
    var x0o = cx + r1 * Math.cos(a0)
    var y0o = cy + r1 * Math.sin(a0)
    var x1o = cx + r1 * Math.cos(a1)
    var y1o = cy + r1 * Math.sin(a1)
    var x0i = cx + r0 * Math.cos(a1)
    var y0i = cy + r0 * Math.sin(a1)
    var x1i = cx + r0 * Math.cos(a0)
    var y1i = cy + r0 * Math.sin(a0)
    var large = a1 - a0 > Math.PI ? 1 : 0
    return (
      "M " +
      x0o +
      " " +
      y0o +
      " A " +
      r1 +
      " " +
      r1 +
      " 0 " +
      large +
      " 1 " +
      x1o +
      " " +
      y1o +
      " L " +
      x0i +
      " " +
      y0i +
      " A " +
      r0 +
      " " +
      r0 +
      " 0 " +
      large +
      " 0 " +
      x1i +
      " " +
      y1i +
      " Z"
    )
  }

  function initMonthly() {
    var root = document.getElementById("stat-monthly-root")
    if (!root) return

    var tooltip = document.getElementById("stat-tooltip-monthly")
    if (!tooltip) return

    var plotH = 220
    root.innerHTML =
      '<div class="stat-monthly">' +
      '<div class="stat-monthly__y">' +
      ["0", "6", "12", "18", "24"]
        .map(function (t) {
          return "<span>" + t + "</span>"
        })
        .reverse()
        .join("") +
      "</div>" +
      '<div class="stat-monthly__plot-wrap">' +
      '<div class="stat-monthly__grid">' +
      [0, 1, 2, 3, 4]
        .map(function () {
          return '<div class="stat-monthly__grid-line"></div>'
        })
        .join("") +
      "</div>" +
      '<div class="stat-monthly__columns">' +
      monthlyData
        .map(function (d) {
          var hs = (d.s / Y_MAX) * plotH
          var hp = (d.p / Y_MAX) * plotH
          var hi = (d.i / Y_MAX) * plotH
          return (
            '<div class="stat-monthly__col" data-month="' +
            d.month +
            '" data-s="' +
            d.s +
            '" data-p="' +
            d.p +
            '" data-i="' +
            d.i +
            '">' +
            '<div class="stat-monthly__col-highlight"></div>' +
            '<div class="stat-monthly__bargroup">' +
            '<div class="stat-monthly__bar stat-bar-suggestion" style="height:' +
            hs +
            'px"></div>' +
            '<div class="stat-monthly__bar stat-bar-probleme" style="height:' +
            hp +
            'px"></div>' +
            '<div class="stat-monthly__bar stat-bar-idee" style="height:' +
            hi +
            'px"></div>' +
            "</div>" +
            '<span class="stat-monthly__xlabel">' +
            d.month +
            "</span>" +
            "</div>"
          )
        })
        .join("") +
      "</div></div></div>" +
      '<div class="stat-monthly__legend">' +
      '<span><i class="stat-bar-suggestion"></i> Suggestions</span>' +
      '<span><i class="stat-bar-probleme"></i> Problèmes</span>' +
      '<span><i class="stat-bar-idee"></i> Idées</span>' +
      "</div>"

    function showTip(e, col) {
      var m = col.getAttribute("data-month")
      var s = col.getAttribute("data-s")
      var p = col.getAttribute("data-p")
      var i = col.getAttribute("data-i")
      tooltip.innerHTML =
        '<div class="stat-tooltip__title">' +
        m +
        "</div>" +
        '<div class="stat-tooltip__row"><span class="stat-tooltip__swatch stat-bar-suggestion"></span> Suggestions <strong>' +
        s +
        "</strong></div>" +
        '<div class="stat-tooltip__row"><span class="stat-tooltip__swatch stat-bar-probleme"></span> Problèmes <strong>' +
        p +
        "</strong></div>" +
        '<div class="stat-tooltip__row"><span class="stat-tooltip__swatch stat-bar-idee"></span> Idées <strong>' +
        i +
        "</strong></div>"
      tooltip.classList.add("is-visible")
      moveTip(e)
    }

    function moveTip(e) {
      var pad = 12
      tooltip.style.left = Math.min(e.clientX + pad, window.innerWidth - tooltip.offsetWidth - 8) + "px"
      tooltip.style.top = Math.min(e.clientY + pad, window.innerHeight - tooltip.offsetHeight - 8) + "px"
    }

    function hideTip() {
      tooltip.classList.remove("is-visible")
    }

    root.querySelectorAll(".stat-monthly__col").forEach(function (col) {
      col.addEventListener("mouseenter", function (e) {
        root.querySelectorAll(".stat-monthly__col").forEach(function (c) {
          c.classList.remove("is-active")
        })
        col.classList.add("is-active")
        showTip(e, col)
      })
      col.addEventListener("mousemove", moveTip)
      col.addEventListener("mouseleave", function () {
        col.classList.remove("is-active")
        hideTip()
      })
    })
  }

  function initDonut() {
    var host = document.getElementById("stat-donut-host")
    if (!host) return

    var cx = 120
    var cy = 120
    var r0 = 58
    var r1 = 98
    var gapDeg = 2
    var gapRad = (gapDeg * Math.PI) / 180
    var total = statusData.reduce(function (a, d) {
      return a + d.value
    }, 0)
    var totalGap = gapRad * statusData.length
    var available = 2 * Math.PI - totalGap
    var ang = -Math.PI / 2
    var paths = ""

    statusData.forEach(function (d) {
      var sweep = (d.value / total) * available
      var a0 = ang
      var a1 = ang + sweep
      paths +=
        '<path class="stat-donut-seg" data-name="' +
        d.name +
        '" data-value="' +
        d.value +
        '" data-color="' +
        d.color +
        '" fill="' +
        d.color +
        '" d="' +
        donutSegment(cx, cy, r0, r1, a0, a1) +
        '"/>'
      ang = a1 + gapRad
    })

    var labels = statusData
      .map(function (d) {
        return (
          '<span style="color:' +
          d.color +
          ';font-weight:600">' +
          d.name +
          ": " +
          d.value +
          "</span>"
        )
      })
      .join("")

    host.innerHTML =
      '<div class="stat-donut-wrap" id="stat-donut-wrap">' +
      '<div class="stat-donut-ring">' +
      '<svg class="stat-donut-svg" viewBox="0 0 240 240" aria-hidden="true">' +
      paths +
      "</svg>" +
      '<div class="stat-donut-center" id="stat-donut-center">' +
      '<div class="stat-donut-center__row">' +
      '<span class="stat-donut-center-left"><span class="stat-donut-center-swatch"></span> <span class="stat-donut-center-name"></span></span>' +
      '<span class="stat-donut-center__value"></span>' +
      "</div></div>" +
      "</div>" +
      '<div class="stat-donut-labels">' +
      labels +
      "</div>" +
      "</div>"

    var wrap = document.getElementById("stat-donut-wrap")
    var center = document.getElementById("stat-donut-center")
    var sw = center.querySelector(".stat-donut-center-swatch")
    var nm = center.querySelector(".stat-donut-center-name")
    var vl = center.querySelector(".stat-donut-center__value")

    host.querySelectorAll(".stat-donut-seg").forEach(function (seg) {
      seg.addEventListener("mouseenter", function () {
        wrap.classList.add("show-center")
        sw.style.background = seg.getAttribute("data-color")
        nm.textContent = seg.getAttribute("data-name")
        vl.textContent = seg.getAttribute("data-value")
        host.querySelectorAll(".stat-donut-seg").forEach(function (s) {
          s.classList.remove("is-hover")
        })
        seg.classList.add("is-hover")
      })
      seg.addEventListener("mouseleave", function () {
        wrap.classList.remove("show-center")
        seg.classList.remove("is-hover")
      })
    })
  }

  function initHBar() {
    var root = document.getElementById("stat-hbar-root")
    var tip = document.getElementById("stat-hbar-tooltip")
    if (!root || !tip) return

    var ticks = [0, 15, 30, 45, 60]
    root.innerHTML =
      '<div class="stat-hbar-wrap">' +
      '<div class="stat-hbar__axis-x">' +
      ticks
        .map(function (t) {
          return "<span>" + t + "</span>"
        })
        .join("") +
      "</div>" +
      '<div class="stat-hbar__rows">' +
      promotionData
        .map(function (d) {
          var pct = (d.count / H_MAX) * 100
          return (
            '<div class="stat-hbar__row" data-promo="' +
            d.promotion +
            '" data-count="' +
            d.count +
            '">' +
            '<span class="stat-hbar__label">' +
            d.promotion +
            "</span>" +
            '<div class="stat-hbar__track"><div class="stat-hbar__fill" style="width:' +
            pct +
            '%"></div></div>' +
            "</div>"
          )
        })
        .join("") +
      "</div></div>"

    function showHtip(e, row) {
      var pr = row.getAttribute("data-promo")
      var c = row.getAttribute("data-count")
      tip.innerHTML =
        '<div class="stat-hbar-tooltip__promo">' +
        pr +
        "</div>" +
        '<div class="stat-hbar-tooltip__row"><span class="stat-hbar-tooltip__swatch"></span> Soumissions <strong>' +
        c +
        "</strong></div>"
      tip.classList.add("is-visible")
      tip.style.left = Math.min(e.clientX + 12, window.innerWidth - tip.offsetWidth - 8) + "px"
      tip.style.top = Math.min(e.clientY + 12, window.innerHeight - tip.offsetHeight - 8) + "px"
    }

    root.querySelectorAll(".stat-hbar__row").forEach(function (row) {
      row.addEventListener("mouseenter", function (e) {
        showHtip(e, row)
      })
      row.addEventListener("mousemove", function (e) {
        tip.style.left = Math.min(e.clientX + 12, window.innerWidth - tip.offsetWidth - 8) + "px"
        tip.style.top = Math.min(e.clientY + 12, window.innerHeight - tip.offsetHeight - 8) + "px"
      })
      row.addEventListener("mouseleave", function () {
        tip.classList.remove("is-visible")
      })
    })
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMonthly()
    initDonut()
    initHBar()
  })
})()
