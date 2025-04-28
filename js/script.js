// Navbar Elements
const themeToggle = document.getElementById("themeToggle");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const dropdown = document.querySelector(".dropdown");
const searchBox = document.getElementById("searchBox");
const searchIcon = document.getElementById("searchIcon");

// Search Toggle
let searchOpen = false;
if (searchIcon && searchBox) {
  searchIcon.addEventListener("click", () => {
    searchBox.classList.toggle("active");
    searchOpen = !searchOpen;

    if (searchOpen) {
      searchIcon.classList.remove("fa-magnifying-glass");
      searchIcon.classList.add("fa-xmark");
    } else {
      searchIcon.classList.remove("fa-xmark");
      searchIcon.classList.add("fa-magnifying-glass");
    }
  });
}

// Theme Toggle
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
      themeToggle.classList.remove("fa-moon");
      themeToggle.classList.add("fa-sun");
    } else {
      themeToggle.classList.remove("fa-sun");
      themeToggle.classList.add("fa-moon");
    }
  });
}

// Hamburger Toggle (with sliding animation)
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
      navLinks.style.maxHeight = navLinks.scrollHeight + "px";
    } else {
      navLinks.style.maxHeight = "0";
    }
  });
}

// Close menu after clicking a link (for small screens)
const navLinksList = document.querySelectorAll("#navLinks a");

navLinksList.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      navLinks.style.maxHeight = "0";
    }
  });
});

// Dropdown Toggle for Mobile (optional)
if (dropdown) {
  dropdown.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      dropdown.classList.toggle("open");
    }
  });
}

// Typing Animation (optional)
const typingElement = document.getElementById("typing");
const texts = ["FullStack Developer", "Translator", "Tech Enthusiast"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
  if (typingElement) {
    const currentText = texts[textIndex];
    typingElement.textContent = currentText.substring(0, charIndex);

    if (!isDeleting && charIndex < currentText.length) {
      charIndex++;
      typingSpeed = 100;
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      typingSpeed = 50;
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 1000;
      } else {
        typingSpeed = 500;
      }
    }
    setTimeout(type, typingSpeed);
  }
}

document.addEventListener("DOMContentLoaded", type);

// Stats Counter Animation (optional)
let hasCounted = false;

function animateCounter(id, target, duration) {
  const counter = document.getElementById(id);
  if (!counter) return;

  let start = 0;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    counter.textContent = Math.floor(progress * target);

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target;
    }
  }

  requestAnimationFrame(updateCounter);
}

window.addEventListener('scroll', () => {
  const statsSection = document.getElementById('stats');
  if (!statsSection) return;

  const sectionTop = statsSection.getBoundingClientRect().top;
  const triggerPoint = window.innerHeight * 0.8;

  if (sectionTop < triggerPoint && !hasCounted) {
    hasCounted = true;
    animateCounter('counter1', 1500, 2000);
    animateCounter('counter2', 2500, 2200);
    animateCounter('counter3', 1280, 1800);
    animateCounter('counter4', 3020, 2500);
  }
});

// Fade-up Animation for success cards
const faders = document.querySelectorAll('.success-card');

function appearOnScroll(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}

const observerOptions = {
  threshold: 0.3
};

const observer = new IntersectionObserver(appearOnScroll, observerOptions);

faders.forEach(card => {
  card.classList.add('fade-up');
  observer.observe(card);
});

// Footer Year
const yearSpan = document.getElementById("currentYear");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Scroll to Top
const scrollToTopBtn = document.getElementById("backToTop");

window.addEventListener('scroll', () => {
  if (scrollToTopBtn) {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = "flex";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  }
});

if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
