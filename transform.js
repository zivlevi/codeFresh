var fs = require('fs');
var col = [];
var types = [];
var vals = [];
var HashMap = require('hashmap');

exports.TempaddFields = function (res) {
    addFields(res);
}


var addFields = function (res) {
    for (var key in res){
        if (res[key] !== null && typeof res[key] === 'object' && Object.keys(res[key]).valueOf()[1]!='id'){
            addFields(res[key])
            }
        else {
         types.push(typeof res[key]);
         vals.push(res[key]);
         col.push("mySQL"+key);
        }
    }
}


exports.getTypes = function() {
    return types;

}

exports.setTypes = function(res) {
    types= res;

}

exports.setColums = function(res) {
    col= res;

}


exports.getColums = function() {
    return col;
}


exports.createFields = function () {
    var sql="";
    var col = this.getColums();
    for (var key in col){
        sql=sql+col[key]+", ";
    }
    return sql;
}

exports.createTypes = function () {
    var map = new HashMap();
    map.set("object", "VARCHAR(255)");
    map.set("string", "VARCHAR(255)");
    map.set("boolean", "Boolean");
    map.set("number", "INT");
    var sql="";
    var types = this.getTypes();
    for (var key in types){
        sql=sql+map.get(types[key])+", ";
    }
    return sql;
}

exports.createTable = function () {
    var map = new HashMap();
    map.set("object", "VARCHAR(255)");
    map.set("string", "VARCHAR(255)");
    map.set("boolean", "Boolean");
    map.set("number", "INT");
    var sql="";
    var types = this.getTypes();
    for (var key in types){
       sql=sql+col[key]+" "+map.get(types[key])+", ";
    }

    return sql;
}