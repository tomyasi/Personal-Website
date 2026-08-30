document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // --------------------------------------------------
    // 1. Language Toggle System
    // --------------------------------------------------
    const langToggleBtn = document.getElementById('langToggle');
    const langText = document.getElementById('langText');
    let currentLang = localStorage.getItem('site_lang') || 'en';

    function updateLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('site_lang', lang);
        langText.textContent = lang === 'en' ? 'AM' : 'EN';

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }

    langToggleBtn.addEventListener('click', () => {
        updateLanguage(currentLang === 'en' ? 'am' : 'en');
    });

    // Initial translation application
    updateLanguage(currentLang);

    // --------------------------------------------------
    // 2. Dark / Light Theme Toggle
    // --------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggle');
    let currentTheme = localStorage.getItem('site_theme') || 'dark';

    function applyTheme(theme) {
        currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('site_theme', theme);
    }

    themeToggleBtn.addEventListener('click', () => {
        applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    applyTheme(currentTheme);

    // --------------------------------------------------
    // 3. Mobile Hamburger Navigation Toggle
    // --------------------------------------------------
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });

    // --------------------------------------------------
    // 4. Accordion Expand / Collapse Functionality
    // --------------------------------------------------
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all items
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
            });

            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Open first accordion item by default
    if (accordionHeaders.length > 0) {
        accordionHeaders[0].parentElement.classList.add('active');
    }

    // --------------------------------------------------
    // 5. Active Link Highlight on Scroll
    // --------------------------------------------------
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (pageYOffset >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // --------------------------------------------------
    // 6. Contact Form Local Validation & Handling
    // --------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name && email && message) {
                formFeedback.style.color = '#50D83E';
                formFeedback.textContent = currentLang === 'en' 
                    ? 'Thank you! Your message has been sent.' 
                    : 'እናመሰግናለን! መልእክትዎ ተልኳል።';
                contactForm.reset();

                setTimeout(() => {
                    formFeedback.textContent = '';
                }, 5000);
            }
        });
    }
});