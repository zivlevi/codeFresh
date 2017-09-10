var mysql = require('mysql');
const Transform = require('./transform');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Accounts";
var vals = [];
var con;

exports.createConnection = function (host,user,pass) {
    con = mysql.createConnection({
        host:host,
        user:user,
        password:pass,
    });
    con.connect(function(err) {
        if (err) throw err;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection("contacts").findOne(function(err, res) {
                if (err) throw err;
                console.log("Connected!");
                Transform.TempaddFields(res);
                con.query("CREATE DATABASE Accounts", function (err, result) {
                    if (err) throw err;
                    console.log("Create database Accounts");
                    con.query("use Accounts", function (err, result) {
                        if (err) throw err;
                        console.log("Switch to Account");
                        var sql = "CREATE TABLE accounts ("+Transform.createTable().substring(0,Transform.createTable().length-2)+")";
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log("Table created");
                            db.collection("contacts").count(function (err, maxDoc) {
                                addData(db,0,maxDoc);
                            });
                        });

                    });
                });
            });
        });
    });

}






var createValue = function (res,qur) {
    for (var key in res){
        if (res[key] !== null && typeof res[key] === 'object' && Object.keys(res[key]).valueOf()[1]!='id'){
            createValue(res[key])
        }
        else {
            vals.push(res[key]);
        }
    }
}



function addData(db,docNum,maxDoc) {
    console.log(docNum);
    db.collection("contacts").find({},{},{skip:docNum,limit:10000}, function (err, lst) {
        lst.forEach(function (items) {
            var qur = "";
            createValue(items, qur);
            for (var i in vals) {
                if (vals[i].toString() == 'true') {
                    vals[i] = 1;
                }
                else if (vals[i].toString() == 'false') {
                    vals[i] = 0;
                }
                qur = qur + "'" + vals[i] + "', ";
            }
            vals = [];
            var sql = "INSERT INTO accounts VALUES (" + qur.substring(0, qur.length - 2) + ")";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("one record inserted");
                docNum = docNum + 1;
                console.log("docNum:"+docNum);
                if (docNum < maxDoc && docNum % 10000 === 0) {

                    addData(db, docNum, maxDoc)
                }
            });
        })

    });
}
