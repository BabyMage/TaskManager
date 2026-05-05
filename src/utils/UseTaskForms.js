import { useState, useEffect } from "react";

export function useTaskForm(selectedTask) {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedTask) {
      setTask(selectedTask.task);
      setDate(selectedTask.date);
      setCategory(selectedTask.category);
      setPriority(selectedTask.priority || "Média");
      setDone(selectedTask.done);
    }
  }, [selectedTask]);

  function resetForm() {
    setTask("");
    setDate("");
    setCategory("");
    setPriority("");
    setDone(false);
  }

  return {
    task, setTask,
    date, setDate,
    category, setCategory,
    priority, setPriority,
    done, setDone,
    error, setError,
    resetForm
  };
}