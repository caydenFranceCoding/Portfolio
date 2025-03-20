// Simple test file to confirm JavaScript loading
console.log("Projects JavaScript file loaded successfully!");

// Add a visible element to confirm JavaScript is working
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM fully loaded");
  
  // Create a visible indicator
  const indicator = document.createElement('div');
  indicator.textContent = "JavaScript is working!";
  indicator.style.position = "fixed";
  indicator.style.bottom = "20px";
  indicator.style.right = "20px";
  indicator.style.background = "green";
  indicator.style.color = "white";
  indicator.style.padding = "10px";
  indicator.style.borderRadius = "5px";
  indicator.style.zIndex = "9999";
  
  document.body.appendChild(indicator);
  
  // Handle theme switcher if it exists
  const themeSwitch = document.getElementById('themeSwitch');
  if (themeSwitch) {
    themeSwitch.addEventListener('change', function() {
      if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    });
  }
});
