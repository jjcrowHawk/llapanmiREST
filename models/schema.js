'use strict';

const mongoose = require('./connection').mongoose,
    Schema = mongoose.Schema,

    QuestionSchema = new Schema({
        area: String,
        pregunta: String,
        respuesta_correcta: String,
        respuesta1: String,
        respuesta2: String,
        respuesta3: String,
        respuesta4: String,
        explicacion: String,
        imagen: Schema.Types.ObjectId
    }, {
        collection: 'questions'
    }),

    Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;