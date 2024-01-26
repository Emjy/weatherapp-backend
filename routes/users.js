var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');


let fields = ["email", "password"]

router.post('/signup', (req, res) => {
    if (checkBody(req.body, fields) === false) {
        return res.json({ result: false, error: 'Missing or empty fields' })
    } else {
        User.findOne({ email: req.body.email })
            .then((data) => {
                // Vérifier si email ou password est manquant

                if (data && req.body.email === data.email) {
                    return res.json({ result: false, error: 'User already exists' });
                } else {
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    });
                    newUser.save().then(newUser => {
                        return res.json({ result: true });
                    });
                }

            });

    }

});

router.post('/signin', (req, res) => {
    if (checkBody(req.body, fields) === false) {
        return res.json({ result: false, error: 'Missing or empty fields' });
    } else {
        User.findOne({ email: req.body.email, password: req.body.password })
            .then((data) => {
                if (!data) {
                    return res.json({ result: false, error: 'User not found' });
                } else if (req.body.password === data.password && req.body.email === data.email) {
                    return res.json({ result: true });
                }
            })
    }


});



module.exports = router;