import express from "express";
import countriesRouter from "./countries";

const router = express.Router();

router.use("/countries", countriesRouter);

export default router;
