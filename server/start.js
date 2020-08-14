const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 5000;


app.use(express.json());     //
app.use(express.static(__dirname));

const storageConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads");
    },
    // filename: (req, file, callback) => {
    //     callback(null, file.originalname) //
    // },
});
const upload = multer({storage: storageConfig}).single("avatar");


app.set('json spaces', 2); //

let db;

app.get('/get', (req, res) => {
    db.collection("students").find().toArray((err, result) => {
            if (err) {
                return console.log(err);
            }
            res.send(result);
        })
});

app.post('/send', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        let filePath = req.file.path;

        student = Object.assign({'avatar': filePath}, req.body);

        db.collection("students").insertOne(student, (err, res) => {
            if (err) return console.log("unsuccessful insert: ", err);
            
            console.log("successful insert: ", student);
        });
        res.sendStatus(201);
    });

});


app.delete('/delete/:id/:path', (req, result) => {
    console.log("deleting: ", req.params.id);
    db.collection("students").findOneAndDelete({"_id": new ObjectId(req.params.id)}, (err, res) => {
        if (err) {
            return console.log(err);
        }

        console.log(req.params.path)
        fs.unlink(`/uploads/${req.params.path}`, (err) => {console.log(err)});
        
        console.log("successful delete: ", req.params.id);
        result.send(200)
    });
});

MongoClient.connect('mongodb://mongo:27017/mydb', (err, client) => {
    if (err) {
        return console.log(err);
    }

    db = client.db("myapp");

    
    app.listen(port, () => console.log("Listening port ", port));
})