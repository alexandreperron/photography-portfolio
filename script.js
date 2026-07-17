document.addEventListener("DOMContentLoaded", () => {

    /* ---------- Nav (sidebar on desktop, dropdown panel on mobile) ---------- */
    const toggle = document.getElementById('menuToggle');
    const panel = document.getElementById('navPanel');

    if (toggle && panel) {
        const closeNav = () => {
            panel.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.textContent = 'Menu';
        };

        toggle.addEventListener('click', () => {
            const isOpen = panel.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            toggle.textContent = isOpen ? 'Close' : 'Menu';
        });

        panel.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeNav);
        });
    }

    /* ---------- Contact form: clear stale values if restored via back/forward cache ---------- */
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        window.addEventListener('pageshow', (event) => {
            if (event.persisted) {
                contactForm.reset();
            }
        });
    }

    /* ---------- Copy-email button (contact page fallback) ---------- */
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = atob(copyEmailBtn.dataset.emailB64);
            navigator.clipboard.writeText(email).then(() => {
                const original = copyEmailBtn.textContent;
                copyEmailBtn.textContent = 'Copied to clipboard';
                setTimeout(() => { copyEmailBtn.textContent = original; }, 2000);
            });
        });
    }

    /* ---------- Gallery (only runs on pages that have #gallery) ---------- */
    const photos = document.querySelectorAll("#gallery img");
    if (!photos.length) return;

    // Give each photo-block an ID derived from the image filename
    photos.forEach(img => {
        const slug = img.src.split('/').pop().replace(/\.[a-zA-Z]+$/, '');
        img.closest('.photo-block').id = slug;
    });

    photos.forEach(img => {
        if (img.complete) {
            img.classList.add("loaded");
        } else {
            img.addEventListener("load", () => img.classList.add("loaded"));
        }
    });

    // Disable right-click, dragging, and mobile long-press
    photos.forEach(img => {
        img.setAttribute("draggable", "false");
        img.addEventListener("contextmenu", (e) => e.preventDefault());

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