// Dizaino perjungiklis (tik perziurai)
(function () {
  var mygtukai = document.querySelectorAll('.dizaino-perjungiklis button');
  var issaugotas = null;
  try { issaugotas = localStorage.getItem('dizainas'); } catch (e) {}
  if (issaugotas === 'a' || issaugotas === 'b' || issaugotas === 'c') {
    nustatyti(issaugotas);
  }
  mygtukai.forEach(function (btn) {
    btn.addEventListener('click', function () {
      nustatyti(btn.dataset.variantas);
      try { localStorage.setItem('dizainas', btn.dataset.variantas); } catch (e) {}
    });
  });
  function nustatyti(v) {
    document.body.dataset.dizainas = v;
    mygtukai.forEach(function (b) {
      b.classList.toggle('aktyvus', b.dataset.variantas === v);
    });
  }
})();

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
      // Perziuros rezimas: endpoint dar nesukonfiguruotas
      e.preventDefault();
      zinia.textContent = 'Peržiūros režimas: formos siuntimas bus įjungtas vėliau.';
      zinia.className = 'formos-zinia sekme';
      return;
    }
    if (forma.querySelector('[name="svetaine"]').value) {
      e.preventDefault();
      return; // honeypot
    }
    e.preventDefault();
    var duomenys = new FormData(forma);
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
