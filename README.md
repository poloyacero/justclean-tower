INSTALL Redis in your machine for caching purposes

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
        "JWT_KEY": "",
        "REDIS_PORT": 6379
    }
}

Run migrations and seeders in sequelize
COMMAND: sequelize db:migrate
COMMAND: sequelize db:seed:all

list of users for authentication, decided not to opt on fetching from database because of time constraints
const User = [
    { id: 1, email: "emails@gmail.com", password: "opensesames"},
    { id: 2, email: "email@gmail.com", password: "opensesame"}
];


API routes
TOWERS:
POST    -   http://localhost:5000/api/v1/towers
GET     -   http://localhost:5000/api/v1/towers/1
PUT     -   http://localhost:5000/api/v1/towers/1
DELETE  -   http://localhost:5000/api/v1/towers/1
GET     -   http://localhost:5000/api/v1/towers?page=1&limit=3&show-with-offices=true
GET     -   http://localhost:5000/api/v1/towers/filter?location=Dubai&num_floors=&num_offices=&rating=&sort=location&order=ASC&page=1&limit=2&show-with-offices=true

OFFICES:
POST    -   http://localhost:5000/api/v1/towers/1/offices
GET     -   http://localhost:5000/api/v1/towers/1/offices
GET     -   http://localhost:5000/api/v1/towers/1/offices/3
PUT     -   http://localhost:5000/api/v1/towers/1/offices/1
DELETE  -   http://localhost:5000/api/v1/towers/1/offices/1

AUTH:
POST    -   http://localhost:5000/api/v1/auth/login

SEARCH:
GET     -   http://localhost:5000/api/v1/search?name=burj&location=jumeirah&num_floors=1&num_offices=1&rating=5


Run or start the server.js or entry file of the project
COMMAND: npm start

Run or start the client.js separately to check for the socket.io functionality of communicating from the server
COMMAND: nodemon client.js