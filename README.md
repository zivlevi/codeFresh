# instructions:
download the project and unzip the account.zip and node_modules.zip

mongoDB:

 open terminal for mongod:
- cd (location of the directory).
- enter mongod - opens the server.
 open terminal for mongo:
- cd (location of the directory)/node_modules/mongodb. 
- enter mongo - opens the mongo shell.

mySQL:

- make sure that the mySQL database server is started and ready for client connection.
- open new terminal for mysql
- PATH=$PATH:/usr/local/mysql/bin
- mysql -u root -p (or another user) and get into mySQL shell

Running the program:

- open terminal 
- cd (location of the directory) 
- mongoimport --db Accounts --collection contacts --file accounts.json --batchSize 10000
- node main.js
- enter your host, user, passowrd for connecting to mySQL server.


when the program finish you can use this commands to viewing the mySQL database (in mySQL terminal from stage 2)
- use Accounts
- SELECT * FROM accounts
- to remove the mySQL database enter - DROP DATABASE Accounts;
- to remove the collection of mongoDB enter: use Accounts and then db.dropDatabase() (in mongo shell)

Testing:
I having a trouble to upload a folder to github, so the steps for running the test are:
- open terminal 
- cd (location of the directory) 
- mkdir test (from the directory location)
- drag the "test.js" file to the new test directory
- ./node_modules/mocha/bin/mocha

Thank you itai,

Ziv.






