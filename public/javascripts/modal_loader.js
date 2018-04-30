document.querySelectorAll("a.modal-trigger").forEach((elem) => elem.addEventListener('click', loadContent));

function loadContent(e) {
    img_src = e.target.getAttribute("src");
    img_modal = document.querySelector("div.modal-content img");
    img_modal.src = img_src;
}