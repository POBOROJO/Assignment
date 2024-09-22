"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import TaskForm from "@/app/pages/task-form";
import { RootState } from "@/app/store/store";
import { Task, updateTask, deleteTask } from "@/app/store/tasksSlice";

export default function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const { toast } = useToast();
  const [filter, setFilter] = useState({ status: "", priority: "" });
  const [sort, setSort] = useState<keyof Task>("dueDate");
  const [search, setSearch] = useState("");

  const handleEditTask = (updatedTask: Task) => {
    dispatch(updateTask(updatedTask));
    toast({
      title: "Task Updated",
      description: "Your task has been successfully updated.",
    });
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
    toast({
      title: "Task Deleted",
      description: "Your task has been successfully deleted.",
      variant: "destructive",
    });
  };

  const filteredAndSortedTasks = tasks
    .filter(
      (task) =>
        (filter.status ? task.status === filter.status : true) &&
        (filter.priority ? task.priority === filter.priority : true) &&
        (search
          ? task.title.toLowerCase().includes(search.toLowerCase())
          : true),
    )
    .sort((a, b) => {
      if (a[sort] < b[sort]) return -1;
      if (a[sort] > b[sort]) return 1;
      return 0;
    });

  const priorityColor = {
    Low: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800",
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <div className="mb-4 flex flex-wrap gap-4">
        <Select
          onValueChange={(value) =>
            setFilter((prev) => ({ ...prev, status: value }))
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">All Statuses</SelectItem>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) =>
            setFilter((prev) => ({ ...prev, priority: value }))
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">All Priorities</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setSort(value as keyof Task)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dueDate">Due Date</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Search tasks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-auto"
        />
      </div>
      <div className="space-y-4">
        {filteredAndSortedTasks.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <CardTitle className="text-lg">{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">{task.description}</p>
              <div className="flex justify-between items-center">
                <Badge>{task.status}</Badge>
                <Badge className={priorityColor[task.priority]}>
                  {task.priority}
                </Badge>
                <span className="text-sm text-gray-500">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
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
                    <TaskForm task={task} onSubmit={handleEditTask} />
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
