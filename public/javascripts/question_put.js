document.querySelector("#questionForm").addEventListener('submit', updateQuestion);

function updateQuestion(e) {
    e.preventDefault();
    var form = document.querySelector("#questionForm");
    var data = new FormData(form);
    axios.put("/api/question", data).then((res) => {
        console.log("SUCCESFULL UPDATE!");
        M.toast({ html: 'Datos guardados correctamente' })
        location.href = "/questions/" + res.data._id;
    }).catch((err) => {
        M.toast({ html: 'Ocurrio un error durante la petición,vuelva a intentar' })
        console.log(err);
    });
}