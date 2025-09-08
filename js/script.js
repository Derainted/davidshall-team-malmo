const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme");

  // Change icon/text
  if (body.classList.contains("dark-theme")) {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
  }

  // Save preference
  localStorage.setItem(
    "theme",
    body.classList.contains("dark-theme") ? "dark" : "light"
  );
});

// Load theme preference
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-theme");
  themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
}


