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

    // Give each photo-block an ID derived from the image filename
    photos.forEach(img => {
        const slug = img.src.split('/').pop().replace('.jpg', '');
        img.closest('.photo-block').id = slug;
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

    // Disable right-click, dragging, and mobile long-press
    photos.forEach(img => {
        img.setAttribute("draggable", "false");

        // Desktop: block right-click context menu
        img.addEventListener("contextmenu", (e) => e.preventDefault());

        // Mobile: block long-press native menu
        let pressTimer;
        img.addEventListener("touchstart", (e) => {
            pressTimer = setTimeout(() => e.preventDefault(), 500);
        }, { passive: false });

        img.addEventListener("touchend", () => clearTimeout(pressTimer));
        img.addEventListener("touchmove", () => clearTimeout(pressTimer));
    });

    // Reveal photograph title and update URL hash on click
    document.querySelectorAll('.photo-block img').forEach(img => {
        img.addEventListener('click', () => {
            const block = img.parentElement;
            block.classList.toggle('active');
            if (block.classList.contains('active')) {
                history.pushState(null, '', `#${block.id}`);
            } else {
                history.pushState(null, '', window.location.pathname);
            }
        });
    });

    // Add a copy-link button to each caption
    document.querySelectorAll('.photo-caption').forEach(caption => {
        const btn = document.createElement('button');
        btn.textContent = '🔗';
        btn.className = 'share-btn';
        btn.title = 'Copy link';
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const block = caption.closest('.photo-block');
            const url = `${window.location.origin}${window.location.pathname}#${block.id}`;
            navigator.clipboard.writeText(url).then(() => {
                btn.textContent = '✓';
                setTimeout(() => btn.textContent = '🔗', 2000);
            });
        });
        caption.appendChild(btn);
    });

    // On page load, check for a hash and scroll to / open that photo
    if (location.hash) {
        const target = document.querySelector(location.hash);
        if (target) {
            target.classList.add('active');
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }

});