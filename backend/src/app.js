import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.routes.js"
import taskRoutes from "./routes/task.routes.js"

const app = express();

app.use(cors({ credentials: true, methods: ["POST", "GET", "PATCH", "DELETE"], origin: process.env.CORS_ORIGIN }))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))

app.use(cookieParser())

// user routes
app.use("/api/v1/users", userRoutes)

// task routes 
app.use("/api/v1/tasks", taskRoutes)

export { app }