// "use client";

// import TaskForm from "@/app/pages/task-form";
// import { Task } from "@/app/types/task";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/app/store/store";
// import { addTask } from "@/app/store/tasksSlice";
// import { useToast } from "@/hooks/use-toast";
// import ProtectedRoute from "@/components/route/ProtectedRoute";

// export default function FormPage() {
//   const dispatch = useDispatch<AppDispatch>();
//   const { toast } = useToast();

//   const handleSubmit = async (task: Omit<Task, "id">) => {
//     try {
//       await dispatch(addTask(task)).unwrap();
//       toast({
//         title: "Task Created",
//         description: "Your new task has been successfully created.",
//       });
//     } catch (error) {
//       console.error("Failed to create task:", error);
//       toast({
//         title: "Error",
//         description: "Failed to create task. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <ProtectedRoute>
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <TaskForm onSubmit={handleSubmit} />
//       </div>
//     </ProtectedRoute>
//   );
// }

"use client";

import TaskForm from "@/app/pages/task-form";
import { Task } from "@/app/types/task";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { addTask } from "@/app/store/tasksSlice";
import { useToast } from "@/hooks/use-toast";

export default function FormPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();

  const handleSubmit = async (task: Omit<Task, "id">) => {
    try {
      await dispatch(addTask(task)).unwrap();
      toast({
        title: "Task Created",
        description: "Your new task has been successfully created.",
      });
    } catch (error) {
      console.error("Failed to create task:", error);
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
}
