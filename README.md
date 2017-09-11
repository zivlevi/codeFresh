# instructions:
download the project and unzip the account.zip and node_modules.zip


open terminal for mongodDB:

- cd (location of the directory).
- enter mongod - opens the server.
- cd (location of the directory)/node_modules/mongodb and enter mongo - opens the mongo shell.

open new terminal for mysql:

- PATH=$PATH:/usr/local/mysql/bin
- mysql -u root -p (or another user) and get into mySQL shell

open new terminal:
- cd (location of the directory) 
- mongoimport --db Accounts --collection contacts --file accounts.json --batchSize 10000
- node main.js
- enter your host, user, passowrd for connecting to mySQL server.


when the program finish you can use this commands to viewing the mySQL database
- use Accounts
- SELECT * FROM accounts

Testing:
I having a trouble to upload a folder to github, so the steps for running the test are:
- mkdir test (from the directory location)
- drag the "test.js" file to the new test directory
- ./node_modules/mocha/bin/mocha


Thank you itai,

Ziv.






