'use strict';
const conn = require('./schema'),
    mongoose = require('./connection').mongoose,
    fs = require('fs');

var GridFile;

mongoose.connection.on('open', () => {
    var gridfs = require('mongoose-gridfs')({
        mongooseConnection: mongoose.connection
    });
    GridFile = gridfs.model;
})

class QuestionModel {
    getAll(callback) {
        conn.find({}, (err, docs) => {
            if (err)
                throw err;
            callback(docs);
        });
    }

    getOne(id, callback) {
        conn.findOne({ _id: id }, (err, docs) => {
            if (err)
                throw err;
            callback(docs);
        });
    }

    proof(data) {

    }


    save(data, callback) {
        conn.count({ _id: data._id }, (err, count) => {
            if (err)
                throw err;
            console.log(`Número de Docs: ${count}`);

            if (count == 0) {
                GridFile.write({
                        filename: data.files.imagen.name,
                        contentType: data.files.imagen.type
                    },
                    fs.createReadStream(data.files.imagen.path),
                    function(error, createdFile) {
                        if (error) {
                            console.log(error);
                        }
                        console.log(createdFile);
                        data.fields['imagen'] = createdFile._id;
                        conn.create(data.fields, (err, result) => {
                            if (err)
                                throw err;
                            callback(result);
                        });
                    }
                );
            } else if (count == 1) {
                /*conn.findOneAndUpdate({ _id: data._id }, {
                        name: data.name,
                        twitter: data.twitter,
                        country: data.country,
                        side: data.side
                    },
                    (err) => {
                        if (err)
                            throw (err);
                        cb();
                    }
                );*/
            }
        });
    }

    delete(id, callback) {
        conn.remove({ _id: id }, (err) => {
            if (err)
                throw err;
            callback();
        });
    }
}

module.exports = QuestionModel;