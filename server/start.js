const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());     //
app.use(express.urlencoded()); //

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
    console.log("server getting...");

    db.collection("students").find().toArray((err, result) => {
            if (err) {
                return console.log(err);
            }

            res.send(result);
        })
});

app.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        console.log('update reqbody: ', req.body);  
        console.log('file: ', req.file);

        // let filePath = '/' + req.file.path + '.' + req.file.mimetype.split('/')[1]; // mimetype: image/png
        let filePath = req.file.path;
        console.log('filepath: ', filePath);

        student = Object.assign({'avatar': filePath}, req.body);
        console.log('student: ', student);

        db.collection("students").insertOne(student, (err, res) => {
            if (err) return console.log("unsuccessful insert: ", err);
            
            console.log("successful insert: ", student);
        });
        res.sendStatus(200);
    });

});


app.delete('/delete/:id', (req, result) => {
    console.log("deleting: ", req.params.id);
    db.collection("students").findOneAndDelete({"_id": new ObjectId(req.params.id)}, (err, res) => {
        if (err) {
            return console.log(err);
        }
        console.log("successful delete: ", req.params.id);
        result.send("OK")
    });
});

MongoClient.connect('mongodb://mongo:27017/mydb', (err, client) => {
    if (err) {
        return console.log(err);
    }

    db = client.db("myapp");

    
    app.listen(port, () => console.log("Listening port ", port));
})