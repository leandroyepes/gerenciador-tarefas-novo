import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks") || [])
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const onTaskClick = (idTask) => {
    const newTask = tasks.map((task) => {
      if (task.idTask === idTask) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTasks(newTask);
  };

  const onClickAdd = (title, description) => {
    const newTask = {
      idTask: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  };

  const onDeleteTaskClick = (taskId) => {
    const newTask = tasks.filter((task) => task.idTask !== taskId);
    setTasks(newTask);
  };

  return (
    <div className="bg-slate-800 w-screen flex justify-center p-6 flex-1">
      <div className="w-[500px] space-y-4">
        <h1 className="text-white text-3xl text-center font-bold">
          Gerenciado de Tarefas
        </h1>
        <AddTask onClickAdd={onClickAdd} />
        <Tasks
          tasks={tasks}
          onDeleteTaskClick={onDeleteTaskClick}
          onTaskClick={onTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
