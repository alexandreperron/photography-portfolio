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
        // Update page numbers
        pageNumberTop.textContent = `${currentPage} / ${totalPages}`;
        pageNumberBottom.textContent = `${currentPage} / ${totalPages}`;

        // Enable/disable top buttons
        prevPageTop.disabled = currentPage === 1;
        nextPageTop.disabled = currentPage === totalPages;

        // Enable/disable bottom buttons
        prevPageBottom.disabled = currentPage === 1;
        nextPageBottom.disabled = currentPage === totalPages;
    }

    function showPage(page) {
        photos.forEach(img => {
            if (img.dataset.page == page) {
                img.style.visibility = "visible";
                img.style.position = "relative";
                img.style.opacity = "1";
            }
            else {
                img.style.visibility = "hidden";
                img.style.position = "absolute";
                img.style.opacity = "0";
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

    // Initial load
    showPage(currentPage);

    // Disable right-click and dragging on web (TODO: disable mobile native long-press)
    photos.forEach(img => {
        img.setAttribute("draggable", "false");
        img.addEventListener("contextmenu", (e) => e.preventDefault());
    });

});
