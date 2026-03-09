const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn.addEventListener('click', () => {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', String(!expanded));
  mobileMenu.classList.toggle('hidden');
});

mobileLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

const quoteForm = document.getElementById('quoteForm');
const formStatus = document.getElementById('formStatus');

const fields = [
  { id: 'name', errorId: 'nameError', label: 'Name' },
  { id: 'phone', errorId: 'phoneError', label: 'Phone' },
  { id: 'pickup', errorId: 'pickupError', label: 'Pickup Location' },
  { id: 'drop', errorId: 'dropError', label: 'Drop Location' },
  { id: 'cargo', errorId: 'cargoError', label: 'Cargo Type' },
];

function validateField(field) {
  const input = document.getElementById(field.id);
  const errorEl = document.getElementById(field.errorId);
  const value = input.value.trim();

  if (!value) {
    errorEl.textContent = `${field.label} is required.`;
    return false;
  }

  if (field.id === 'phone' && !/^\+?[0-9\s-]{10,15}$/.test(value)) {
    errorEl.textContent = 'Please enter a valid phone number.';
    return false;
  }

  errorEl.textContent = '';
  return true;
}

fields.forEach((field) => {
  const input = document.getElementById(field.id);
  input.addEventListener('input', () => validateField(field));
});

quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const isValid = fields.map(validateField).every(Boolean);

  if (!isValid) {
    formStatus.textContent = 'Please correct the highlighted fields.';
    formStatus.className = 'text-sm font-medium text-red-600';
    return;
  }

  formStatus.textContent = 'Thank you! Your quote request has been received.';
  formStatus.className = 'text-sm font-medium text-green-600';
  quoteForm.reset();
});
