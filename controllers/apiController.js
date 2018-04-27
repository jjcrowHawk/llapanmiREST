'use strict';
const formidable = require('formidable'),
    util = require('util');
const QuestionModel = require('../models/questionModel');
const CategoryModel = require('../models/categoryModel');
const qm = new QuestionModel();
const cm = new CategoryModel();

class apiController {

    getAll(req, res, next) {
        qm.getAll((docs) => {
            res.json(docs);
        })
    }

    getSingle(req, res, next) {
        var id = req.params.id;
        qm.getOne(id, (docs) => {
            res.json(docs);
        })
    }

    createQuestion(req, res, next) {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            if (err) {
                console.log(err);
            } else {
                qm.save({ "fields": fields, "files": files }, (result) => {
                    console.log("QUESTION HAS BEEN CREATED!");
                    res.json(result);
                });
            }
        });
        return;
    }

    delete(req, res, next) {
        var id = req.params.id;
        qm.delete(id, () => {
            console.log("QUESTION DELETED!");
        })
    }

    getAllCategories(req, res, next) {
        cm.getAllCategories((data) => {
            res.json(data);
        });
    }

    getCategoryByName(req, res, next) {
        var name = req.params.name;
        cm.getCategoryByName(name, (data) => {
            res.json(data);
        });
    }

    getSingleCategory(req, res, next) {
        var id = req.params.id;
        cm.getSingleCategory(id, (data) => {
            res.json(data);
        });
    }
}


module.exports = apiController;