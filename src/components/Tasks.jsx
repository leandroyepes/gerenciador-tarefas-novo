import { useNavigate } from "react-router-dom";
import { ChevronRightIcon, Trash2 } from "lucide-react";

const Tasks = ({ tasks, onDeleteTaskClick, onTaskClick }) => {
  const navigate = useNavigate();

  const onDetailClick = (task) => {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    navigate(`/task?${query.toString()}`);
  };

  return (
    <div>
      <ul className="bg-slate-600 rounded-md p-6 space-y-4 shadow">
        {tasks.map((task) => (
          <li className="flex gap-2">
            <button
              className={`bg-slate-800 w-full flex items-center gap-2 text-white p-2 rounded-md ${
                task.isCompleted && "line-through"
              }`}
              onClick={() => onTaskClick(task.idTask)}
            >
              {task.title}
            </button>

            <button
              className="bg-slate-800 p-2 rounded-md text-white"
              onClick={() => onDetailClick(task)}
            >
              <ChevronRightIcon />
            </button>

            <button
              className="bg-slate-800 p-2 rounded-md text-white"
              onClick={() => {
                onDeleteTaskClick(task.idTask);
              }}
            >
              <Trash2 />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
