document.addEventListener("DOMContentLoaded", () => {
    console.log('Hi! Hope you are enjoying my portfolio.');



    const photos = document.querySelectorAll("#gallery img");
    const previewBar = document.getElementById("previewBar");

    const totalPages = Math.max(...[...photos].map(p => parseInt(p.dataset.page)));
    let currentPage = 1;

    // Get top and bottom pagination elements
    const pageNumberTop = document.getElementById("pageNumberTop");
    const prevPageTop = document.getElementById("prevPageTop");
    const nextPageTop = document.getElementById("nextPageTop");

    const pageNumberBottom = document.getElementById("pageNumber");
    const prevPageBottom = document.getElementById("prevPage");
    const nextPageBottom = document.getElementById("nextPage");

    const firstPageTop = document.getElementById("firstPageTop");
    const lastPageTop  = document.getElementById("lastPageTop");

    const firstPageBottom = document.getElementById("firstPage");
    const lastPageBottom  = document.getElementById("lastPage");

    const selectedSection = document.getElementById("selected-works");
    const selectedGrid = document.querySelector(".selected-grid");
    const gallerySection = document.getElementById("gallery");

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

    const selectedBlocks = [...document.querySelectorAll("#gallery .photo-block")]
        .filter(block => block.querySelector("img")?.dataset.selected === "true");

    selectedBlocks.forEach(block => {
        const clone = block.cloneNode(true);

        // Reset pagination side effects
        clone.style.display = "";
        clone.removeAttribute("style");

        const img = clone.querySelector("img");
        if (img) {
            img.style.width = "";
            img.style.maxWidth = "";
            img.style.position = "";
            img.style.visibility = "";
            img.style.opacity = "";
        }

        selectedGrid.appendChild(clone);
    });

    function showSelectedWorks() {
        document.body.classList.add("view-selected");
        selectedSection.style.display = "block";
        gallerySection.style.display = "none";
    }

    function showGallery() {
        document.body.classList.remove("view-selected");
        selectedSection.style.display = "none";
        gallerySection.style.display = "";

        showPage(currentPage);
    }

    document.querySelectorAll("[data-view]").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const view = link.dataset.view;

            if (view === "selected") showSelectedWorks();
            if (view === "gallery") showGallery();
        });
    });

    function updatePreviewBar(page) {
        previewBar.innerHTML = "";
        const pageImages = [...photos].filter(img => parseInt(img.dataset.page) === page);

        pageImages.forEach(img => {
            const thumb = document.createElement("img");
            thumb.src = img.src;
            thumb.className = "preview-thumb";
            thumb.addEventListener("click", () => {
                window.scrollTo({ top: img.offsetTop - 20, behavior: "smooth" });
            });
            previewBar.appendChild(thumb);
        });
    }

    function updatePaginationUI() {
        pageNumberTop.textContent = `${currentPage} / ${totalPages}`;
        pageNumberBottom.textContent = `${currentPage} / ${totalPages}`;

        const atStart = currentPage === 1;
        const atEnd   = currentPage === totalPages;

        prevPageTop.disabled = atStart;
        firstPageTop.disabled = atStart;
        nextPageTop.disabled = atEnd;
        lastPageTop.disabled = atEnd;

        prevPageBottom.disabled = atStart;
        firstPageBottom.disabled = atStart;
        nextPageBottom.disabled = atEnd;
        lastPageBottom.disabled = atEnd;
    }

    // Replace at top:
    const blocks = document.querySelectorAll("#gallery .photo-block");

    // Use blocks for preview/update and pagination visibility
    function showPage(page) {
        if (gallerySection.style.display === "none") {
            // Disable pagination logic when not in gallery
            return;
        }
        blocks.forEach(block => {
            const img = block.querySelector('img');
            if (parseInt(img.dataset.page, 10) === page) {
                // show the whole grid item
                block.style.display = "";        // restore normal layout
                // reset any previous inline styles on the image if you had them:
                const image = block.querySelector('img');
                image.style.position = "";
                image.style.visibility = "";
                image.style.opacity = "";
            } else {
                // hide the whole grid item (removes its space)
                block.style.display = "none";
            }
        });

        updatePreviewBar(page);
        updatePaginationUI();
    }


    // Bottom pagination
    prevPageBottom.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    nextPageBottom.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });

    // Top pagination
    prevPageTop.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    nextPageTop.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
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

    function bindPhotoBlockInteractions(scope = document) {
        scope.querySelectorAll('.photo-block').forEach(block => {
            block.addEventListener('click', () => {
                block.classList.toggle('active');
            });
        });
    }


    // First page
    firstPageTop.addEventListener("click", () => goToPage(1));
    firstPageBottom.addEventListener("click", () => goToPage(1));

    // Last page
    lastPageTop.addEventListener("click", () => goToPage(totalPages));
    lastPageBottom.addEventListener("click", () => goToPage(totalPages));

    function goToPage(page) {
        currentPage = Math.min(Math.max(page, 1), totalPages);
        showPage(currentPage);
    }

    // Initial load
    showPage(currentPage);
    showSelectedWorks();

});


