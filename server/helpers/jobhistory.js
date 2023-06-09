import pool from "../db";

const getJobHistory = (req, res) => {
  pool.query("SELECT * FROM job_history",
  [],
  (error, result) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    };
    res.json(result.rows);
  });
};

const getJobHistoryById = (req, res) => {
  const {id} = req.params;
  pool.query("SELECT * FROM job_history WHERE employee_id = $1",
  [id],
  (error, result) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500)
    };
    if (result.rowCount < 1) return res.status(404).json("Job history not found");
    res.json(result.rows);
  });
};

const addJobHistory = (req, res) => {
  const {employee_id, start_date, end_date, job_id, department_id} = req.body;

  if(!employee_id || !start_date || !start_date.trim()) {
    return res.status(400).json("You need to insert employee_id and start date");
  }
  
  pool.query("INSERT INTO job_history VALUES ($1, $2, $3, $4, $5) RETURNING *",
  [employee_id, start_date, end_date, job_id, department_id],
  (error, result) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    }
    
    res.status(201).json(result.rows[0]);
  });
}

const updateJobHistory = (req, res) => {
  const {employee_id, start_date} = req.params;
  const {end_date, job_id, department_id} = req.body;

  pool.query("UPDATE job_history SET end_date=$3, job_id=$4, department_id=$5 WHERE employee_id = $1 AND start_date = $2 RETURNING *",
  [employee_id, start_date, end_date, job_id, department_id],
  (error, result) => {
    if(error) {
      console.log(error);
      return res.sendStatus(500);
    }

    if(result.rowCount < 1) return res.status(404).json(`Job history with employee id ${employee_id} and start date ${start_date} is not found`);

    res.send({
      message: `Job history updated ${result.rowCount}`,
      data: result.rows[0]
    });
  });
}

const deleteJobHistory = (req, res) => {
  const {employee_id, start_date} = req.params;

  pool.query("DELETE FROM job_history WHERE employee_id = $1 AND start_date = $2",
  [employee_id, start_date],
  (error, result) => {
    if(error) {
      console.log(error);
      return res.sendStatus(500);
    }

    if(result.rowCount < 1) return res.status(404).json(`Job history with employee id ${employee_id} and start date ${start_date} is not found`);

    res.json(`deleted row: ${result.rowCount}`)
  })
}

export default {
  getJobHistory,
  getJobHistoryById,
  addJobHistory,
  updateJobHistory,
  deleteJobHistory
}