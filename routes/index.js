var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/questions/agregar', function(req, res, next) {
    res.render('question_create');
});

module.exports = router;