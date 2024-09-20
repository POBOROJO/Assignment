import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controller/taskController.js";
import isAuthenticated from "../middleware/auth.js";

const router = express.Router();

router.post("/create", isAuthenticated, createTask);
router.get("/get", isAuthenticated, getTasks);
router.put("/update/:id", isAuthenticated, updateTask);
router.delete("/delete/:id", isAuthenticated, deleteTask);

export default router;
