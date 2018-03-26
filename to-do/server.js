const express = require('express');
const bodyParser= require('body-parser');
const mongodb = require('mongodb');

const app = express();
var db;
var collection;

mongodb.MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
    if(err) {
        return console.log(err);
    }
    db = client.db('to-do');
    collection = db.collection('item');
})

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    var cursor = collection.find().toArray(function(err, results) {
        res.render('index.ejs', {items: results});
    });
});

app.post('/item', (req, res) => {
    collection.save(req.body, (err, result) => {
        if(err) {
            return console.log(err);
        }
        console.log(`Saved request with name : "${req.body.name}" and item : "${req.body.item}" to database.`);
        res.redirect('/');
    });
});

app.delete('/item', (req, res) => {
    var deleter = mongodb.ObjectID(req.body._id);
    collection.deleteOne({_id: deleter}, (err, result) => {
        if(err) {
            return console.log(err);
        }
        console.log(`Deleted the document with _id : "${req.body._id}" from the database.`);
        res.redirect('/');
    });
});

app.get('/edit/:_id', function(req, res) {
    var _id = mongodb.ObjectID(req.params._id);

    collection.findOne({_id: _id}, (err, document) => {
        if(err) {
            return console.log(err);
        }
        res.render('edit.ejs', {document: document});
    });
});

app.post('/edit/:_id', function(req, res) {
    var _id = mongodb.ObjectID(req.params._id);
    collection.updateOne({_id: _id}, {$set:{name: req.body.name, item: req.body.item}}, (err) => {
        if(err) {
            return console.log(err);
        }
        console.log(`Edited the document with _id : "${_id}" to name : "${req.body.name}" and item : "${req.body.item}" in the database.`);
    });
    res.redirect('/');
});

app.post('/reset', (req, res) => {
    db.dropDatabase({}, (err) => {
        if(err) {
            return console.log(err);
        }
        console.log("Database was just reset.");
        res.redirect('/');
    });
});


const serverIp = '127.0.0.1';
const serverPort = 1337;

app.listen(serverPort, serverIp, function() {
    console.log(`Server running at 'http://${serverIp}:${serverPort}/'`);
});