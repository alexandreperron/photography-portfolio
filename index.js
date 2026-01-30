document.addEventListener("DOMContentLoaded", () => {
    console.log('Hi! Welcome to my photography portfolio.');

    const photos = document.querySelectorAll("#gallery img");
    const burger = document.querySelector('.nav .burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    photos.forEach(img => {
        // If already loaded (cached), add class immediately
        if (img.complete) {
            img.classList.add("loaded");
        } else {
            img.addEventListener("load", () => {
                img.classList.add("loaded");
            });
        }
    });

    // Disable right-click and dragging on web (TODO: disable mobile native long-press)
    photos.forEach(img => {
        img.setAttribute("draggable", "false");
        img.addEventListener("contextmenu", (e) => e.preventDefault());
    });

    // Reveal photograph title
    document.querySelectorAll('.photo-block img').forEach(img => {
        img.addEventListener('click', () => {
            img.parentElement.classList.toggle('active');
        });
    });

});


