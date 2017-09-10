/**
 * Created by zivlevi1 on 10.9.2017.
 */
const readline = require('readline');
const load = require('./load');
var host="";
var user="";
var pass="";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('enter mySQL host: \n',(function (answer) {
    host=answer;
    rl.question('enter mySQL user: \n',(function (answer) {
        user=answer;
        rl.question('enter mySQL password: \n',(function (answer) {
            pass=answer;
            rl.close();
            load.createConnection(host,user,pass);
        }));
    }));
}));