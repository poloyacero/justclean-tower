create a config json file with the following environment variables and add the necessary values
as for this task, file is nodemon.json as this works with nodemon package.

{
    "env" : {
        "HOST": "http://localhost:",
        "PORT": 5000,
        "DB_MYSQL_HOST": "localhost",
        "DB_MYSQL_DIALECT": "mariadb",
        "DB_MYSQL_PORT": "",
        "DB_MYSQL_USERNAME": "",
        "DB_MYSQL_PASSWORD": "",
        "DB_MYSQL_NAME": "",
        "JWT_KEY": ""
    }
}

Run or start the server.js or entry file of the project
COMMAND: npm start

Run or start the client.js separately to check for the socket.io functionality of communicating from the server
COMMAND: nodemon client.js