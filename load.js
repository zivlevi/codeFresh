/**
 * Created by zivlevi1 on 10.9.2017.
 */
var mysql = require('mysql');
const Transform = require('./transform');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Accounts";
var vals = [];
var fields = [];
var HashMap = require('hashmap');
var con;
var globalFields;
var globalTypes;
var tableInfo=new HashMap();

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
                                globalFields = Transform.getColums();
                                globalTypes = Transform.getTypes();
                                for (var i in globalFields){
                                    tableInfo.set(globalFields[i], globalTypes[i]);
                                }
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
            fields.push(key);
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
            fields=[];
            var sql = "INSERT INTO accounts VALUES (" + qur.substring(0, qur.length - 2) + ")";
            con.query(sql, function (err, result) {
                if (err)
                    changeTable(con,items);
                docNum = docNum + 1;
                if (docNum < maxDoc && docNum % 10000 === 0) {
                    console.log("10000 record inserted");
                    addData(db, docNum, maxDoc)
                }
            });
        })

    });
}



function changeTable(con,items) {
    createValue(items);
    var newRows = new HashMap();
    for (var i in vals) {
        newRows.set(fields[i], vals[i]);
    }
    for (var i in fields){
        if (fields[i]!==globalFields[i] || typeof (vals[i]) !== globalTypes[i]){
            newRows.set(fields[i], vals[i]);
        }
    }
    newRows.forEach(function(value, key) {
        var newkey = "mySQL"+key;
        if (tableInfo.get(newkey)!=null && tableInfo.get(newkey)==typeof (newRows.get(key))){
            newRows.delete(key);
        }
        else if (tableInfo.get(newkey)!=null && tableInfo.get(newkey)!=typeof (newRows.get(key))){
            console.log(key);
            var val = newRows.get(key);
            var newkey = key+"_"+typeof (newRows.get(key));
            newRows.delete(key);
            newRows.set(newkey,val);
            for (var i in fields) {
                if (fields[i]==key){
                    fields[i]=newkey
                    vals[i]=val;
                }
            }
        }
    });
    if (newRows.size > 0){
        newRows.forEach(function(value, key) {
            var sql ="ALTER TABLE accounts ADD mySQL"+key+" " + checkType(typeof(value))+";";
            console.log(sql);
            con.query(sql, function (err, result) {
                if (err) throw err;
            });
            tableInfo.set("mySQL"+key,typeof(value));
        });
    }
    var map = new HashMap();
    for (var i in vals) {
        map.set(fields[i], vals[i]);
    }
    var qur1 = "";
    var qur2 = "";

    for (var i in fields) {
        var res= map.get(fields[i]);
        if (res.toString() == 'true') {
            res = 1;
        }
        else if (res.toString() == 'false') {
            res = 0;
        }
        qur1 = qur1 + "'" + res + "', ";
        qur2 = qur2 + "mySQL"+fields[i] + ", ";

    }

    vals = [];
    fields = [];
    var sql = "INSERT INTO accounts ("+ qur2.substring(0, qur2.length - 2) +") VALUES (" + qur1.substring(0, qur1.length - 2) + ")";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

}


function checkType (key) {
    var map = new HashMap();
    map.set("object", "VARCHAR(255)");
    map.set("string", "VARCHAR(255)");
    map.set("boolean", "Boolean");
    map.set("number", "INT");
    return map.get(key);
}
