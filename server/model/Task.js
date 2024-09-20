import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true, // trim whitespace from the beginning and end of the title
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true, // trim whitespace from the beginning and end of the description
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.ToDo,
    },
    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      default: TaskPriority.Low,
    },
    dueDate: {
      type: Date,
      required: true,
      // default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  { timestamps: true },
);

// here we are telling mongoose that we want to use the TaskSchema as the type for the Task model
const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;
