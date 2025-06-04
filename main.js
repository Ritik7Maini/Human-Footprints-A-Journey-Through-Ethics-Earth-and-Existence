// ================================
// Theme Initialization and Toggle
// ================================

const themeToggleBtn = document.getElementById('theme-toggle');

function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    themeToggleBtn.textContent = '☀️';
  } else {
    document.documentElement.classList.remove('dark');
    themeToggleBtn.textContent = '🌙';
  }
  localStorage.setItem('theme', theme);
}

(function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
})();

themeToggleBtn.addEventListener('click', () => {
  const isDark = document.documentElement.classList.contains('dark');
  setTheme(isDark ? 'light' : 'dark');
});

// ================================
// Scroll fade-in animation
// ================================

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ================================
// Tabs functionality
// ================================

const tabs = document.querySelectorAll('[data-tab-button]');
const contents = document.querySelectorAll('[data-tab-content]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('bg-blue-600', 'text-white'));
    contents.forEach(c => c.classList.add('hidden'));
    tab.classList.add('bg-blue-600', 'text-white');
    document.querySelector(`#${tab.dataset.tabButton}-content`).classList.remove('hidden');
  });
});

// Initialize first tab as active
if (tabs.length > 0) {
  tabs[0].click();
}

// ================================
// Modal open/close
// ================================

function openModal(question) {
  document.getElementById('modal-question').textContent = question;
  document.getElementById('modal').classList.remove('hidden');
  document.getElementById('modal').classList.add('flex');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  document.getElementById('modal').classList.remove('flex');
}

// Expose modal functions globally for onclick
window.openModal = openModal;
window.closeModal = closeModal;

// ================================
// Charts Initialization
// ================================

const mineralCtx = document.getElementById('mineralChart');
if (mineralCtx) {
  new Chart(mineralCtx, {
    type: 'doughnut',
    data: {
      labels: ['Government', 'Landowner', 'Community', 'Other'],
      datasets: [{
        label: 'Mineral Rights Ownership',
        data: [70, 15, 10, 5],
        backgroundColor: ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'],
        borderColor: '#1e40af',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom', labels: {color: document.documentElement.classList.contains('dark') ? '#eee' : '#111'} }
      }
    }
  });
}

const co2Ctx = document.getElementById('co2Chart');
if (co2Ctx) {
  new Chart(co2Ctx, {
    type: 'bar',
    data: {
      labels: ['Energy', 'Transport', 'Industry', 'Agriculture', 'Residential'],
      datasets: [{
        label: 'CO2 Emissions (%)',
        data: [40, 25, 20, 10, 5],
        backgroundColor: ['#ef4444', '#f97316', '#fbbf24', '#84cc16', '#22c55e']
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 50,
          ticks: {color: document.documentElement.classList.contains('dark') ? '#eee' : '#111'}
        },
        x: {
          ticks: {color: document.documentElement.classList.contains('dark') ? '#eee' : '#111'}
        }
      },
      plugins: {
        legend: { labels: {color: document.documentElement.classList.contains('dark') ? '#eee' : '#111'} }
      }
    }
  });
}
