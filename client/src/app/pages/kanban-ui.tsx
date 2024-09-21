"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragMoveEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TaskForm from "@/app/pages/task-form";
import { Task } from "@/app/types/task";
import { useToast } from "@/hooks/use-toast";
import SortableTask from "./sortable-task";
import { format } from "date-fns";

const initialTasks: Task[] = [
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
];

const columns: { [key: string]: Task["status"] } = {
  "To Do": "To Do",
  "In Progress": "In Progress",
  Completed: "Completed",
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id.toString()); // Convert to string
  };

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex(
          (task) => task.id === active.id.toString(),
        );
        const newIndex = tasks.findIndex(
          (task) => task.id === over.id.toString(),
        );

        const newTasks = arrayMove(tasks, oldIndex, newIndex);
        newTasks[oldIndex].status = over.data.current?.sortable
          .containerId as Task["status"];

        toast({
          title: "Task Moved",
          description: `Task moved to ${over.data.current?.sortable.containerId}`,
        });

        return newTasks;
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex(
          (task) => task.id === active.id.toString(),
        );
        const newIndex = tasks.findIndex(
          (task) => task.id === over.id.toString(),
        );

        const newTasks = arrayMove(tasks, oldIndex, newIndex);
        newTasks[oldIndex].status = over.data.current?.sortable
          .containerId as Task["status"];

        toast({
          title: "Task Moved",
          description: `Task moved to ${over.data.current?.sortable.containerId}`,
        });

        return newTasks;
      });
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleCreateTask = (newTask: Task) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...newTask, id: Date.now().toString() },
    ]);
    toast({
      title: "Task Created",
      description: "Your new task has been successfully created.",
    });
  };

  const handleEditTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
    toast({
      title: "Task Updated",
      description: "Your task has been successfully updated.",
    });
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    toast({
      title: "Task Deleted",
      description: "Your task has been successfully deleted.",
      variant: "destructive",
    });
  };

  const priorityColor = {
    Low: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800",
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
        <div className="mb-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create Task</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
              </DialogHeader>
              <TaskForm onSubmit={handleCreateTask} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(columns).map(([columnId, status]) => (
            <div key={columnId} className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">{status}</h2>
              <SortableContext
                items={tasks
                  .filter((task) => task.status === status)
                  .map((task) => task.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2 min-h-[200px]">
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task) => (
                      <SortableTask
                        key={task.id}
                        id={task.id}
                        task={task}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                        priorityColor={priorityColor}
                      />
                    ))}
                </div>
              </SortableContext>
            </div>
          ))}
        </div>
      </div>
      <DragOverlay>
        {activeId ? (
          <Card className="mb-2 cursor-move">
            <CardHeader>
              <CardTitle className="text-lg">
                {tasks.find((task) => task.id === activeId)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">
                {tasks.find((task) => task.id === activeId)?.description}
              </p>
              <div className="flex justify-between items-center">
                <Badge
                  className={
                    priorityColor[
                      tasks.find((task) => task.id === activeId)?.priority ||
                        "Medium"
                    ]
                  }
                >
                  {tasks.find((task) => task.id === activeId)?.priority}
                </Badge>
                <span className="text-sm text-gray-500">
                  Due:{" "}
                  {format(
                    new Date(
                      tasks.find((task) => task.id === activeId)?.dueDate || "",
                    ),
                    "dd/MM/yyyy",
                  )}
                </span>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
