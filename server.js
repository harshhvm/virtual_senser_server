var express = require('express')
var bodyParser = require('body-parser')
var app = express()

//mongodb connection

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
//-----------------------------------------------


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('sensor server')
})

app.post('/', function (req, res) {


    console.log(req.body)
    

    var tim = Math.floor(Date.now() / 1000)
    console.log(tim)
    var data={distance: req.body.distance , units: req.body.units , timestamp: tim}

    //insert data in mongodb

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbd = db.db("UltraSonicDb");
        var myData = [data];
        dbd.collection("sensorData").insertMany(myData, function (err, res) {
            if (err) throw err;
            console.log("inserted: " + res.insertedCount);
            db.close();
        });
    });


    

    res.send('posted succesful')
})


app.listen(4000)
console.log("http running on port no 4000")
