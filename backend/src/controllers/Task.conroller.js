import { Task } from "../models/Task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { nanoid } from "nanoid";

const addNewTask = asyncHandler(async (req, res) => {

    const { title, description, status, priority } = req.body

    if ([title, description, status, priority].some((field) => field === "")) {

        throw new ApiError(400, "All field must be required")
    }

    const id = nanoid(10)

    const createdTask = await Task.create({

        id,
        title,
        description,
        status,
        priority,
        userId: req.user?._id

    })

    if (!createdTask) {

        throw new ApiError(500, "Something went wrong while creating a task")
    }

    return res.status(200)
        .json(new ApiResponse(200, createdTask, "Task Created Successfully"))

})

const getAllTasks = asyncHandler(async (req, res) => {

    const allTasks = await Task.find({ userId: req.user?._id })

    if (!allTasks) {

        throw new ApiError(404, "user tasks not found")
    }

    return res.status(200)
        .json(new ApiResponse(200, allTasks, "User All Tasks Fetched Successfully"))

})

const updateTaskStatus = asyncHandler(async (req, res) => {

    const { id } = req.body

    if (!id) {

        throw new ApiError(400, "id is required")
    }

    await Task.findOneAndUpdate(

        { id: id },
        {
            status: "complete",
        },
        {
            new: true
        }
    )

    return res.status(200)
        .json(new ApiResponse(200, {}, "task status updated successfully"))

})

const editTask = asyncHandler(async (req, res) => {

    const { id, title, description, status, priority } = req.body

    if ([id, title, description, status, priority].some((field) => field === "")) {

        throw new ApiError(400, "All field must be required")
    }

    await Task.findOneAndUpdate(

        { id: id },
        {
            title,
            description,
            status,
            priority
        },
        {
            new: true
        }
    )

    return res.status(200)
        .json(new ApiResponse(200, {}, "task updated successfully"))
})

const getTaskById = asyncHandler(async (req, res) => {

    const { id } = req.body;

    if (!id) {

        throw new ApiError(400, "id is required")
    }

    const task = await Task.find({ id: id })

    return res.status(200)
        .json(new ApiResponse(200, task, "task fetched successfully"))
})

const deleteTask = asyncHandler(async (req, res) => {

    const { id } = req.body;

    if (!id) {

        throw new ApiError(400, "id is required")
    }

    await Task.deleteOne({ id: id });

    return res.status(200)
        .json(new ApiResponse(200, {}, "Task deleted Successfully"))

})

export { addNewTask, getAllTasks, updateTaskStatus, editTask, getTaskById, deleteTask }