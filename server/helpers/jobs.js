import pool from "../db";

const getJobs = (req, res) => {
  pool.query("SELECT * FROM Jobs",
  [],
  (error, result) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    };
    res.json(result.rows);
  });
};

const getJobById = (req, res) => {
  const {id} = req.params;

  pool.query("SELECT * FROM jobs WHERE job_id = $1",
  [id.toUpperCase()],
  (error, result) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500)
    };
    if (result.rowCount < 1) return res.status(404).json("Job not found");
    res.json(result.rows);
  });
};

const addJob = (req, res) => {
  const {job_id, job_title, min_salary, max_salary} = req.body;

  if(!job_id || !job_id.trim() || !job_title || !job_title.trim() || !min_salary || !max_salary) {
    return res.status(400).json("You need to insert job_id, job_title, max and min salary");
  }
  
  pool.query("INSERT INTO jobs VALUES ($1, $2, $3, $4) RETURNING *",
  [job_id, job_title, min_salary, max_salary],
  (error, result) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    }
    
    res.status(201).json(result.rows[0]);
  });
}

const updateJob = (req, res) => {
  const {id} = req.params;
  const {job_title, min_salary, max_salary} = req.body;

  pool.query("UPDATE Jobs SET job_title=$2, min_salary=$3, max_salary=$4 WHERE job_id = $1 RETURNING *",
  [id.toUpperCase(), job_title, min_salary, max_salary],
  (error, result) => {
    if(error) {
      console.log(error);
      return res.sendStatus(500);
    }

    if(result.rowCount < 1) return res.status(404).json(`Job with id ${id} is not found`);

    res.send({
      message: `Job updated ${result.rowCount}`,
      data: result.rows[0]
    });
  });
}

const deleteJob = (req, res) => {
  const {id} = req.params;

  pool.query("DELETE FROM Jobs WHERE Job_id = $1",
  [id.toUpperCase()],
  (error, result) => {
    if(error) {
      console.log(error);
      return res.sendStatus(500);
    }

    if(result.rowCount < 1) return res.status(404).json(`Job with id ${id} is not found`);

    res.json(`deleted row: ${result.rowCount}`)
  })
}

export default {
  getJobs,
  getJobById,
  addJob,
  updateJob,
  deleteJob
}