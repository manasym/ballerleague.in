/* --------------------------------------------------------------
   Matchweek 2 fixture poster cards.
   One data list feeds every [data-matchweek] container, so the
   homepage rail and the competition grid can never disagree.

   Poster numbering: 1 is the group head poster, 2-9 are the eight
   Group A / Group B Matchweek 2 fixtures in fixture-list order.
   -------------------------------------------------------------- */
(function () {
  "use strict";

  var DATE = "15 Nov";
  var POSTER_DIR = "assets/images/graphics/Match%20week%20Graphics/Group%20";

  // [home, away, kick-off, turf]
  var FIXTURES = [
    [
      "B",
      [
        ["Falcons FC", "Legacy FFA", "12:00 PM", "Turf 1"],
        ["Crescents FC", "Veltrix United", "12:00 PM", "Turf 2"],
        ["United 5's", "NBFC", "12:30 PM", "Turf 1"],
        ["Passion FC", "First Touch FC", "12:30 PM", "Turf 2"],
        ["Legacy FFA", "Crescents FC", "1:00 PM", "Turf 1"],
        ["Falcons FC", "Veltrix United", "1:00 PM", "Turf 2"],
        ["NBFC", "Passion FC", "1:30 PM", "Turf 1"],
        ["United 5's", "First Touch FC", "1:30 PM", "Turf 2"]
      ]
    ],
    [
      "A",
      [
        ["First Draft FC", "NEXUS FC", "4:00 PM", "Turf 1"],
        ["Walkalone FC", "United 4th Phase", "4:00 PM", "Turf 2"],
        ["Velocity FC", "GRVTY FC", "4:30 PM", "Turf 1"],
        ["WLWG FC", "Bangalore Grafters FC", "4:30 PM", "Turf 2"],
        ["NEXUS FC", "Walkalone FC", "5:00 PM", "Turf 1"],
        ["First Draft FC", "United 4th Phase", "5:00 PM", "Turf 2"],
        ["GRVTY FC", "WLWG FC", "5:30 PM", "Turf 1"],
        ["Velocity FC", "Bangalore Grafters FC", "5:30 PM", "Turf 2"]
      ]
    ]
  ];

  function card([group, list]) {
    return list.map(function ([home, away, time, turf], i) {
      return (
        '<article class="mw-card">' +
        '<div class="mw-media">' +
        '<img src="' + POSTER_DIR + group + '%20mw2/' + (i + 2) + '.webp" alt="" width="640" height="853" loading="lazy" decoding="async" />' +
        '<span class="mw-shine" aria-hidden="true"></span>' +
        "</div>" +
        '<div class="mw-foot">' +
        '<span class="mw-tag">Group ' + group + " · MD2</span>" +
        '<span class="mw-fixture">' + home + ' <span class="mw-vs">vs</span> ' + away + "</span>" +
        '<span class="mw-meta">' + DATE + " · " + time + " · " + turf + "</span>" +
        "</div>" +
        "</article>"
      );
    }).join("");
  }

  var html = FIXTURES.map(card).join("");

  document.querySelectorAll("[data-matchweek]").forEach(function (el) {
    el.innerHTML = html;
  });

  /* Motion: stagger cards in, sweep the poster on hover.
     Without Motion (or with reduced motion) the cards stay static. */
  var M = window.Motion;
  if (!M || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  M.inView(
    "[data-matchweek]",
    function ({ target }) {
      M.animate(
        target.querySelectorAll(".mw-card"),
        { opacity: [0, 1], y: [28, 0], scale: [0.96, 1] },
        { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: M.stagger(0.05) }
      );
    },
    { amount: 0.15 }
  );

  document.querySelectorAll(".mw-card").forEach(function (cardEl) {
    var img = cardEl.querySelector(".mw-media img");
    var shine = cardEl.querySelector(".mw-shine");

    cardEl.addEventListener("mouseenter", function () {
      M.animate(img, { scale: 1.06 }, { duration: 0.5, ease: [0.22, 1, 0.36, 1] });
      M.animate(shine, { x: ["-130%", "130%"] }, { duration: 0.7, ease: "easeInOut" });
    });

    cardEl.addEventListener("mouseleave", function () {
      M.animate(img, { scale: 1 }, { duration: 0.45, ease: [0.22, 1, 0.36, 1] });
      M.animate(shine, { x: "-130%" }, { duration: 0.3 });
    });
  });
})();
