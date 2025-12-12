function saveData(key, data) {
  const existing = JSON.parse(localStorage.getItem(key)) || [];
  existing.push({
    ...data,
    timestamp: new Date().toLocaleString()
  });
  localStorage.setItem(key, JSON.stringify(existing));
}

// EVENT FORM
document.getElementById("eventForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const inputs = this.querySelectorAll("input, select, textarea");

  saveData("events", {
    discord: inputs[0].value,
    name: inputs[1].value,
    type: inputs[2].value,
    time: inputs[3].value,
    desc: inputs[4].value
  });

  alert("✅ Event submitted for staff review.");
  this.reset();
});

// CIV FORM
document.getElementById("civForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const inputs = this.querySelectorAll("input, select, textarea");

  saveData("applications", {
    discord: inputs[0].value,
    type: inputs[1].value,
    character: inputs[2].value,
    details: inputs[3].value
  });

  alert("✅ Application submitted for staff review.");
  this.reset();
});
