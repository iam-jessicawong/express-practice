import pool from "../db";

const getEmployees = (req, res) => {
  pool.query("SELECT * FROM employees",
  [],
  (error, result) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    };
    res.json(result.rows);
  });
};

const getEmployeeById = (req, res) => {
  const {id} = req.params;
  pool.query("SELECT * FROM employees WHERE employee_id = $1",
  [id],
  (error, result) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500)
    };
    if (result.rowCount < 1) return res.status(404).json("employee not found");
    res.json(result.rows);
  });
};

const addEmployee = (req, res) => {
  const {first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id} = req.body;

  if (!first_name || !first_name.trim() || !email || !email.trim()) {
    return res.status(400).json("First name, email is required");
  }
  
  pool.query("INSERT INTO employees(first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
  [first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id],
  (error, result) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    }
    
    res.status(201).json(result.rows[0]);
  });
}

const updateEmployee = (req, res) => {
  const {id} = req.params;
  const {first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id} = req.body;

   if (!first_name || !first_name.trim() || !email || !email.trim()) {
    return res.status(400).json("First name, email is required");
  }

  pool.query("UPDATE employees SET first_name=$2, last_name=$3, email=$4, phone_number=$5, hire_date=$6, salary=$7, commission_pct=$8, job_id=$9, manager_id=$10, department_id=$11 WHERE employee_id = $1 RETURNING *",
  [id, first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id],
  (error, result) => {
    if(error) {
      console.log(error);
      return res.sendStatus(500);
    }

    if(result.rowCount < 1) return res.status(404).json(`employee with id ${id} is not found`);

    res.send({
      message: `employee updated ${result.rowCount}`,
      data: result.rows[0]
    });
  });
}

const deleteEmployee = (req, res) => {
  const {id} = req.params;

  pool.query("DELETE FROM employees WHERE employee_id = $1",
  [id],
  (error, result) => {
    if(error) {
      console.log(error);
      return res.sendStatus(500);
    }

    if(result.rowCount < 1) return res.status(404).json(`employee with id ${id} is not found`);

    res.json(`deleted row: ${result.rowCount}`)
  })
}

export default {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee
}