import pool from "../db";

const getDepartments = (req, res) => {
  pool.query("SELECT * FROM departments",
  [],
  (error, result) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    };
    res.json(result.rows);
  });
};

const getDepartmentById = (req, res) => {
  const {id} = req.params;
  pool.query("SELECT * FROM Departments WHERE department_id = $1",
  [id],
  (error, result) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500)
    };
    if (result.rowCount < 1) return res.status(404).json("Department not found");
    res.json(result.rows);
  });
};

const addDepartment = (req, res) => {
  const {department_name, manager_id, location_id} = req.body;

  if(!department_name || !department_name.trim()) {
    return res.status(400).json("You need to insert department_name");
  }
  
  pool.query("INSERT INTO Departments(department_name, manager_id, location_id) VALUES ($1, $2, $3) RETURNING *",
  [department_name, manager_id, location_id],
  (error, result) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    }
    
    res.status(201).json(result.rows[0]);
  });
}

const updateDepartment = (req, res) => {
  const {id} = req.params;
  const {department_name, manager_id, location_id} = req.body;

  pool.query("UPDATE departments SET department_name=$2, manager_id=$3, location_id=$4 WHERE department_id = $1 RETURNING *",
  [id, department_name, manager_id, location_id],
  (error, result) => {
    if(error) {
      console.log(error);
      return res.sendStatus(500);
    }

    if(result.rowCount < 1) return res.status(404).json(`Department with id ${id} is not found`);

    res.send({
      message: `Department updated ${result.rowCount}`,
      data: result.rows[0]
    });
  });
}

const deleteDepartment = (req, res) => {
  const {id} = req.params;

  pool.query("DELETE FROM departments WHERE department_id = $1",
  [id],
  (error, result) => {
    if(error) {
      console.log(error);
      return res.sendStatus(500);
    }

    if(result.rowCount < 1) return res.status(404).json(`Department with id ${id} is not found`);

    res.json(`deleted row: ${result.rowCount}`)
  })
}

export default {
  getDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment
}