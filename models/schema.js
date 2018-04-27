'use strict';

const mongoose = require('./connection').mongoose,
    Schema = mongoose.Schema,

    QuestionSchema = new Schema({
        categoria: Schema.Types.ObjectId,
        pregunta: String,
        respuesta_correcta: String,
        respuesta1: String,
        respuesta2: String,
        respuesta3: String,
        respuesta4: String,
        explicacion: String,
        imagen: Schema.Types.ObjectId,
        nombre_imagen: String
    }, {
        collection: 'questions'
    }),

    CategorySchema = new Schema({
        nombre: String,
        descripcion: String
    }),

    Question = mongoose.model('Question', QuestionSchema),
    Category = mongoose.model('Category', CategorySchema);

module.exports = {
    "Question": Question,
    "Category": Category
};