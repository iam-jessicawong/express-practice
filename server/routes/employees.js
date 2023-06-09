import express from "express";
import employeeHelpers from "../helpers/employees"
const router = express.Router();

router.get("/", employeeHelpers.getEmployees);
router.get("/:id", employeeHelpers.getEmployeeById);
router.post("/", employeeHelpers.addEmployee);
router.put("/:id", employeeHelpers.updateEmployee);
router.delete("/:id", employeeHelpers.deleteEmployee);

export default router;