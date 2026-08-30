document.addEventListener("DOMContentLoaded", () => {
  const typedTextSpan = document.querySelector(".typed-text");
  const motionTextContainer = document.querySelector(".motion-text");

  // Configuration for titles to cycle through
  const titles = [
    "IT Specialist",
    "Network Admin",
    "System Admin",
    "Python Dev",
    "Web Dev",
    "Software Engineer",
    "ICT Educator"
  ];

  const typingDelay = 100;
  const erasingDelay = 60;
  const wordDisplayDuration = 2000;

  let titleIndex = 0;
  let charIndex = 0;

  // Typewriter Effect Loop
  function type() {
    if (charIndex < titles[titleIndex].length) {
      typedTextSpan.textContent += titles[titleIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, wordDisplayDuration);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = titles[titleIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      titleIndex = (titleIndex + 1) % titles.length;
      setTimeout(type, typingDelay + 200);
    }
  }

  // Interactive Mouse Tilt Effect on Text
  if (motionTextContainer) {
    motionTextContainer.addEventListener("mousemove", (e) => {
      const rect = motionTextContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * 0.15;
      const deltaY = (e.clientY - centerY) * 0.15;

      motionTextContainer.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });

    motionTextContainer.addEventListener("mouseleave", () => {
      motionTextContainer.style.transform = "translate(0px, 0px)";
    });
  }

  // Start Animation Loop
  if (typedTextSpan && titles.length) {
    setTimeout(type, 1000);
  }
});