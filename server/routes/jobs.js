import express from "express";
import jobHelpers from "../helpers/jobs"
const router = express.Router();

router.get("/", jobHelpers.getJobs);
router.get("/:id", jobHelpers.getJobById);
router.post("/", jobHelpers.addJob);
router.put("/:id", jobHelpers.updateJob);
router.delete("/:id", jobHelpers.deleteJob);

export default router;