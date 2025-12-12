// Save data locally (for now)
function saveData(key, data) {
  let existing = JSON.parse(localStorage.getItem(key)) || [];
  existing.push(data);
  localStorage.setItem(key, JSON.stringify(existing));
}

// Event form submission
document.getElementById('eventForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const data = {
    eventName: this.eventName.value,
    eventType: this.eventType.value,
    eventDateTime: this.eventDateTime.value,
    eventDesc: this.eventDesc.value
  };
  saveData('events', data);
  this.reset();
  document.getElementById('feedback').textContent = 'Event submitted successfully!';
});

// CivRP form submission
document.getElementById('civForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const data = {
    playerName: this.playerName.value,
    appType: this.appType.value,
    details: this.details.value
  };
  saveData('applications', data);
  this.reset();
  document.getElementById('feedback').textContent = 'Application submitted successfully!';
});
