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

    const result = await res.json();

    if (res.ok) {
      formMessage.textContent = "Message sent successfully!";
      e.target.reset();
    } else {
      formMessage.textContent = result.error || "Something went wrong.";
    }
  } catch (err) {
    formMessage.textContent = "Failed to send message.";
    console.error(err);
  }
});


// fzyu pfpr dozl oerl