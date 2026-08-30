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

    // --------------------------------------------------
    // 7. Custom Cursor Effects
    // --------------------------------------------------
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");
    const motionText = document.querySelector(".motion-text");

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Track cursor movement
    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Immediate update for inner dot
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth trailing effect for cursor ring
    function animateCursor() {
        // Smooth easing factor (0.15 controls lag speed)
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Text Motion Effect on Hover
    motionText.addEventListener("mousemove", (e) => {
        const rect = motionText.getBoundingClientRect();
        const textCenterX = rect.left + rect.width / 2;
        const textCenterY = rect.top + rect.height / 2;

        // Calculate distance from center of text
        const deltaX = (e.clientX - textCenterX) * 0.2; // Adjust multiplier for tilt intensity
        const deltaY = (e.clientY - textCenterY) * 0.2;

        motionText.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        cursorOutline.style.width = "65px";
        cursorOutline.style.height = "65px";
        cursorOutline.style.backgroundColor = "rgba(56, 189, 248, 0.1)";
    });

    // Reset text position when mouse leaves
    motionText.addEventListener("mouseleave", () => {
        motionText.style.transform = "translate(0px, 0px)";
        cursorOutline.style.width = "40px";
        cursorOutline.style.height = "40px";
        cursorOutline.style.backgroundColor = "transparent";
    });

    ///////////////////////////////
    // Smooth Trailing Ring
    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Text Motion Tracking
    motionText.addEventListener("mousemove", (e) => {
        const rect = motionText.getBoundingClientRect();
        const deltaX = (e.clientX - (rect.left + rect.width / 2)) * 0.2;
        const deltaY = (e.clientY - (rect.top + rect.height / 2)) * 0.2;

        motionText.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        cursorOutline.style.width = "70px";
        cursorOutline.style.height = "70px";
        cursorOutline.style.backgroundColor = "rgba(56, 189, 248, 0.1)";
    });

    motionText.addEventListener("mouseleave", () => {
        motionText.style.transform = "translate(0px, 0px)";
        resetCursorOutline();
    });

    // Social Icons Hover & Magnetic Motion
    socialIcons.forEach((icon) => {
        icon.addEventListener("mousemove", (e) => {
            const rect = icon.getBoundingClientRect();
            const deltaX = (e.clientX - (rect.left + rect.width / 2)) * 0.3;
            const deltaY = (e.clientY - (rect.top + rect.height / 2)) * 0.3;

            // Pull icon toward cursor slightly (Magnetic Effect)
            icon.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

            // Expand outer cursor ring around the icon
            cursorOutline.style.width = "60px";
            cursorOutline.style.height = "60px";
            cursorOutline.style.borderColor = "#38bdf8";
            cursorOutline.style.backgroundColor = "rgba(56, 189, 248, 0.2)";
        });

        icon.addEventListener("mouseleave", () => {
            icon.style.transform = "translate(0px, 0px)";
            resetCursorOutline();
        });
    });

    function resetCursorOutline() {
        cursorOutline.style.width = "40px";
        cursorOutline.style.height = "40px";
        cursorOutline.style.borderColor = "rgba(56, 189, 248, 0.5)";
        cursorOutline.style.backgroundColor = "transparent";
    }

});