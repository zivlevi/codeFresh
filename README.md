# instructions:

open local host of mogodb
enter the location of the file.
mongod - to open the server
../node_modules/mongodb and enter mongo- to open the shell of mongo

open terminal for running mysql:
PATH=$PATH:/usr/local/mysql/bin
mysql -u root -p (enter password)

open new terminal enter in to the directory of the project and enter:
mongoimport --db users --collection contacts --file accounts.json --batchSize 100

and then enter:
node last.js

after that the program finish you can use this commands from viewing the mySQL data base
use <Accounts>
SELECT * FROM accounts






