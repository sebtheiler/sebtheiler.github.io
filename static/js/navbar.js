// Hides the navbar when scrolling down
// Reappears when scrolling up
let lastScrollY = window.scrollY;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // If we are scrolling DOWN and not at the very top
  if (currentScrollY > lastScrollY && currentScrollY > 0) {
    navbar.classList.add("navbar--hidden");
  }
  // If we are scrolling UP
  else {
    navbar.classList.remove("navbar--hidden");
  }

  lastScrollY = currentScrollY;
});
