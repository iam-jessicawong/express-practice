import express from "express";
import regionHelpers from "../helpers/regions"
const router = express.Router();

router.get("/", regionHelpers.getRegions);
router.get("/:id", regionHelpers.getRegionById);
router.post("/", regionHelpers.addRegion);
router.put("/:id", regionHelpers.updateRegion);
router.delete("/:id", regionHelpers.deleteRegion);

export default router;