(function () {
  "use strict";

  var header = document.querySelector("[data-header]");
  var hero = document.getElementById("inicio");

  /* ---------- Cabeçalho com fundo ao rolar ---------- */

  function atualizarCabecalho() {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  atualizarCabecalho();
  window.addEventListener("scroll", atualizarCabecalho, { passive: true });

  /* ---------- Menu no celular ---------- */

  var toggle = document.querySelector("[data-nav-toggle]");
  var painel = document.querySelector("[data-nav-panel]");
  var rotuloToggle = toggle.querySelector(".visually-hidden");

  function definirMenu(aberto) {
    toggle.setAttribute("aria-expanded", String(aberto));
    rotuloToggle.textContent = aberto ? "Fechar menu" : "Abrir menu";
    painel.classList.toggle("is-open", aberto);
    document.body.classList.toggle("nav-open", aberto);
  }

  toggle.addEventListener("click", function () {
    definirMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  painel.addEventListener("click", function (evento) {
    if (evento.target.closest("a")) definirMenu(false);
  });

  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && painel.classList.contains("is-open")) {
      definirMenu(false);
      toggle.focus();
    }
  });

  window.matchMedia("(min-width: 901px)").addEventListener("change", function (mq) {
    if (mq.matches) definirMenu(false);
  });

  /* ---------- Link ativo no menu conforme a seção visível ---------- */

  var linksMenu = Array.prototype.slice.call(document.querySelectorAll(".site-nav__list a"));
  var secoes = linksMenu
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    var observadorSecoes = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        linksMenu.forEach(function (link) {
          if (link.getAttribute("href") === "#" + entrada.target.id) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    secoes.forEach(function (secao) { observadorSecoes.observe(secao); });
  }

  /* ---------- Barra fixa "Agendar horário" no celular ---------- */

  var ctaBar = document.querySelector("[data-cta-bar]");

  if (ctaBar && hero && "IntersectionObserver" in window) {
    var observadorHero = new IntersectionObserver(function (entradas) {
      ctaBar.classList.toggle("is-visible", !entradas[0].isIntersecting);
    }, { threshold: 0.15 });
    observadorHero.observe(hero);
  }

  /* ---------- Filtros da galeria ---------- */

  var filtros = Array.prototype.slice.call(document.querySelectorAll("[data-filtro]"));
  var itens = Array.prototype.slice.call(document.querySelectorAll(".galeria__item"));

  filtros.forEach(function (botao) {
    botao.addEventListener("click", function () {
      var categoria = botao.getAttribute("data-filtro");

      filtros.forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === botao));
      });

      itens.forEach(function (item) {
        var mostrar = categoria === "todos" || item.getAttribute("data-categoria") === categoria;
        item.hidden = !mostrar;
      });
    });
  });

  /* ---------- Lightbox ---------- */

  var lightbox = document.querySelector("[data-lightbox]");
  var imgLightbox = document.querySelector("[data-lightbox-img]");
  var legendaLightbox = document.querySelector("[data-lightbox-legenda]");
  var fotosVisiveis = [];
  var atual = 0;

  function mostrarFoto(indice) {
    atual = (indice + fotosVisiveis.length) % fotosVisiveis.length;
    var link = fotosVisiveis[atual];
    var img = link.querySelector("img");
    imgLightbox.src = link.getAttribute("href");
    imgLightbox.alt = img.alt;
    legendaLightbox.textContent =
      (link.getAttribute("data-legenda") || img.alt) +
      " · " + (atual + 1) + " de " + fotosVisiveis.length;
  }

  if (lightbox && typeof lightbox.showModal === "function") {
    document.querySelector("[data-galeria]").addEventListener("click", function (evento) {
      var link = evento.target.closest(".galeria__link");
      if (!link) return;
      evento.preventDefault();

      fotosVisiveis = itens
        .filter(function (item) { return !item.hidden; })
        .map(function (item) { return item.querySelector(".galeria__link"); });

      mostrarFoto(fotosVisiveis.indexOf(link));
      lightbox.showModal();
    });

    document.querySelector("[data-lightbox-fechar]").addEventListener("click", function () {
      lightbox.close();
    });

    document.querySelector("[data-lightbox-anterior]").addEventListener("click", function () {
      mostrarFoto(atual - 1);
    });

    document.querySelector("[data-lightbox-proxima]").addEventListener("click", function () {
      mostrarFoto(atual + 1);
    });

    lightbox.addEventListener("keydown", function (evento) {
      if (evento.key === "ArrowLeft") mostrarFoto(atual - 1);
      if (evento.key === "ArrowRight") mostrarFoto(atual + 1);
    });

    // Fecha ao clicar fora da foto
    lightbox.addEventListener("click", function (evento) {
      if (evento.target === lightbox || evento.target.classList.contains("lightbox__figura")) {
        lightbox.close();
      }
    });

    // Deslizar o dedo para trocar de foto
    var toqueX = null;
    lightbox.addEventListener("touchstart", function (evento) {
      toqueX = evento.touches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener("touchend", function (evento) {
      if (toqueX === null) return;
      var distancia = evento.changedTouches[0].clientX - toqueX;
      if (Math.abs(distancia) > 50) mostrarFoto(atual + (distancia < 0 ? 1 : -1));
      toqueX = null;
    });
  }

  /* ---------- Ano no rodapé ---------- */

  var ano = document.querySelector("[data-ano]");
  if (ano) ano.textContent = new Date().getFullYear();
})();
