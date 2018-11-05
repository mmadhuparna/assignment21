var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/Employee'; //mongoDB server
var dbName = 'Employee';
var data = require('./data');

    //connecting to the Employee database
    MongoClient.connect(url, function(err, client) {
         if (err) throw err;
            console.log("Database connected!");
            var db = client.db(dbName);
            
             //inserting 5 more records to the existing Employee collection   
            db.collection("Employee").insertMany(data, function(err,res){
                if(err) throw err;
                console.log(res)
            });
            //displaying result in local host
            app.get('/', (req, res) => {
                db.collection("Employee").find({}).toArray(function(err, result) {
                    if (err) return console.log(err);
                    console.log(result) ; 
                        res.json(result);
                });
            });
             //deleting document with designation developer
            db.collection("Employee").deleteMany({Designation:"Developer"}, function(err,obj){
               if(err) throw error;
                console.log(obj.result.n + " "+ "documents deleted");
                  console.log(obj.result);
            })
            //displayin result after deleting document
            db.collection("Employee").find({}).toArray(function(err,result){
                if(err) throw error;
                console.log(result);
            });
        });
    //listen to port 3000
    app.listen(3000, function() {
        console.log('Magic happens on port :: 3000');
    });