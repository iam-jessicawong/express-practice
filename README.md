## HR SIMPLE REST API
This is a rest api for hr database for express and postgresql learning practice.

## Endpoints

### Regions

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/regions`       | Get all regions         |
| GET    | `/regions/:id`   | Get specific region     |
| POST   | `/regions/`      | Create new region       |
| PUT    | `/regions/:id`   | Update specific region  |
| DELETE | `/regions/:id`   | Delete specific region  |

### Countries

| Method | Endpoint           | Description               |
| ------ | -------------------| --------------------------|
| GET    | `/countries/`      | Get all countries         |
| GET    | `/countries/:id`   | Get specific country      |
| POST   | `/countries/`      | Create new countries      |
| PUT    | `/countries/:id`   | Update specific countries |
| DELETE | `/countries/:id`   | Delete specific countries |

### Locations

| Method | Endpoint             | Description               |
| ------ | ---------------------| --------------------------|
| GET    | `/locations/`        | Get all locations         |
| GET    | `/locations/:id`     | Get specific locations    |
| POST   | `/locations/`        | Create new location       |
| PUT    | `/locations/:id`     | Update specific locations |
| DELETE | `/locations/:id`     | Delete specific locations |

### Departments

| Method | Endpoint             | Description                |
| ------ | ---------------------| ---------------------------|
| GET    | `/departments/`      | Get all departments        |
| GET    | `/departments/:id`   | Get specific department    |
| POST   | `/departments/`      | Create new department      |
| PUT    | `/departments/:id`   | Update specific department |
| DELETE | `/departments/:id`   | Delete specific department |

### Jobs

| Method | Endpoint             | Description                |
| ------ | ---------------------| ---------------------------|
| GET    | `/jobs/`             | Get all jobs               |
| GET    | `/jobs/:id`          | Get specific job           |
| POST   | `/jobs/`             | Create new job             |
| PUT    | `/jobs/:id`          | Update specific job        |
| DELETE | `/jobs/:id`          | Delete specific job        |

### Employees

| Method | Endpoint             | Description              |
| ------ | ---------------------| -------------------------|
| GET    | `/employees/`        | Get all employees        |
| GET    | `/employees/:id`     | Get specific employee    |
| POST   | `/employees/`        | Create new employee      |
| PUT    | `/employees/:id`     | Update specific employee |
| DELETE | `/employees/:id`     | Delete specific employee |

### Job-History

| Method | Endpoint                                 | Description                 |
| ------ | -----------------------------------------| ----------------------------|
| GET    | `/job-history/`                          | Get all job history         |
| GET    | `/job-history/:id`                       | Get specific job history    |
| POST   | `/job-history/`                          | Create new job history      |
| PUT    | `/job-history/:employee_id/:start_date`  | Update specific job history |
| DELETE | `/job-history/:employee_id/:start_date`  | Delete specific job history |

## Package or Library Used

- Express
- dotenv for environment variables
- pg for postgresql database connection
- nodemon


## How to Run

1. Clone this repository
2. Install all dependencies on package.json
3. Set up your port on env file
4. Run this project with `yarn start` or `npm start`
