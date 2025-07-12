const toggleBtn = document.getElementById("darkModeToggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");

  // Optional: Change icon/text
  toggleBtn.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
});
