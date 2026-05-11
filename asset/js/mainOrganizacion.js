/**
 * Chinchintirapie Organization Page - Interactive Scripts
 * Handles: Mobile navigation, dropdowns, reveal animations
 */

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const dropdownButtons = document.querySelectorAll(".dropdown-toggle");
const revealElements = document.querySelectorAll(".reveal");

/**
 * Mobile navigation toggle with accessibility support
 */
if (hamburger && navLinks) {
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = navLinks.classList.toggle("is-open");
        hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
        
        // Close all dropdowns when toggling main menu
        dropdownButtons.forEach(btn => btn.setAttribute("aria-expanded", "false"));
    });
}

/**
 * Dropdown menu management
 */
dropdownButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.stopPropagation();
        const expanded = button.getAttribute("aria-expanded") === "true";
        const isOpen = navLinks.classList.contains("is-open");
        
        // Only allow one dropdown open at a time
        dropdownButtons.forEach(btn => {
            if (btn !== button) btn.setAttribute("aria-expanded", "false");
        });
        
        if (!expanded && isOpen) {
            button.setAttribute("aria-expanded", "true");
        }
    });
});

/**
 * Close dropdowns when clicking outside
 */
document.addEventListener("click", (e) => {
    if (!e.target.closest(".has-dropdown")) {
        dropdownButtons.forEach(btn => btn.setAttribute("aria-expanded", "false"));
    }
});

/**
 * Close menu when clicking a link (for mobile)
 */
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        hamburger.setAttribute("aria-expanded", "false");
    });
});

/**
 * Intersection Observer for reveal animations
 * Improves performance by only animating visible elements
 */
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // Optional: unobserve after revealing for performance
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

revealElements.forEach(el => {
    if (el) observer.observe(el);
});