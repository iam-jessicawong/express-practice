import pool from "../db";

const getLocations = (req, res) => {
  pool.query("SELECT * FROM locations",
  [],
  (error, result) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    };
    res.json(result.rows);
  });
};

const getLocationById = (req, res) => {
  const {id} = req.params;
  pool.query("SELECT * FROM locations WHERE location_id = $1",
  [id],
  (error, result) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500)
    };
    if (result.rowCount < 1) return res.status(404).json("Location not found");
    res.json(result.rows);
  });
};

const addLocation = (req, res) => {
  const {street_address, postal_code, city, state_province, country_id} = req.body;
  
  pool.query("INSERT INTO locations(street_address, postal_code, city, state_province, country_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
  [street_address, postal_code, city, state_province, country_id],
  (error, result) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    }
    
    res.status(201).json(result.rows[0]);
  });
}

const updateLocation = (req, res) => {
  const {id} = req.params;
  const {street_address, postal_code, city, state_province, country_id} = req.body;

  pool.query("UPDATE locations SET street_address=$2, postal_code=$3, city=$4, state_province=$5, country_id=$6 WHERE location_id = $1 RETURNING *",
  [id, street_address, postal_code, city, state_province, country_id],
  (error, result) => {
    if(error) {
      console.log(error);
      return res.sendStatus(500);
    }

    if(result.rowCount < 1) return res.status(404).json(`Location with id ${id} is not found`);

    res.send({
      message: `Location updated ${result.rowCount}`,
      data: result.rows[0]
    });
  });
}

const deleteLocation = (req, res) => {
  const {id} = req.params;

  pool.query("DELETE FROM locations WHERE location_id = $1",
  [id],
  (error, result) => {
    if(error) {
      console.log(error);
      return res.sendStatus(500);
    }

    if(result.rowCount < 1) return res.status(404).json(`Location with id ${id} is not found`);

    res.json(`deleted row: ${result.rowCount}`)
  })
}

export default {
  getLocations,
  getLocationById,
  addLocation,
  updateLocation,
  deleteLocation
}