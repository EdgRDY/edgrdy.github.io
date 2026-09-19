# Psichologės svetainė

Statinė svetainė: grynas HTML + CSS + vanilla JS, be build žingsnių ir be priklausomybių.
Hostinama per GitHub Pages iš `main` šakos. Push į `main` iškart atnaujina svetainę.

Failai:

- `index.html` : pagrindinis puslapis (visas turinys jame)
- `privatumo-politika.html` : privatumo politika
- `styles.css` : visa išvaizda
- `script.js` : mobilus meniu, animacijos, kontaktų forma
- `straipsniai/` : SEO straipsniai (vaiko raida, kada kreiptis, kaip vyksta konsultacija)
- `assets/` : nuotraukos, `og.jpg` (paveikslėlis, rodomas dalinantis nuoroda)
- `assets/fonts/` : šriftai (Fraunces, Inter), laikomi čia, kad nereikėtų kreiptis į Google
- `404.html` : nerasto puslapio langas
- `robots.txt`, `sitemap.xml` : SEO (pridėjus puslapį, papildyti sitemap)

## Kontaktiniai duomenys

Vardas, telefonas, el. paštas ir adresas jau įrašyti. Jei kas nors pasikeis, ieškok senos
reikšmės visame projekte (Ctrl+Shift+F) ir pakeisk visur. Telefonas yra dviem formatais:
`+370 629 73696` tekste ir `+37062973696` `tel:` nuorodose ir JSON-LD. Adresas yra ir
žemėlapio nuorodoje, kur jis užkoduotas URL.

Tekstą „Apie mane“ galima laisvai perrašyti, jis `index.html` skiltyje `id="apie"`.

## Kur įdėti nuotrauką

1. Paruošk portretą maždaug 420x520 (arba tokio pat santykio), išsaugok `assets/portretas.webp`
   ir atsarginį `assets/portretas.jpg`.
2. `index.html` hero dalyje pakeisk `<img src="assets/portretas.svg" ...>` į:

```html
<picture>
  <source srcset="assets/portretas.webp" type="image/webp">
  <img src="assets/portretas.jpg" alt="Psichologės Faustos Rudko portretas"
       width="420" height="520" loading="lazy">
</picture>
```

3. `assets/portretas.svg` galima ištrinti.

## Kaip prijungti kontaktų formą

Forma dabar turi `action="#"`, todėl rodo pranešimą, kad registracija dar ruošiama.
Paprasčiausias kelias be savo serverio: [Formspree](https://formspree.io) (nemokamo plano
užtenka) arba [Web3Forms](https://web3forms.com).

1. Susikurk formą, gausi endpoint, pvz. `https://formspree.io/f/abcdwxyz`.
2. `index.html` pakeisk `action="#"` į gautą adresą.
3. Daugiau nieko: `script.js` pats siunčia POST ir parodo sėkmės ar klaidos pranešimą,
   o išjungus JS forma vis tiek išsiunčiama įprastu būdu.

Antispam: formoje yra paslėptas honeypot laukas `svetaine`, botų užpildytos užklausos atmetamos.

## Domenas

Kai bus nupirktas domenas:

1. Repo Settings -> Pages -> Custom domain įrašyk domeną (susikurs `CNAME` failas).
2. DNS: `CNAME` įrašas `www` -> `edgrdy.github.io` ir `A`/`ALIAS` įrašai apex domenui
   į GitHub Pages IP (185.199.108.153, .109., .110., .111.).
3. Pakeisk `https://edgrdy.github.io` į naują domeną: `index.html` (canonical, OG, JSON-LD),
   `privatumo-politika.html` (canonical), `robots.txt`, `sitemap.xml`.
