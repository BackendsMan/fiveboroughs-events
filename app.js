import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBLAHBLAH",
  authDomain: "five-boroughs-rp.firebaseapp.com",
  projectId: "five-boroughs-rp",
  storageBucket: "five-boroughs-rp.appspot.com",
  messagingSenderId: "389252131410",
  appId: "1:389252131410:web:abc123xyz"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// EVENT FORM
document.getElementById("eventForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = e.target.elements;

  await addDoc(collection(db, "events"), {
    discord: f[0].value,
    eventName: f[1].value,
    eventType: f[2].value,
    eventTime: f[3].value,
    description: f[4].value,
    createdAt: new Date()
  });

  alert("✅ Event submitted!");
  e.target.reset();
});

// CIV FORM
document.getElementById("civForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = e.target.elements;

  await addDoc(collection(db, "applications"), {
    discord: f[0].value,
    appType: f[1].value,
    characterName: f[2].value,
    details: f[3].value,
    createdAt: new Date()
  });

  alert("✅ Application submitted!");
  e.target.reset();
});
