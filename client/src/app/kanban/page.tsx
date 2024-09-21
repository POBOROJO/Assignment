"use client";

import KanbanBoard from "../pages/kanban-ui";
import ProtectedRoute from "@/components/route/ProtectedRoute";
export default function KanbanPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <KanbanBoard />
      </div>
    </ProtectedRoute>
  );
}
