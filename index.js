
document.addEventListener("DOMContentLoaded", () => {
    console.log('Hi! Hope you are enjoying my portfolio.');

    const photos = document.querySelectorAll("#gallery img");
    const totalPages = Math.max(...[...photos].map(p => parseInt(p.dataset.page)));
    let currentPage = 1;

    function showPage(page) {
        photos.forEach(img => {
            img.style.display = img.dataset.page == page ? "block" : "none";
        });

        document.getElementById("pageNumber").textContent = `page ${page} / ${totalPages}`;
        document.getElementById("prevPage").disabled = page === 1;
        document.getElementById("nextPage").disabled = page === totalPages;
    }

    document.getElementById("prevPage").addEventListener("click", () => {
        if (currentPage > 1) {
            showPage(--currentPage);
        }
    });

    document.getElementById("nextPage").addEventListener("click", () => {
        if (currentPage < totalPages) {
            showPage(++currentPage);
        }
    });

    showPage(currentPage);
});

