// Pazymim, kad JS veikia: tik tada slepiamas turinys pries animacija
document.documentElement.classList.add('js');

// Mobilus meniu
(function () {
  var mygtukas = document.getElementById('meniu-mygtukas');
  var meniu = document.getElementById('meniu');
  if (!mygtukas || !meniu) return;
  mygtukas.addEventListener('click', function () {
    var atidarytas = meniu.classList.toggle('atidarytas');
    mygtukas.setAttribute('aria-expanded', atidarytas ? 'true' : 'false');
  });
  meniu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      meniu.classList.remove('atidarytas');
      mygtukas.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Viršaus šešėlis, kai puslapis paslinktas
(function () {
  var virsus = document.querySelector('.virsus');
  if (!virsus) return;
  function tikrinti() { virsus.classList.toggle('slenka', window.scrollY > 8); }
  window.addEventListener('scroll', tikrinti, { passive: true });
  tikrinti();
})();

// Aktyvi meniu nuoroda pagal matomą skirsnį
(function () {
  var nuorodos = document.querySelectorAll('.meniu a[href^="#"]');
  if (!nuorodos.length || !('IntersectionObserver' in window)) return;
  var pagalId = {};
  nuorodos.forEach(function (a) { pagalId[a.getAttribute('href').slice(1)] = a; });
  var skirsniai = Object.keys(pagalId)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var stebetojas = new IntersectionObserver(function (irasai) {
    irasai.forEach(function (irasas) {
      if (!irasas.isIntersecting) return;
      nuorodos.forEach(function (a) { a.classList.remove('aktyvus'); });
      pagalId[irasas.target.id].classList.add('aktyvus');
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  skirsniai.forEach(function (s) { stebetojas.observe(s); });
})();

// Atsiradimo animacija
(function () {
  var elementai = document.querySelectorAll('.atsiranda');
  if (!('IntersectionObserver' in window)) {
    elementai.forEach(function (el) { el.classList.add('matomas'); });
    return;
  }
  var stebetojas = new IntersectionObserver(function (irasai) {
    irasai.forEach(function (irasas) {
      if (irasas.isIntersecting) {
        irasas.target.classList.add('matomas');
        stebetojas.unobserve(irasas.target);
      }
    });
  }, { threshold: 0.12 });
  elementai.forEach(function (el) { stebetojas.observe(el); });
})();

// Kontaktu forma: siunčia be perkrovimo, be JS veikia kaip įprasta forma
(function () {
  var forma = document.querySelector('.forma');
  if (!forma) return;
  var zinia = forma.querySelector('.formos-zinia');
  forma.addEventListener('submit', function (e) {
    var endpoint = forma.getAttribute('action');
    if (!endpoint || endpoint === '#') {
      e.preventDefault();
      zinia.textContent = 'Registracija internetu dar ruošiama. Parašykite el. paštu arba paskambinkite.';
      zinia.className = 'formos-zinia klaida';
      return;
    }
    if (forma.querySelector('[name="_gotcha"]').value) {
      e.preventDefault();
      return; // honeypot: botas uzpilde pasleptaji lauka
    }
    if (!forma.checkValidity()) {
      forma.reportValidity();
      e.preventDefault();
      return;
    }
    e.preventDefault();
    var duomenys = new FormData(forma);
    duomenys.delete('_next'); // per JS perkrovimo nereikia, padėka rodoma čia pat
    var kontaktas = duomenys.get('Telefonas arba el. paštas') || '';
    if (kontaktas.indexOf('@') > 0) duomenys.append('_replyto', kontaktas.trim()); // kad Fausta galėtų iškart atsakyti
    fetch(endpoint, {
      method: 'POST',
      body: duomenys,
      headers: { 'Accept': 'application/json' }
    }).then(function (ats) {
      if (ats.ok) {
        forma.reset();
        zinia.textContent = 'Ačiū, jūsų žinutė išsiųsta. Susisieksiu artimiausiu metu.';
        zinia.className = 'formos-zinia sekme';
      } else {
        throw new Error('Serverio klaida');
      }
    }).catch(function () {
      zinia.textContent = 'Nepavyko išsiųsti. Parašykite el. paštu arba paskambinkite.';
      zinia.className = 'formos-zinia klaida';
    });
  });
})();

// Metai porastėje
(function () {
  var el = document.getElementById('metai');
  if (el) el.textContent = new Date().getFullYear();
})();
