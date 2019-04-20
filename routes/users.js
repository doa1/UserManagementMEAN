const express = require("express");
const router = express.Router();
const mongojs = require("mongojs");
var db = mongojs('localhost:32017/webtut', ['users']);
var ObjectId = mongojs.ObjectId;
//handle form post 
router.post('/add', (req, res) => {

    //form input validation
    req.checkBody('fname', 'First Name is required').notEmpty();
    req.checkBody('lname', "Last Name is required").notEmpty();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('email', "Email  is required").notEmpty();
    req.checkBody('email', "Email must be valid").isEmail();

    //catch the form errors

    var errors = req.validationErrors();
    if (errors) {
        console.log(errors);
        //req.flash('error', "Error occured");
        res.render('index', { title: "ERROR", errors: errors, people: null })
    } else {
        var newUser = { //retrieve the form data
            fname: req.body.fname,
            lname: req.body.lname,
            username: req.body.username,
            email: req.body.email

        }
        db.users.insert([newUser], function(err, result) {
            if (err) { console.log(err); } else {
                res.redirect('/');
            }
        });

        console.log(newUser);
    }

});
//handle deletion of users 
router.delete('/delete/:id', function(req, res) {
    id = req.params.id;
    console.log('id ', ObjectId(id));
    db.users.remove({ _id: ObjectId(id) }, function(err, don) {
        if (err) console.log("ERROR " + err);
        console.log("GOOD ", don);
        res.redirect("/")
    });

});
module.exports = router;