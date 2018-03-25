const express = require('express');
const bodyParser= require('body-parser');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const app = express();
var db;


MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
    if(err) {
        return console.log(err);
    }
    db = client.db('to-do');
})

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    var cursor = db.collection('item').find().toArray(function(err, results) {
        res.render('index.ejs', {items: results});
    });
});

app.post('/item', (req, res) => {
    db.collection('item').save(req.body, (err, result) => {
        if(err) {
            return console.log(err);
        }
        console.log(`Saved request with name : "${req.body.name}" and item : "${req.body.item}" to database.`);
        res.redirect('/');
    });
});

app.delete('/item', (req, res) => {
    var deleter = new mongodb.ObjectID(req.body._id);
    db.collection('item').deleteOne({_id: deleter}, (err, result) => {
        if(err) {
            return console.log(err);
        }
        console.log(`Deleted the document with _id : "${req.body._id}" from the database.`);
        res.redirect('/');
    });
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