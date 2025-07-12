// Hamburger menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Highlight active link
const links = document.querySelectorAll(".nav-links a");
const currentPage = location.pathname.split("/").pop();

links.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.style.color = "#00d1b2";
  }
});

// Smooth fade + bouncing dots transition
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

  // Fade in page once loaded
  const loader = document.getElementById("pageLoader");
  if (loader) loader.classList.remove("show");
});

// Handle page transitions
document.querySelectorAll("a").forEach(link => {
  const href = link.getAttribute("href");

  if (href && href.endsWith(".html") && !link.hasAttribute("target")) {
    link.addEventListener("click", e => {
      e.preventDefault();

      const loader = document.getElementById("pageLoader");
      if (loader) loader.classList.add("show");

      setTimeout(() => {
        window.location.href = href;
      }, 3000); // adjust delay if needed
    });
  }
});

