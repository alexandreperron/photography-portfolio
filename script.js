/* ==========================================================================
   i18n — tiny translation layer
   English text lives in the HTML itself. Each translatable element carries
   data-i18n="some.key" and its English text; on load, that text is read from
   the page and remembered, so switching back to English needs no dictionary.
   Only French is stored below. A key missing from French falls back to English.
   Language choice is stored in localStorage so it persists across page loads.
   ========================================================================== */
const translations = {
    // English is filled from the HTML at load (see captureEnglish).
    // Only strings that JavaScript itself displays, and that never appear in the HTML, are listed here.
    en: {
        'menu.close': 'Close',
        'contact.copyBtn.copied': 'Copied to clipboard'
    },
    fr: {
        'nav.featured': 'En vedette',
        'nav.about': 'À propos',
        'foot.contact': 'Contact',
        'menu.open': 'Menu',
        'menu.close': 'Fermer',

        'about.eyebrow': 'Photographe',
        'about.lede': 'Basé en Gaspésie, au Québec.',
        'about.p1': "La majorité de mon travail commence près de chez moi, sur les rives de l'estuaire. Promenades côtières avec mon husky Apollo, randonnées sur les sommets environnants.",
        'about.p2': "Puis les escapades urbaines et voyages plus lointains.",
        'about.p3': "Je photographie souvent avec un équipement minimaliste, privilégiant une approche réfléchie et posée de la composition lorsque possible.",
        'about.p4': "Ma photographie est ma façon de partager - ce que je découvre et apprécie.",
        'about.p5': "Merci de votre visite, et n'hésitez pas à m'écrire si cela vous parle.",
        'contact.eyebrow': 'Entrer en contact',
        'contact.lede': "Un projet, une demande d'impression, ou simplement envie de dire bonjour? Envoyez un message ci-dessous.",
        'form.label.name': 'Nom',
        'form.label.email': 'Courriel',
        'form.label.message': 'Message',
        'form.submit': 'Envoyer le message',
        'contact.alt': 'Vous préférez écrire directement par courriel?',
        'contact.copyBtn': 'Copier mon adresse courriel',
        'contact.copyBtn.copied': 'Copié dans le presse-papiers',

        'thanks.eyebrow': 'Merci',
        'thanks.title': 'Message envoyé',
        'thanks.lede': "Votre message est en route. Je vous répondrai dès que possible.",
        'back.home': "← Retour à l'accueil",

        'nav.blog': 'Blogue',
        'blog.eyebrow': 'Vidéo',
        'blog.lede': "Des vidéos en coulisses et des revues de matériel photo, quand je trouve le temps d'en faire.",
        'blog.video1.title': '6 mois avec les Nikkor Z 40mm + 28mm - Revue d\'un kit à deux objectifs',
        'blog.video1.desc': "Un retour sur six mois à photographier paysages et bords de mer avec seulement deux objectifs à focale fixe.",
        'blog.video2.title': 'La photo de bord de mer',
        'blog.video2.desc': 'Une discussion technique avec exemples photo, sur la photographie au bord de la mer.',
        'blog.video3.title': '10 photos - 1 endroit - 1 lentille fixe',
        'blog.video3.desc': "Défi d'une soirée: 10 photos à un seul endroit avec une seule lentille à focale fixe."
    }
};

function captureEnglish() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (!(key in translations.en)) translations.en[key] = el.textContent.trim();
    });
}

function getLang() {
    const saved = localStorage.getItem('lang');
    if (saved === 'en' || saved === 'fr') return saved;
    return navigator.language && navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

function t(key, lang) {
    const dict = translations[lang] || translations.en;
    return dict[key] !== undefined ? dict[key] : (translations.en[key] || key);
}

function applyTranslations(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.getAttribute('data-i18n'), lang);
    });

    document.querySelectorAll('.lang-link').forEach(btn => {
        btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });

    // Keep the mobile menu-toggle label in sync with the current language + open state
    const toggle = document.getElementById('menuToggle');
    const panel = document.getElementById('navPanel');
    if (toggle) {
        const isOpen = panel && panel.classList.contains('open');
        toggle.textContent = t(isOpen ? 'menu.close' : 'menu.open', lang);
    }
}

function setLang(lang) {
    localStorage.setItem('lang', lang);
    applyTranslations(lang);
}

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- Language switch ---------- */
    captureEnglish();
    const currentLang = getLang();
    applyTranslations(currentLang);

    document.querySelectorAll('.lang-link').forEach(btn => {
        btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });

    /* ---------- Nav (sidebar on desktop, dropdown panel on mobile) ---------- */
    const toggle = document.getElementById('menuToggle');
    const panel = document.getElementById('navPanel');

    if (toggle && panel) {
        const closeNav = () => {
            panel.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.textContent = t('menu.open', getLang());
        };

        toggle.addEventListener('click', () => {
            const isOpen = panel.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            toggle.textContent = t(isOpen ? 'menu.close' : 'menu.open', getLang());
        });

        panel.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeNav);
        });
    }

    /* ---------- Video cards (blog page): click thumbnail to swap in a real embed ---------- */
    document.querySelectorAll('.video-card').forEach(card => {
        const trigger = card.querySelector('.video-card-media');
        const videoId = card.dataset.youtubeId;
        if (!trigger || !videoId) return;

        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            iframe.className = 'video-card-media';
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', '');
            trigger.replaceWith(iframe);
        }, { once: true });
    });

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
                const lang = getLang();
                copyEmailBtn.textContent = t('contact.copyBtn.copied', lang);
                setTimeout(() => { copyEmailBtn.textContent = t('contact.copyBtn', lang); }, 2000);
            });
        });
    }

    /* ---------- Gallery (only runs on pages that have #gallery) ---------- */
    const photos = document.querySelectorAll("#gallery img");
    if (!photos.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Give each photo-block an ID derived from the image filename
    photos.forEach(img => {
        const slug = img.src.split('/').pop().replace(/\.[a-zA-Z]+$/, '');
        img.closest('.photo-block').id = slug;
    });

    // Fade photos in as they finish loading (see ".js #gallery img" in styles.css)
    photos.forEach(img => {
        const show = () => img.classList.add("loaded");
        if (img.complete) {
            show();
        } else {
            img.addEventListener("load", show);
            img.addEventListener("error", show);
        }
    });

    // On wide screens portraits sit two per row. If a run of portraits is an odd number,
    // the last one is centred instead of leaving an empty half-row.
    let portraitRun = [];
    const closePortraitRun = () => {
        if (portraitRun.length % 2 === 1) portraitRun[portraitRun.length - 1].classList.add('portrait-solo');
        portraitRun = [];
    };
    document.querySelectorAll('#gallery .photo-block').forEach(block => {
        if (block.classList.contains('portrait')) portraitRun.push(block);
        else closePortraitRun();
    });
    closePortraitRun();

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

    // Clicking a photo marks it as selected (showing its copy-link icon on mouse devices) and updates the URL hash
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
    const ICON_LINK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
    const ICON_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';

    document.querySelectorAll('.photo-caption').forEach(caption => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'share-btn';
        btn.title = 'Copy link';
        btn.setAttribute('aria-label', 'Copy link to this photo');
        btn.innerHTML = ICON_LINK;
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const block = caption.closest('.photo-block');
            const url = `${window.location.origin}${window.location.pathname}#${block.id}`;
            navigator.clipboard.writeText(url).then(() => {
                btn.innerHTML = ICON_CHECK;
                setTimeout(() => { btn.innerHTML = ICON_LINK; }, 2000);
            });
        });
        caption.appendChild(btn);
    });

    // On page load, check for a hash and scroll to / open that photo.
    // (getElementById, not querySelector: IDs here start with a digit, which is not a valid CSS selector.)
    if (location.hash) {
        const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (target) {
            target.classList.add('active');
            setTimeout(() => {
                target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
            }, 100);
        }
    }
});
