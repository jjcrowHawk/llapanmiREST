var express = require('express');
var router = express.Router();
const apiController = require('../controllers/apiController');
const ac = new apiController();

router
    .get("/question", ac.getAll)
    .get("/question/:id", ac.getSingle)
    .post("/question", ac.createQuestion)
    //.put("/question/:id")
    .delete("/question/:id", ac.delete);

module.exports = router;