let darkToggle = document.getElementById('button-dark');
let lightToggle = document.getElementById('button-light');

function switchToDark() {
  document.documentElement.setAttribute('color-mode','dark');
  // localStorage.setItem("color-mode", "dark");

}

function switchToLight() {
  document.documentElement.setAttribute('color-mode','light');
  // localStorage.setItem("color-mode", "light");

}


function toggleColorMode(e) {

  // Switch to dark mode
  if (e.currentTarget.classList.contains('color-mode__btn--dark')) {
    switchToDark();
    return;

  // Switch to light mode
  } else {
    switchToLight();
    return;
  }
}

// Toggle color when light or dark button is clicked
let colorToggleButtons = document.querySelectorAll('.color-mode__btn');

colorToggleButtons.forEach(button => {
  button.addEventListener("click", toggleColorMode);
});


// Check whether the user has set a preference for dark mode and automatically changes color mode
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  switchToDark();
}