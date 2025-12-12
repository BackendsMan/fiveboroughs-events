import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔴 PASTE YOUR FIREBASE CONFIG HERE */
const firebaseConfig = {
  apiKey: "AIzaSyAX0kvHXECtsT1KzpLGV9bYfFSxdvkWT00",
  authDomain: "five-boroughs-rp.firebaseapp.com",
  projectId: "five-boroughs-rp",
  storageBucket: "five-boroughs-rp.firebasestorage.app",
  messagingSenderId: "389252131410",
  appId: "1:389252131410:web:031feda765f7709c0f4d8b",
  measurementId: "G-N1TLX60BEJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ======================
   UI HELPERS
====================== */
const toast = document.getElementById("toast");

function showToast(title, msg) {
  toast.innerHTML = `<b>${title}</b> <span>${msg}</span>`;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2400);
}

function addRipple(e) {
  const btn = e.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - btn.getBoundingClientRect().left - radius}px`;
  circle.style.top = `${e.clientY - btn.getBoundingClientRect().top - radius}px`;
  circle.classList.add("ripple");

  const old = btn.getElementsByClassName("ripple")[0];
  if (old) old.remove();

  btn.appendChild(circle);
}

/* Add ripple to primary buttons */
document.querySelectorAll(".primary").forEach(btn => {
  btn.addEventListener("click", addRipple);
});

/* ======================
   TAB SWITCHING
====================== */
const tabs = document.querySelectorAll(".tab[data-target]");
const panels = document.querySelectorAll(".panel");

tabs.forEach(t => {
  t.addEventListener("click", () => {
    tabs.forEach(x => x.classList.remove("active"));
    t.classList.add("active");

    const target = t.getAttribute("data-target");
    panels.forEach(p => p.classList.remove("panel-active"));
    document.getElementById(target).classList.add("panel-active");

    // subtle feedback
    showToast("Switched:", target === "events" ? "Events panel" : "CivRP panel");
  });
});

/* ======================
   FORMS → FIREBASE
====================== */

// EVENT FORM
document.getElementById("eventForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = e.target.elements;

  const payload = {
    discord: f[0].value.trim(),
    eventName: f[1].value.trim(),
    eventType: f[2].value,
    eventTime: f[3].value,
    description: f[4].value.trim(),
    createdAt: new Date()
  };

  try {
    await addDoc(collection(db, "events"), payload);
    showToast("✅ Submitted!", "Event request sent for review.");
    e.target.reset();
  } catch (err) {
    console.error(err);
    showToast("❌ Error", "Could not submit event. Check Firebase rules/config.");
  }
});

// CIV FORM
document.getElementById("civForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = e.target.elements;

  const payload = {
    discord: f[0].value.trim(),
    appType: f[1].value,
    characterName: f[2].value.trim(),
    details: f[3].value.trim(),
    status: "Pending",
    createdAt: new Date()
  };

  try {
    await addDoc(collection(db, "applications"), payload);
    showToast("✅ Submitted!", "Application sent for review.");
    e.target.reset();
  } catch (err) {
    console.error(err);
    showToast("❌ Error", "Could not submit application. Check Firebase rules/config.");
  }
});
