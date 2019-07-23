# Technical Assessment

NodeJS API for technical assessment.

## Getting Started

These instructions will install and launch a local instance of the NodeJS server on http://localhost. The port is 8080 by default, but can be changed in ./config/default.

### Prerequisites

This project is tested on NodeJS version 10.0.0. Install the required packages for this project by running:

```
npm install
```

### Configurations

Configuration files are found under ./config. Environment dependent configuration files are named after their environment(e.g. `test.js` for `NODE_ENV=test`). Default configuration parameters loaded regardless of environment is stored in `default.js`

#### Default Configurations

| Parameter Name | Description                                              |
|----------------|----------------------------------------------------------|
| init_db        | Whether or not to populate database with predefined data |
| server_port    | Port of the server                                       |


#### Database Configurations

Database configurations are stored in `test.js` and `dev.js`, for configuring different databases for different environments.

| Parameter Name | Description                                   |
|----------------|-----------------------------------------------|
| db_host        | Host address of the database (e.g. localhost) |
| db_port        | Port of the database                          |
| db_name        | Name of the database to connect to            |
| db_user        | Username for logging into the database        |
| db_pw          | Password for logging into the database        |

### Launching the server

The server can be launched by running:

```
npm start
```

If the `init_db` parameter in `default.js` is `true`, then the database will be wiped and pre-populated with the following values:

#### Student table

| email                 |
|-----------------------|
| teacherjoe@gmail.com  |
| teacherken@gmail.com  |
| teacherlana@gmail.com |
| teachertom@gmail.com  |

#### Student table

| email                  | suspend |
|------------------------|---------|
| studentagnes@gmail.com |       0 |
| studentbob@gmail.com   |       0 |
| studenthon@gmail.com   |       0 | 
| studentjon@gmail.com   |       0 |
| studentkelly@gmail.com |       0 |
| studentmark@gmail.com  |       0 |
| studentmary@gmail.com  |       0 |
| studentsally@gmail.com |       0 |

#### TeacherStudent table
| TeacherEmail          | StudentEmail           | 
|-----------------------|------------------------|
| teacherjoe@gmail.com  | studentjon@gmail.com   | 
| teacherjoe@gmail.com  | studentkelly@gmail.com |
| teacherjoe@gmail.com  | studentmark@gmail.com  |
| teacherken@gmail.com  | studentagnes@gmail.com |
| teacherlana@gmail.com | studenthon@gmail.com   | 
| teacherlana@gmail.com | studentkelly@gmail.com |
| teacherlana@gmail.com | studentmary@gmail.com  |
| teacherlana@gmail.com | studentsally@gmail.com |



## Testing

This project uses the [Mocha](https://mochajs.org/) testing framework and [Chai Assertion Library](https://www.chaijs.com/) for testing.

Test cases are executed with the command
```
npm run test
```

Test cases can be found under ./test. Additional test cases can be added under the folder if desired.
