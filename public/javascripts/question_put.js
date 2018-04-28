document.querySelector("#questionForm").addEventListener('submit', updateQuestion);

function updateQuestion(e) {
    e.preventDefault();
    var form = document.querySelector("#questionForm");
    var data = new FormData(form);
    axios.put("/api/question", data).then((res) => {
        console.log("SUCCESFULL UPDATE!");
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}