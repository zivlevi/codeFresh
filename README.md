# instructions:
download the project and unzip the account.zip and node_modules.zip


open local host of mogodb:

- enter the location of the file.
- mongod - to open the server
- (location of the directory)/node_modules/mongodb and enter mongo- to open the shell of mongo

open terminal for running mysql:

-PATH=$PATH:/usr/local/mysql/bin
-mysql -u root -p (or another user) and get into mySQL shell

open new terminal enter the directory of the project and enter:

mongoimport --db users --collection contacts --file accounts.json --batchSize 100

and then enter:
node main.js
enter your host , user , passowrd for connecting to the mySQL server.


after that the program finish you can use this commands from viewing the mySQL data base
use <Accounts>
SELECT * FROM accounts






