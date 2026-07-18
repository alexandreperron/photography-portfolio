/* ==========================================================================
   i18n — tiny translation layer
   Each translatable element gets data-i18n="some.key" in the HTML.
   Language choice is stored in localStorage so it persists across page loads.
   ========================================================================== */
const translations = {
    en: {
        'nav.featured': 'Featured',
        'nav.projects': 'Projects',
        'nav.about': 'About',
        'foot.contact': 'Contact',
        'menu.open': 'Menu',
        'menu.close': 'Close',

        'gallery.eyebrow': 'Selected Work',
        'gallery.lede': 'A curated set of photographs, centered around the Gaspé Peninsula',

        'projects.eyebrow': 'Long-form',
        'projects.lede': 'Visual stories told over multiple frames',
        'project.appalachian.title': 'Appalachian Trail',
        'project.appalachian.desc': 'Documenting solo trail days on foot with my dog',
        'project.winter.title': 'Winter by the Sea',
        'project.winter.desc': 'Living by the St. Lawrence Estuary through harsh winters',

        'about.eyebrow': 'Photographer',
        'about.lede': 'Hobby photographer based in Gaspésie, Québec.',
        'about.p1': 'Welcome to my online portfolio, where I share my favourite visual stories.',
        'about.p2': 'I most often document changing landscapes, breathing coastlines and thriving nature around Gaspésie.',
        'about.p3': 'Most of my photography happens while walking and exploring with my dog Apollo.',
        'about.p4': 'Always amazed by our surroundings, I use my photography to share some of what we observe and experience at home and elsewhere.',
        'about.signoff': 'Thank you for taking the time to stop by.',

        'contact.eyebrow': 'Get in touch',
        'contact.lede': 'Have a project, a print request, or just want to say hello? Send a message below.',
        'form.label.name': 'Name',
        'form.label.email': 'Email',
        'form.label.message': 'Message',
        'form.submit': 'Send message',
        'contact.alt': 'Prefer email directly?',
        'contact.copyBtn': 'Copy my email address',
        'contact.copyBtn.copied': 'Copied to clipboard',

        'thanks.eyebrow': 'Thanks',
        'thanks.title': 'Message sent',
        'thanks.lede': "Your message is on its way — I'll get back to you as soon as I can.",
        'back.home': '← Back home',
        'back.projects': '← All projects',

        'project.eyebrow': 'Project',
        'project.appalachian.lede': 'The photographs you will see from this project were taken on hikes around the International Appalachian Trail, across all seasons. I documented days and days of hiking forested areas, mountain peaks and coastlines with my dog Apollo, often without cell signal: Only us, hiking gear and a camera. The stories are based on harsh weather and seasonal conditions, people and animals we meet, and the changing, unique views the wild eastern coast has to offer.',
        'project.winter.lede': 'Living by the estuary in Eastern Canada allows for a special kind of daily photography. The winters are long, dark, and incredible. We experience frequent northern lights, fractured and frozen coastlines and an interesting wildlife to human population ratio. Home is unique and worth sharing.'
    },
    fr: {
        'nav.featured': 'En vedette',
        'nav.projects': 'Projets',
        'nav.about': 'À propos',
        'foot.contact': 'Contact',
        'menu.open': 'Menu',
        'menu.close': 'Fermer',

        'gallery.eyebrow': 'Sélection de photos',
        'gallery.lede': 'Une sélection de photographies, centrée sur la péninsule gaspésienne',

        'projects.eyebrow': 'Format long',
        'projects.lede': 'Des histoires visuelles racontées en plusieurs images',
        'project.appalachian.title': 'Sentier des Appalaches',
        'project.appalachian.desc': 'Des journées de randonnée en solo, à pied avec mon chien',
        'project.winter.title': 'Hiver en bord de mer',
        'project.winter.desc': "Vivre au bord de l'estuaire du Saint-Laurent à travers des hivers rigoureux",

        'about.eyebrow': 'Photographe',
        'about.lede': 'Photographe amateur basé en Gaspésie, au Québec.',
        'about.p1': 'Bienvenue sur mon portfolio en ligne, où je partage mes histoires visuelles préférées.',
        'about.p2': "Je documente le plus souvent des paysages changeants, des côtes vivantes et une nature florissante autour de la Gaspésie.",
        'about.p3': 'La majorité de mes photos sont prises en marchant et en explorant avec mon chien Apollo.',
        'about.p4': "Toujours émerveillé par notre environnement, j'utilise la photographie pour partager un peu de ce que nous observons et vivons, ici et ailleurs.",
        'about.signoff': "Merci d'avoir pris le temps de faire un tour ici.",

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
        'thanks.lede': "Votre message est en route — je vous répondrai dès que possible.",
        'back.home': "← Retour à l'accueil",
        'back.projects': '← Tous les projets',

        'project.eyebrow': 'Projet',
        'project.appalachian.lede': "Les photographies de ce projet ont été prises lors de randonnées sur le Sentier international des Appalaches, à travers toutes les saisons. J'y ai documenté de nombreuses journées de marche en forêt, en montagne et sur les côtes, avec mon chien Apollo, souvent sans réseau cellulaire : seulement nous, l'équipement de randonnée et un appareil photo. Ces histoires racontent la météo et les conditions saisonnières parfois rudes, les gens et les animaux rencontrés en chemin, ainsi que les paysages changeants et uniques qu'offre cette côte est sauvage.",
        'project.winter.lede': "Vivre au bord de l'estuaire, dans l'Est du Canada, permet une forme particulière de photographie au quotidien. Les hivers y sont longs, sombres et incroyables. On y observe souvent des aurores boréales, des côtes fracturées et gelées, ainsi qu'un rapport faune-population plutôt unique. Ce coin de pays est unique et mérite d'être partagé."
    }
};

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