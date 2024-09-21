"use client";

import  TaskForm  from "../pages/task-form";
import { Task } from "../types/task";
export default function FormPage() {
  const handleSubmit = (task: Task) => {
    console.log(task);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
}
