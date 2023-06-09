import express from "express";
import departmentHelpers from "../helpers/departments"
const router = express.Router();

router.get("/", departmentHelpers.getDepartments);
router.get("/:id", departmentHelpers.getDepartmentById);
router.post("/", departmentHelpers.addDepartment);
router.put("/:id", departmentHelpers.updateDepartment);
router.delete("/:id", departmentHelpers.deleteDepartment);

export default router;