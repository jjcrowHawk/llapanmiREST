'use strict';
const conn = require('./schema').Category;

class CategoryModel {

    getAllCategories(callback) {
        conn.find({}, (err, docs) => {
            if (err)
                console.log(err);
            callback(docs);
        });
    }

    getCategoryByName(name, callback) {
        conn.find({ name: name }, (err, doc) => {
            if (err)
                console.log(err);
            callback(doc);
        });
    }

    getSingleCategory(id, callback) {
        conn.find({ _id: id }, (err, doc) => {
            if (err)
                console.log(err);
            callback(doc);
        });
    }
}

module.exports = CategoryModel;