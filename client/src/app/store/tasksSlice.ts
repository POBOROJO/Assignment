import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [
    {
      id: "1",
      title: "Complete project",
      description: "Finish the main features",
      status: "In Progress",
      priority: "High",
      dueDate: "2023-12-31",
    },
    {
      id: "2",
      title: "Write documentation",
      description: "Document the API",
      status: "To Do",
      priority: "Medium",
      dueDate: "2024-01-15",
    },
    {
      id: "3",
      title: "Test application",
      description: "Run all test suites",
      status: "Completed",
      priority: "Low",
      dueDate: "2023-12-20",
    },
  ],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id,
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    moveTask: (
      state,
      action: PayloadAction<{ taskId: string; newStatus: Task["status"] }>,
    ) => {
      const task = state.tasks.find(
        (task) => task.id === action.payload.taskId,
      );
      if (task) {
        task.status = action.payload.newStatus;
      }
    },
  },
});

export const { addTask, updateTask, deleteTask, moveTask } = tasksSlice.actions;

export default tasksSlice.reducer;
