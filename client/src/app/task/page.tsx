"use client";

import TaskList from "../pages/task-list";
import ProtectedRoute from "@/components/route/ProtectedRoute";

export default function TaskPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <TaskList />
      </div>
    </ProtectedRoute>
  );
}
