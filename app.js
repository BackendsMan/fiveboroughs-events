// EVENT FORM
document.getElementById("eventForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("✅ Event request submitted! Staff will review it.");
  this.reset();
});

// CIV FORM
document.getElementById("civForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("✅ Application submitted! Please wait for approval.");
  this.reset();
});
