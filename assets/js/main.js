// ============ SOMA: интерактив ============
(function () {
  'use strict';

  // шапка при скролле + кнопка наверх
  var hdr = document.getElementById('hdr');
  var totop = document.getElementById('totop');
  window.addEventListener('scroll', function () {
    hdr.classList.toggle('scrolled', window.scrollY > 40);
    totop.classList.toggle('show', window.scrollY > 600);
  }, { passive: true });
  totop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // мобильное меню
  var burger = document.getElementById('burger');
  var mnav = document.getElementById('mnav');
  burger.addEventListener('click', function () {
    burger.classList.toggle('open');
    mnav.classList.toggle('show');
  });
  mnav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      burger.classList.remove('open');
      mnav.classList.remove('show');
    });
  });

  // плавное появление блоков
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // каскадная задержка для карточек в сетках
  ['.adv', '.svc-grid', '.cb-grid', '.promo-grid', '.rv-scroll'].forEach(function (sel) {
    document.querySelectorAll(sel + ' .reveal').forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 90 + 'ms';
    });
  });

  // FAQ: открыт только один вопрос
  var faqItems = document.querySelectorAll('.faq details');
  faqItems.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) {
        faqItems.forEach(function (o) { if (o !== d) o.open = false; });
      }
    });
  });

  // лайтбокс для сертификатов
  var lb = document.createElement('div');
  lb.className = 'lb';
  lb.innerHTML = '<img alt="Сертификат мастера — увеличенное фото">';
  document.body.appendChild(lb);
  var lbImg = lb.querySelector('img');
  lb.addEventListener('click', function () { lb.classList.remove('show'); });
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') lb.classList.remove('show');
  });
  document.querySelectorAll('[data-lb]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      lbImg.src = a.getAttribute('href');
      lb.classList.add('show');
    });
  });
})();
