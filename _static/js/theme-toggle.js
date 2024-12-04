 /* // theme-toggle.js
const themeToggle = document.getElementById('theme-toggle');
const themeStyle = document.getElementById('theme-style');

// Load saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  themeStyle.removeAttribute('disabled');
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
  if (themeStyle.disabled) {
    themeStyle.removeAttribute('disabled');
    localStorage.setItem('theme', 'light');
  } else {
    themeStyle.setAttribute('disabled', 'true');
    localStorage.setItem('theme', 'dark');
  }
});
*/
