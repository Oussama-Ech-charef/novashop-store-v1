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


// Cart Badge Update
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const badges = document.querySelectorAll(".cart-count");
    
    badges.forEach(badge => {
        const currentCount = parseInt(badge.textContent, 10) || 0;
        
        if (totalCount > 0) {
            badge.textContent = totalCount;
            badge.classList.remove("hidden");
            
            // If count increases, animate the badge and the icon wrapper
            if (totalCount > currentCount) {
                badge.classList.remove("pulse-anim");
                void badge.offsetWidth; // Trigger DOM reflow
                badge.classList.add("pulse-anim");
                
                const iconWrapper = badge.closest(".cart-icon-wrapper");
                if (iconWrapper) {
                    iconWrapper.classList.remove("shake-anim");
                    void iconWrapper.offsetWidth; // Trigger DOM reflow
                    iconWrapper.classList.add("shake-anim");
                    
                    // Remove classes after animation completes
                    setTimeout(() => {
                        iconWrapper.classList.remove("shake-anim");
                        badge.classList.remove("pulse-anim");
                    }, 500);
                }
            }
        } else {
            badge.classList.add("hidden");
            badge.textContent = "0";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();
});


// Toast Notification system
function showToast(message) {
    let toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "toast-container";
        toastContainer.style.position = "fixed";
        toastContainer.style.bottom = "20px";
        toastContainer.style.right = "20px";
        toastContainer.style.zIndex = "10000";
        toastContainer.style.display = "flex";
        toastContainer.style.flexDirection = "column";
        toastContainer.style.gap = "10px";
        document.body.appendChild(toastContainer);
    }
    
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.style.background = "var(--white-color)";
    toast.style.color = "var(--secondary-color)";
    toast.style.border = "1px solid var(--border-color)";
    toast.style.padding = "15px 25px";
    toast.style.borderRadius = "10px";
    toast.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
    toast.style.fontSize = "0.95rem";
    toast.style.fontWeight = "500";
    toast.style.display = "flex";
    toast.style.alignItems = "center";
    toast.style.gap = "10px";
    toast.style.transform = "translateX(120%)";
    toast.style.transition = "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease";
    toast.style.opacity = "0";
    
    toast.innerHTML = `
        <i class="fa-solid fa-circle-check" style="color: #10b981; font-size: 1.2rem;"></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = "translateX(0)";
        toast.style.opacity = "1";
    }, 10);
    
    setTimeout(() => {
        toast.style.transform = "translateX(120%)";
        toast.style.opacity = "0";
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}