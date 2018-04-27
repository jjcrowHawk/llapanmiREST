'use strict';
const conn = require('./schema').Question,
    mongoose = require('./connection').mongoose,
    fs = require('fs'),
    path = require("path");
const CategoryModel = require('./categoryModel'),
    cm = new CategoryModel();

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
        console.log(data);
        conn.count({ _id: data._id }, (err, count) => {
            if (err)
                throw err;
            console.log(`Número de Docs: ${count}`);

            if (count == 0) {
                if (data.files.imagen.name != '' && data.files.imagen.size != 0) {

                    //uploading image to server public dir
                    cm.getSingleCategory(data.fields.categoria, (cat) => {
                        console.log("this cat: \n" + JSON.stringify(cat));
                        var categoria = cat[0].nombre;
                        console.log("cat name: " + categoria);
                        var targetPath = path.resolve(`./public/images/${categoria}/${data.files.imagen.name}`);
                        console.log(targetPath);
                        fs.rename(data.files.imagen.path, targetPath, function(err) {
                            if (err) throw err;
                            console.log("Upload completed!");
                        });
                    });

                    //write image to db 
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
                            data.fields['nombre_imagen'] = data.files.imagen.name;
                            conn.create(data.fields, (err, result) => {
                                if (err)
                                    throw err;
                                callback(result);
                            });
                        }
                    );
                } else {
                    conn.create(data.fields, (err, result) => {
                        if (err)
                            throw err;
                        callback(result);
                    });
                }
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