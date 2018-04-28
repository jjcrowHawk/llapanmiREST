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
        conn.count({ _id: data.fields.id }, (err, count) => {
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
                            conn.findOneAndUpdate({ _id: data.fields.id }, {
                                categoria: data.fields.categoria,
                                pregunta: data.fields.pregunta,
                                respuesta_correcta: data.fields.respuesta_correcta,
                                respuesta1: data.fields.respuesta1,
                                respuesta2: data.fields.respuesta2,
                                respuesta3: data.fields.respuesta3,
                                respuesta4: data.fields.respuesta4,
                                explicacion: data.fields.explicacion,
                                imagen: data.fields.imagen,
                                nombre_imagen: data.fields.nombre_imagen
                            }, (err, result) => {
                                if (err)
                                    console.log(err);
                                callback(result);
                            });
                        }
                    );
                } else {
                    conn.findOneAndUpdate({ _id: data.fields.id }, {
                        categoria: data.fields.categoria,
                        pregunta: data.fields.pregunta,
                        respuesta_correcta: data.fields.respuesta_correcta,
                        respuesta1: data.fields.respuesta1,
                        respuesta2: data.fields.respuesta2,
                        respuesta3: data.fields.respuesta3,
                        respuesta4: data.fields.respuesta4,
                        explicacion: data.fields.explicacion,
                    }, (err, result) => {
                        if (err)
                            console.log(err);
                        callback(result);
                    });
                }
            }
        });
    }

    delete(id, callback) {
        conn.remove({ _id: id }, (err, data) => {
            if (err)
                throw err;
            callback(data);
        });
    }
}

module.exports = QuestionModel;