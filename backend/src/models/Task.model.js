import mongoose, { Mongoose, Schema } from "mongoose";

const taskSchema = new Schema(
    {

        id: {

            type: String,
            required: true,
            unique: true
        },

        title: {

            type: String,
            required: true

        },

        description: {

            type: String,
            required: true
        },

        status: {

            type: String,
            required: true
        },

        priority: {

            type: String,
            required: true
        },

        userId: {

            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {

        timestamps: true
    }
)

export const Task = mongoose.model("Task", taskSchema)