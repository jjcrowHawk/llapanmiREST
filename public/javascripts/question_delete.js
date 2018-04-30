document.querySelectorAll(".del_button").forEach((e) => e.addEventListener('click', deleteQuestion));

function deleteQuestion(e) {
    e.preventDefault();
    console.log("DELETING QUESTION!!")
    var url = e.target.getAttribute("href");
    console.log(url);
    var form = document.querySelector("#questionForm");
    var data = new FormData(form);
    axios.delete("/api" + url).then((res) => {
        M.toast({ html: 'El elemento ha sido eliminado correctamente!' });
        location.href = "/questions/eliminar";
    }).catch((err) => {
        M.toast({ html: 'Ha ocurrido un error al realizar la petición, vuelve a intentar' });
    });
}