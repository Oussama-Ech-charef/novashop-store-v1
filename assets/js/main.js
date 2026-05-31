// Mobile Menu

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const menuIcon = document.querySelector(".menu-toggle i");
const overlay = document.querySelector(".overlay");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    overlay.classList.toggle("active");

    if (menuIcon.classList.contains("fa-bars")) {

        menuIcon.classList.replace("fa-bars", "fa-xmark");

    } else {

        menuIcon.classList.replace("fa-xmark", "fa-bars");

    }

});


// Search Toggle

const searchBtn = document.querySelector(".search-toggle");
const searchBox = document.querySelector(".search-box");

searchBtn.addEventListener("click", (e) => {

    e.preventDefault();

    e.stopPropagation();

    searchBox.classList.toggle("active");

});


// Prevent Search Close

searchBox.addEventListener("click", (e) => {

    e.stopPropagation();

});


// Overlay Click

overlay.addEventListener("click", () => {

    navLinks.classList.remove("active");

    overlay.classList.remove("active");

    menuIcon.classList.replace("fa-xmark", "fa-bars");

});


// Click Outside


document.addEventListener("click", (e) => {

    // Close Search

    if (
        !searchBox.contains(e.target) &&
        !searchBtn.contains(e.target)
    ) {

        searchBox.classList.remove("active");

    }

    // Close Sidebar

    if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(e.target) &&
        !menuToggle.contains(e.target)
    ) {

        navLinks.classList.remove("active");

        overlay.classList.remove("active");

        menuIcon.classList.replace("fa-xmark", "fa-bars");

    }

});