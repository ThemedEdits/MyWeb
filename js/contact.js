document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  const formMessage = document.getElementById("formMessage");

  formMessage.textContent = "Sending...";

try {
  const res = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, subject, message }),
  });

  if (!res.ok) {
    const text = await res.text(); // fallback if it's not JSON
    throw new Error(text || "Server error");
  }

  const result = await res.json();
  formMessage.textContent = "Message sent successfully!";
  form.reset();
} catch (err) {
  console.error("❌", err);
  formMessage.textContent = "Error: " + err.message;
}

});


// fzyu pfpr dozl oerl