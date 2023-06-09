import express from "express";
import jobHistoryHelpers from "../helpers/jobhistory"
const router = express.Router();

router.get("/", jobHistoryHelpers.getJobHistory);
router.get("/:id", jobHistoryHelpers.getJobHistoryById);
router.post("/", jobHistoryHelpers.addJobHistory);
router.put("/:employee_id/:start_date", jobHistoryHelpers.updateJobHistory);
router.delete("/:employee_id/:start_date", jobHistoryHelpers.deleteJobHistory);

export default router;