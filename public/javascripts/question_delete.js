document.querySelectorAll(".del_button").forEach((e) => e.addEventListener('click', deleteQuestion));

function deleteQuestion(e) {
    e.preventDefault();
    console.log("DELETING QUESTION!!")
    var url = e.target.getAttribute("href");
    console.log(url);
    var form = document.querySelector("#questionForm");
    var data = new FormData(form);
    axios.delete("/api" + url).then((res) => {
        console.log("SUCCESFULL DELETE!");
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}