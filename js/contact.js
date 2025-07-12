const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  formMessage.textContent = "Sending...";

  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
    });

    if (!res.ok) {
      const text = await res.text(); // fallback for non-JSON
      throw new Error(text || "Server error");
    }

    const result = await res.json();
    formMessage.textContent = "Message sent successfully!";
    form.reset(); // ✅ Now it works, because 'form' is defined above
  } catch (err) {
    console.error("❌ Error:", err);
    formMessage.textContent = "Error: " + err.message;
  }
});


// fzyu pfpr dozl oerl