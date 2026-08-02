const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navLinkItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const scrollProgress = document.querySelector(".scroll-progress");

// Add a border to the navigation bar after scrolling.
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
});

// Open and close the mobile navigation menu.
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  const menuIcon = menuToggle.querySelector("i");

  if (navLinks.classList.contains("open")) {
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-xmark");
  } else {
    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
  }
});

// Close the mobile menu after selecting a navigation link.
navLinkItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");

    const menuIcon = menuToggle.querySelector("i");
    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
  });
});

// Highlight the current navigation item while scrolling.
window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinkItems.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

// Add a gentle reveal animation as sections enter the screen.
const revealElements = document.querySelectorAll(
  ".section-title, .about-card, .about-content, .skill-card, .project-card, .timeline-item, .resume-card, .contact-text, .contact-email"
);

revealElements.forEach((element) => {
  element.style.opacity = "0";
  element.style.transform = "translateY(24px)";
  element.style.transition = "opacity 0.7s ease, transform 0.7s ease";
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

window.addEventListener("scroll", () => {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const scrollPercentage = window.scrollY / scrollableHeight;

  scrollProgress.style.transform = `scaleX(${scrollPercentage})`;
});