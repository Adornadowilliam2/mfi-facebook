// Get the button
const backToTopButton = document.getElementById("backToTopBtn");

// When the user scrolls down 100px from the top of the document, show the button
window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

// When the user clicks the button, scroll to the top of the document
backToTopButton.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // This makes the scroll action smooth
    });
};


const closebtn = document.getElementById("closeBtn");
const modal = document.getElementById("modal");
modal.style.display = "none";
closebtn.addEventListener("click", () => {
    modal.style.display = "none"
})

const openModal = document.getElementById("openModal");
openModal.addEventListener("click", () => {
    modal.style.display = "block";
})