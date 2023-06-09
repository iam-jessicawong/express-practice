import express from "express";
import locationHelpers from "../helpers/locations"
const router = express.Router();

router.get("/", locationHelpers.getLocations);
router.get("/:id", locationHelpers.getLocationById);
router.post("/", locationHelpers.addLocation);
router.put("/:id", locationHelpers.updateLocation);
router.delete("/:id", locationHelpers.deleteLocation);

export default router;