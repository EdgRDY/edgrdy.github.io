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
`+370 629 73696` tekste ir `+37062973696` `tel:` nuorodose ir JSON-LD. Žemėlapio nuoroda
rodo į Google Maps įrašą „Pasažas pas Juozapą“ (place ID `ChIJv_opVQWU3UYRWta9fDPZJ6I`), ne į adresą,
nes pagal adresą Google rodo kitą to komplekso pastatą.

Tekstą „Apie mane“ galima laisvai perrašyti, jis `index.html` skiltyje `id="apie"`. Po juo yra
LinkedIn nuoroda ir Lietuvos psichologų sąjungos narystės ženkliukas (`assets/lps.png`).

Pakeitus `styles.css` ar `script.js`, visuose HTML failuose pakelk `?v=...` numerį prie jų
nuorodų, kitaip naršyklės iki 10 min rodys seną versiją.

## Nuotrauka

Portretas yra `assets/portretas.jpg` (754x942, santykis 4:5), dalinimosi
paveikslėlis `assets/og.jpg` (1200x630). Norint pakeisti, paruošk naują 4:5 nuotrauką tais pačiais
vardais ir perdaryk `og.jpg`.

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

Svetainė pasiekiama adresu https://fausta.rudko.lt. DNS valdomas Cloudflare (zona `rudko.lt`):
`CNAME fausta -> edgrdy.github.io` be Cloudflare proxy (pilkas debesėlis), kitaip GitHub
neišduoda HTTPS sertifikato. Failas `CNAME` repo šaknyje pasako GitHub Pages, koks domenas,
jo netrinti. Senas adresas edgrdy.github.io automatiškai nukreipia į naująjį.
