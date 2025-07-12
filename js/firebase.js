const firebaseConfig = {
  apiKey: "AIzaSyBjs9kpPVbg47I30dICN_VGixPkwrnTWRE",
  authDomain: "testimonials-app-d9b7a.firebaseapp.com",
  projectId: "testimonials-app-d9b7a",
  storageBucket: "testimonials-app-d9b7a.firebasestorage.app",
  messagingSenderId: "715174608657",
  appId: "1:715174608657:web:0dcc94ae385c8b52ced6b0"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// Star selection logic
const starContainer = document.getElementById("rating-stars");
const ratingInput = document.getElementById("rating");

if (starContainer) {
  starContainer.addEventListener("click", e => {
    if (e.target.dataset.value) {
      ratingInput.value = e.target.dataset.value;

      // highlight stars
      [...starContainer.children].forEach(star => {
        star.classList.toggle("active", star.dataset.value <= ratingInput.value);
      });
    }
  });
}

// Submit handler
const form = document.getElementById("testimonialForm");
if (form) {
  form.addEventListener("submit", async e => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const rating = parseInt(ratingInput.value);

    if (!name || !email || !message || rating === 0) {
      alert("Please fill all fields and select a rating.");
      return;
    }

    await db.collection("testimonials").add({ name, email, message, rating, created: new Date() });

    alert("Thank you for your feedback!");
    form.reset();
    ratingInput.value = 0;
    [...starContainer.children].forEach(star => star.classList.remove("active"));
  });
}

// Fetch testimonials
const listContainer = document.getElementById("testimonialList");
if (listContainer) {
  db.collection("testimonials").orderBy("created", "desc").onSnapshot(snapshot => {
    listContainer.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement("div");
      div.className = "testimonial-card";
      div.innerHTML = `
        <p>"${data.message}"</p>
        <strong>- ${data.name}</strong>
        <div class="stars">${"⭐".repeat(data.rating)}</div>
      `;
      listContainer.appendChild(div);
    });
  });
}
