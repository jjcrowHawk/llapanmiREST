var express = require('express');
var router = express.Router();
const apiController = require('../controllers/apiController');
const ac = new apiController();

router
// REST methods for questions
    .get("/question", ac.getAll)
    .get("/question/:id", ac.getSingle)
    .post("/question", ac.createQuestion)
    .put("/question/:id", ac.createQuestion)
    .delete("/question/:id", ac.delete)
    //REST methods for categories
    .get("/category", ac.getAllCategories)
    .get("/category/:name", ac.getCategoryByName)
    .get("/category/:id", ac.getSingleCategory);


module.exports = router;