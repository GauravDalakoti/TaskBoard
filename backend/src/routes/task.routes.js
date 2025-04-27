import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addNewTask, deleteTask, editTask, getAllTasks, getTaskById, updateTaskStatus } from "../controllers/Task.conroller.js";

const router = Router()

router.route("/add-new-task").post(verifyJWT, addNewTask)
router.route("/get-all-tasks").get(verifyJWT, getAllTasks)
router.route("/edit-task").post(verifyJWT, editTask)
router.route("/get-task-by-id").post(verifyJWT, getTaskById)
router.route("/delete-task").post(verifyJWT,deleteTask)
router.route("/update-task-status").post(verifyJWT, updateTaskStatus)

export default router