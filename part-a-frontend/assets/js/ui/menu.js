document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("mobile-menu-btn");
    const menuList = document.querySelector(".menu-items");

    if (menuBtn && menuList) {
        menuBtn.addEventListener("click", () => {
            menuList.classList.toggle("show");
            
            if (menuList.classList.contains("show")) {
                menuBtn.textContent = "✕"; //close icon
            } else {
                menuBtn.textContent = "☰"; //hamburger icon
            }
        });
    }
});