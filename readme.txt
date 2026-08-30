# Temesgen — Portfolio Website

A personal portfolio built using HTML5, CSS3, Vanilla JavaScript, and Tailwind-inspired dark green aesthetics with full English and Amharic translation support.

## Features
* **Dark-Green Aesthetics:** Uses precise color palettes (`#080A05` background, `#50D83E` neon accent) with ambient radial lighting.
* **Bilingual Support:** Real-time client-side translation toggle between English and Amharic.
* **Theme Switching:** Dark Mode and Light Mode support with preferences saved in `localStorage`.
* **Interactive Accordion:** Expandable Services section.
* **Responsive Layout:** Optimized for mobile (320px) up to ultra-wide displays (1920px).

---

## Local Setup & Testing
1. Clone or download this project folder.
2. Open `index.html` directly in any browser (Chrome, Edge, Firefox). No build tools or installations are required.

---

## Customization Guide

### 1. Update Personal Information
* Open `index.html` and search for placeholders like `your.email@example.com` or `+251 900 000 000` to update your contact details.
* Edit `js/translations.js` if you want to update the bilingual text strings.

### 2. Replace Profile Photo
* Place your photo inside `images/profile.jpg`.
* Open `index.html`, locate `<div class="avatar-placeholder">`, and replace it with:
  ```html
  <img src="images/profile.jpg" alt="Temesgen" style="width:100%; height:100%; object-fit:cover;">