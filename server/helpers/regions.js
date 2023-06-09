import pool from "../db";

const getRegions = (req, res) => {
  pool.query("SELECT * FROM Regions",
  [],
  (error, result) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    };
    res.json(result.rows);
  });
};

const getRegionById = (req, res) => {
  const {id} = req.params;
  pool.query("SELECT * FROM Regions WHERE region_id = $1",
  [id],
  (error, result) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500)
    };
    if (result.rowCount < 1) return res.status(404).json("Region not found");
    res.json(result.rows);
  });
};

const addRegion = (req, res) => {
  const {name} = req.body;
  
  pool.query("INSERT INTO Regions(region_name) VALUES ($1) RETURNING *",
  [name],
  (error, result) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    }
    
    res.status(201).json(result.rows[0]);
  });
}

const updateRegion = (req, res) => {
  const {id} = req.params;
  const {name} = req.body;

  pool.query("UPDATE Regions SET region_name = $2 WHERE region_id = $1 RETURNING *",
  [id, name],
  (error, result) => {
    if(error) {
      console.log(error);
      return res.sendStatus(500);
    }

    if(result.rowCount < 1) return res.status(404).json(`Region with id ${id} is not found`);

    res.send({
      message: `Region updated ${result.rowCount}`,
      data: result.rows[0]
    });
  });
}

const deleteRegion = (req, res) => {
  const {id} = req.params;

  pool.query("DELETE FROM Regions WHERE region_id = $1",
  [id],
  (error, result) => {
    if(error) {
      console.log(error);
      return res.sendStatus(500);
    }

    if(result.rowCount < 1) return res.status(404).json(`Region with id ${id} is not found`);

    res.json(`deleted row: ${result.rowCount}`)
  })
}

export default {
  getRegions,
  getRegionById,
  addRegion,
  updateRegion,
  deleteRegion
}