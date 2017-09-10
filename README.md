# instructions:
download the project and unzip the account.zip and node_modules.zip


open terminal for mongodDB:

- enter the location of the directory.
- enter mongod - opens the server.
- cd (location of the directory)/node_modules/mongodb and enter mongo - opens the mongo shell.

open new terminal for mysql:

- PATH=$PATH:/usr/local/mysql/bin
- mysql -u root -p (or another user) and get into mySQL shell

open new terminal:
- cd (location of the directory) 
- mongoimport --db users --collection contacts --file accounts.json --batchSize 100
- node main.js
- enter your host, user, passowrd for connecting to mySQL server.


when the program finish you can use this commands to viewing the mySQL database
- use Accounts
- SELECT * FROM accounts






