import express from "express";
import regionRouter from "./regions";
import countriesRouter from "./countries";
import locationsRouter from "./locations";
import departmentsRouter from "./departments";
import jobsRouter from "./jobs";
import employeesRouter from "./employees";
import jobHistoryRouter from "./jobhistory";

const router = express.Router();

router.use("/regions", regionRouter);
router.use("/countries", countriesRouter);
router.use("/locations", locationsRouter);
router.use("/departments", departmentsRouter);
router.use("/jobs", jobsRouter);
router.use("/employees", employeesRouter);
router.use("/job-history", jobHistoryRouter);

export default router;
