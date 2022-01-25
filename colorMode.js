let darkToggle = document.getElementById('button-dark');
let lightToggle = document.getElementById('button-light');

function toggleColorMode(e) {

  // Switch to dark mode
  if (e.currentTarget.classList.contains('color-mode__btn--dark')) {
    document.documentElement.setAttribute('color-mode','dark');

  // Switch to light mode
  } else {
    document.documentElement.setAttribute('color-mode','light');
  }
}

// Toggle color when light or dark button is clicked

let colorToggleButtons = document.querySelectorAll('.color-mode__btn');

colorToggleButtons.forEach(button => {
  button.addEventListener("click", toggleColorMode);
});