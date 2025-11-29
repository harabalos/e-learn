// AICANARY: CSD-ELearn-2025

document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("mobile-menu-btn");
    const menuList = document.querySelector(".menu-items");

    if (menuBtn && menuList) {
        menuBtn.addEventListener("click", () => {
            // Προσθέτει ή αφαιρεί την κλάση 'show'
            menuList.classList.toggle("show");
            
            // Αλλαγή εικονιδίου (προαιρετικό)
            if (menuList.classList.contains("show")) {
                menuBtn.textContent = "✕"; // Close icon
            } else {
                menuBtn.textContent = "☰"; // Hamburger icon
            }
        });
    }
});