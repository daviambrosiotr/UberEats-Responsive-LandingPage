const header = document.getElementById("header");
const navMenu = document.getElementById("nav-menu");
const navToggle = document.querySelector("#nav-toggle .menu");
const navLink = document.querySelectorAll(".nav_link");
const scrollTopButton = document.getElementById("scroll-top");
const themeButton = document.getElementById("theme-button");
const sections = document.querySelectorAll("section[id]");

const darkTheme = "dark-theme";
const moonIcon = "bx-moon";
const sunIcon = "bx-sun";

function syncMenuState(isOpen) {
  if (!navMenu || !navToggle) return;

  navMenu.classList.toggle("show-menu", isOpen);
  navToggle.classList.toggle("opened", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

function toggleMenu() {
  if (!navMenu) return;
  syncMenuState(!navMenu.classList.contains("show-menu"));
}

function closeMenu() {
  syncMenuState(false);
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", toggleMenu);
}

navLink.forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) closeMenu();
});

function scrollActive() {
  const scrollY = window.pageYOffset;
  const headerHeight = header ? header.offsetHeight : 64;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - headerHeight - 24;
    const sectionId = current.getAttribute("id");
    const activeLink = document.querySelector(
      `.nav_menu a[href*="${sectionId}"]`
    );

    if (!activeLink) return;

    const isActive =
      scrollY >= sectionTop && scrollY < sectionTop + sectionHeight;

    activeLink.classList.toggle("active-link", isActive);
  });
}

function scrollHeader() {
  if (!header) return;
  header.classList.toggle("scroll-header", window.scrollY >= 120);
}

function toggleScrollTop() {
  if (!scrollTopButton) return;
  scrollTopButton.classList.toggle("show-scroll", window.scrollY >= 560);
}

window.addEventListener("scroll", scrollActive);
window.addEventListener("scroll", scrollHeader);
window.addEventListener("scroll", toggleScrollTop);

scrollTopButton?.addEventListener("click", closeMenu);

function setThemeState(isDark) {
  if (!themeButton) return;

  document.body.classList.toggle(darkTheme, isDark);
  themeButton.classList.remove(moonIcon, sunIcon);
  themeButton.classList.add(isDark ? sunIcon : moonIcon);
  themeButton.setAttribute(
    "aria-label",
    isDark ? "Ativar tema claro" : "Ativar tema escuro"
  );

  localStorage.setItem("selected-theme", isDark ? "dark" : "light");
  localStorage.setItem("selected-icon", isDark ? sunIcon : moonIcon);
}

const selectedTheme = localStorage.getItem("selected-theme");

if (selectedTheme) {
  setThemeState(selectedTheme === "dark");
} else {
  setThemeState(document.body.classList.contains(darkTheme));
}

themeButton?.addEventListener("click", () => {
  setThemeState(!document.body.classList.contains(darkTheme));
});

if (window.ScrollReveal) {
  const sr = ScrollReveal({
    origin: "top",
    distance: "40px",
    duration: 900,
    delay: 80,
    easing: "ease",
    reset: false
  });

  sr.reveal(
    `.home_data, .home_visual,
     .about_data, .about_img,
     .section_header, .services_content,
     .foods_content, .app_data, .app_img,
     .contact_data, .contact_button,
     .footer_content`,
    {
      interval: 120
    }
  );
}

scrollActive();
scrollHeader();
toggleScrollTop();
