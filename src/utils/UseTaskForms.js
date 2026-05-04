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
      setTask(selectedTask.Task);
      setDate(selectedTask.Date);
      setCategory(selectedTask.Category);
      setPriority(selectedTask.Priority || "Média");
      setDone(selectedTask.Done);
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