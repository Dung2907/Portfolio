/* ===== STATE ===== */
let currentLang = 'vi';
let isDark = false;
let mobileNavOpen = false;

/* ===== LANGUAGE ===== */
function toggleLang() {
  currentLang = currentLang === 'vi' ? 'en' : 'vi';
  applyLang();
}

function applyLang() {
  const isVI = currentLang === 'vi';
  document.documentElement.lang = isVI ? 'vi' : 'en';
  document.getElementById('langToggle').textContent = isVI ? 'EN' : 'VI';
  document.title = isVI ? 'Trần Anh Dũng | Business Analyst' : 'Tran Anh Dung | Business Analyst';

  // Update all elements with data-vi / data-en
  document.querySelectorAll('[data-vi]').forEach(el => {
    const attr = isVI ? el.getAttribute('data-vi') : el.getAttribute('data-en');
    if (attr) el.textContent = attr;
  });

  // Update placeholders
  document.querySelectorAll('[data-vi-placeholder]').forEach(el => {
    el.placeholder = isVI ? el.getAttribute('data-vi-placeholder') : el.getAttribute('data-en-placeholder');
  });
}

/* ===== DARK MODE ===== */
function toggleTheme() {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  document.getElementById('themeToggle').textContent = isDark ? '☀️' : '🌙';
}

/* ===== MOBILE NAV ===== */
function toggleMobileNav() {
  mobileNavOpen = !mobileNavOpen;
  const drawer = document.getElementById('navDrawer');
  drawer.classList.toggle('open', mobileNavOpen);
}

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

/* ===== NAVBAR SCROLL ===== */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 60) {
    navbar.style.background = isDark ? 'rgba(8,15,30,0.99)' : 'rgba(8,15,30,0.97)';
  } else {
    navbar.style.background = '';
  }
});

/* ===== FORM ===== */
function sendForm() {
  const name = document.getElementById('formName').value.trim();
  const email = document.getElementById('formEmail').value.trim();
  const subject = document.getElementById('formSubject').value.trim();
  const message = document.getElementById('formMessage').value.trim();

  if (!name || !email || !message) {
    alert(currentLang === 'vi' ? 'Vui lòng điền đầy đủ thông tin.' : 'Please fill in all required fields.');
    return;
  }

  const mailtoLink = `mailto:anhdungtran2015@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
  window.location.href = mailtoLink;
}

/* ===== DOWNLOAD CV ===== */
function downloadCV() {
  alert(currentLang === 'vi'
    ? 'CV đang được chuẩn bị. Vui lòng liên hệ qua email để nhận CV!'
    : 'CV is being prepared. Please contact via email to receive the CV!');
}

/* ===== SMOOTH CLOSE MOBILE NAV ON RESIZE ===== */
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && mobileNavOpen) {
    mobileNavOpen = false;
    document.getElementById('navDrawer').classList.remove('open');
  }
});
