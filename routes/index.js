const express = require("express");
router = express.Router();

const mongojs = require('mongojs');
var db = mongojs('localhost:32017/webtut', ['users']);
//create test arraay to rerurn as a response
var myitems = require('../public/js/items.json');
menus = []
myitems.forEach(element => {
    // console.log(element.menu.items);
    //console.log(element)
    menus.push(element.menu.items)
});
//console.log(menus)
menus.forEach(item => {
    //console.log(item)
})
router.get('/', (req, res, next) => {
    //get db docs
    people = null;
    db.users.find(function(err, docs) {
        if (err) throw err;

        people = docs;
        console.log('users:', people);

        console.log('users:', people);
        //res.send("Welcome")
        res.render('index', { items: menus, errors: null, title: "Simple Crud App in ExpressJs & Mongo", people: people })
    });
});
module.exports = router;