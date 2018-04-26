'use strict';
const formidable = require('formidable'),
    util = require('util');
const QuestionModel = require('../models/questionModel');
const qm = new QuestionModel();

class QuestionController {

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
                console.log("Its doing something!!!!!!!!");
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
}

module.exports = QuestionController;