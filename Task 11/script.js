// Feature 1: Dark/Light Mode Theme Toggle
const themeToggleBtn = document.getElementById('themeToggle');
const icon = themeToggleBtn.querySelector('i');

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Adjust toggle button state and navbar branding text dynamically
  if (document.body.classList.contains('dark-mode')) {
    icon.classList.replace('fa-moon', 'fa-sun');
    themeToggleBtn.classList.replace('btn-outline-secondary', 'btn-outline-warning');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
    themeToggleBtn.classList.replace('btn-outline-warning', 'btn-outline-secondary');
  }
});

// Feature 2: Contact Form Validation & Event Interactivity
const contactForm = document.getElementById('contactForm');
const feedbackAlert = document.getElementById('formFeedback');

contactForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Stop standard redirect/refresh

  if (!contactForm.checkValidity()) {
    event.stopPropagation();
    contactForm.classList.add('was-validated');
  } else {
    // Form is verified and valid
    feedbackAlert.classList.remove('d-none');
    contactForm.reset();
    contactForm.classList.remove('was-validated');

    // Automatically sweep the success notification away after 4 seconds
    setTimeout(() => {
      feedbackAlert.classList.add('d-none');
    }, 4000);
  }
});
