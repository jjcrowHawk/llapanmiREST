var express = require('express');
var router = express.Router();
const CategoryModel = require('../models/categoryModel');
const cm = new CategoryModel();
const QuestionModel = require('../models/questionModel');
const qm = new QuestionModel();
/* GET home page. */
router.get('/home', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/questions/ver', function(req, res, next) {
    qm.getAll((data) => {
        console.log(data);
        data.forEach(element => {
            cm.getSingleCategory(element.categoria, (cat) => {
                element.nom_categoria = cat[0].nombre;
                console.log(element.nom_categoria)
                if (element == data[data.length - 1]) {
                    console.log("the last one!");
                    res.render('question_list', { 'questions': data });

                }
            })
        });
    });
});

router.get('/questions/agregar', function(req, res, next) {
    cm.getAllCategories((data) => {
        console.log(data);
        res.render('question_create', { 'categories': data });
    });
});

router.get('/questions/editar', function(req, res, next) {
    qm.getAll((data) => {
        console.log(data);
        data.forEach(element => {
            cm.getSingleCategory(element.categoria, (cat) => {
                element.nom_categoria = cat[0].nombre;
                console.log(element.nom_categoria)
                if (element == data[data.length - 1]) {
                    console.log("the last one!");
                    res.render('question_edit', { 'questions': data });

                }
            })
        });
    });
});

router.get('/questions/eliminar', function(req, res, next) {
    qm.getAll((data) => {
        console.log(data);
        data.forEach(element => {
            cm.getSingleCategory(element.categoria, (cat) => {
                element.nom_categoria = cat[0].nombre;
                console.log(element.nom_categoria)
                if (element == data[data.length - 1]) {
                    console.log("the last one!");
                    res.render('question_delete', { 'questions': data });

                }
            })
        });
    });
});

router.get('/questions/:id', function(req, res, next) {
    var id = req.params.id;
    qm.getOne(id, (question) => {
        console.log(question);
        cm.getSingleCategory(question.categoria, (cat) => {
            question.nom_categoria = cat[0].nombre;
            cm.getAllCategories((cats) => {
                console.log(cats + "\ncount:" + cats.length);
                cats = cats.filter((category) => category.nombre !== question.nom_categoria);
                console.log(cats + "\ncount:" + cats.length);
                res.render('question_layout', { 'question': question, 'categories': cats });
            });
        });
    });
});

module.exports = router;