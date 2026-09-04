const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navLinkItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const scrollProgress = document.querySelector(".scroll-progress");

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));

  const menuIcon = menuToggle.querySelector("i");
  menuIcon.classList.toggle("fa-bars", !isOpen);
  menuIcon.classList.toggle("fa-xmark", isOpen);
});

const closeMenu = () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");

  const menuIcon = menuToggle.querySelector("i");
  menuIcon.classList.remove("fa-xmark");
  menuIcon.classList.add("fa-bars");
};

navLinkItems.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (event) => {
  if (
    navLinks.classList.contains("open") &&
    !navLinks.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    closeMenu();
  }
});

const updateActiveNav = () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      currentSection = section.id;
    }
  });

  navLinkItems.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentSection}`
    );
  });
};

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

const revealElements = document.querySelectorAll(
  ".section-title, .about-card, .about-content, .skill-card, " +
  ".project-card, .timeline-item, .education-card, .cert-card, " +
  ".resume-card, .contact-text, .contact-email"
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
  { threshold: 0.12 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const updateScrollProgress = () => {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const scrollPercentage =
    scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

  scrollProgress.style.transform = `scaleX(${scrollPercentage})`;
};

window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.style.scrollBehavior = "auto";

  revealElements.forEach((element) => {
    element.style.opacity = "1";
    element.style.transform = "none";
    element.style.transition = "none";
  });
}
