let menuIcon = document.getElementById("menu-icon");
let navLinks = document.getElementById("nav-links");

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    navLinks.classList.toggle('active');

    if(menuIcon.classList.contains("active")){
        body.style.overflowY = "hidden";
    } else {
        body.style.overflowY = "auto";
    }
})

