import pool from "../db";

const getCountries = (req, res) => {
  pool.query("SELECT * FROM countries",
  [],
  (error, result) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    };
    res.json(result.rows);
  });
};

const getCountryById = (req, res) => {
  const {id} = req.params;
  pool.query("SELECT * FROM countries WHERE country_id = $1",
  [id],
  (error, result) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500)
    };
    if (result.rowCount < 1) return res.status(404).json("country not found");
    res.json(result.rows);
  });
};

const addCountry = (req, res) => {
  const {id, name, region_id} = req.body;

  if (!id.trim() || !name.trim() || !region_id) {
    return res.status(400).json("You need to insert id, name, and region id")
  }

  pool.query("INSERT INTO countries VALUES ($1, $2, $3) RETURNING *",
  [id, name, region_id],
  (error, result) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    }

    res.status(201).json(result.rows[0]);
  });
}

const updateCountry = (req, res) => {
  const {id} = req.params;
  const {name} = req.body;

  if(!name || !name.trim()) {
    return res.status(400).json("You need to insert name");
  }

  pool.query("UPDATE countries SET country_name = $2 WHERE country_id = $1 RETURNING *",
  [id, name],
  (error, result) => {
    if(error) {
      console.log(error);
      return res.sendStatus(500);
    }

    if(result.rowCount < 1) return res.status(404).json(`country with id ${id} is not found`);

    res.send({
      message: `country updated ${result.rowCount}`,
      data: result.rows[0]
    });
  });
}

const deleteCountry = (req, res) => {
  const {id} = req.params;

  pool.query("DELETE FROM countries WHERE country_id = $1",
  [id],
  (error, result) => {
    if(error) {
      console.log(error);
      return res.sendStatus(500);
    }

    if(result.rowCount < 1) return res.status(404).json(`country with id ${id} is not found`);

    res.json(`deleted row: ${result.rowCount}`)
  })
}

export default {
  getCountries,
  getCountryById,
  addCountry,
  updateCountry,
  deleteCountry
}