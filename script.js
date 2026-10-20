
// ============================
// MENU NAVIGASI UNTUK HP
// ============================
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Tutup menu" : "Buka menu"
  );
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Tutup menu setelah salah satu tautan dipilih
document.querySelectorAll("#navMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu");
    menuToggle.textContent = "☰";
  });
});

// ============================
// TAHUN OTOMATIS
// ============================
document.getElementById("year").textContent =
  new Date().getFullYear();

// ============================
// ANIMASI ANGKA STATISTIK
// ============================
const counters = document.querySelectorAll(".counter");
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;
  countersStarted = true;

  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    const duration = 1200;
    const startTime = performance.now();

    function updateNumber(currentTime) {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      // Easing agar animasi melambat di akhir
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(target * eased);

      counter.textContent = value.toLocaleString("id-ID");

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        counter.textContent = target.toLocaleString("id-ID");
      }
    }

    requestAnimationFrame(updateNumber);
  });
}

// Mulai animasi saat bagian data terlihat
const statsSection = document.getElementById("data");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      animateCounters();
      observer.disconnect();
    }
  }, { threshold: 0.2 });

  observer.observe(statsSection);
} else {
  animateCounters();
}

// ============================
// TOMBOL KEMBALI KE ATAS
// ============================
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 350);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ============================
// FORMULIR KONTAK DEMO
// ============================
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nama = document.getElementById("nama").value.trim();

  formMessage.textContent =
    `Terima kasih, ${nama}! Formulir berhasil diuji, ` +
    "tetapi pesan belum dikirim ke server.";

  formMessage.style.color = "#20764a";

  contactForm.reset();
});
