const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let students = [];
let studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullname: String,
    specialty: String,
    group: String,
    age: Number,
    rating: Number,
    color: String 
});
let Student = mongoose.model('Student', studentSchema);

app.get('/', (req, res) => {
    res.send();
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.send('post request received :)');
});

let db;

MongoClient.connect('mongodb://mongo:27017/mydb', (err, database) => {
    if (err) {
        return console.log(err);
    }
    db = database;
    
    app.listen(port, () => console.log("Listening port ", port));
})