import express from "express";
import countriesHelpers from "../helpers/countries"
const router = express.Router();

router.get("/", countriesHelpers.getCountries);
router.get("/:id", countriesHelpers.getCountryById);
router.post("/", countriesHelpers.addCountry);
router.put("/:id", countriesHelpers.updateCountry);
router.delete("/:id", countriesHelpers.deleteCountry);

export default router;