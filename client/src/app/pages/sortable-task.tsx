"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
import TaskForm from "./task-form";
import { Task } from "../types/task";
import { format } from "date-fns";

interface SortableTaskProps {
  id: string;
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  priorityColor: {
    [key: string]: string;
  };
}

export default function SortableTask({
  id,
  task,
  onEdit,
  onDelete,
  priorityColor,
}: SortableTaskProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-2 cursor-move"
    >
      <CardHeader>
        <CardTitle className="text-lg">{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
        <div className="flex justify-between items-center">
          <Badge className={priorityColor[task.priority]}>
            {task.priority}
          </Badge>
          <span className="text-sm text-gray-500">
            Due: {format(new Date(task.dueDate), "dd/MM/yyyy")}
          </span>
        </div>
        <div className="mt-4 space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
              </DialogHeader>
              <TaskForm task={task} onSubmit={onEdit} />
            </DialogContent>
          </Dialog>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
