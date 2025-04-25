import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, Pencil, Save } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

const TaskPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [mainTitle, setMainTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setTitle(searchParams.get("title") || "");
    setMainTitle(searchParams.get("title") || "");
    setDescription(searchParams.get("description") || "");
  }, [location.search]);

  // Atualiza os parâmetros da URL
  const atualizarURL = () => {
    const query = new URLSearchParams();
    query.set("title", title);
    query.set("description", description);
    navigate(`${location.pathname}?${query.toString()}`);
  };

  const updateTasksLocalStorage = () => {
    let tasks = [];
    try {
      const raw = localStorage.getItem("tasks");
      tasks = raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Erro ao acessar ou parsear localStorage:", e);
      tasks = [];
    }

    if (isEditing) {
      if (title.trim() === "" || description.trim() === "") {
        return alert("Preencha um título e descrição para salvar");
      }
      const newTasks = tasks.map((task) => {
        if (task.title === mainTitle) {
          return {
            ...task,
            title,
            description,
          };
        }
        return task;
      });

      // Salva novamente no localStorage
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      atualizarURL();
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-slate-800 w-screen p-6">
      <div className="w-[500px] mx-auto space-y-4">
        <div className="flex justify-center relative mb-6">
          <button
            className="absolute left-0 top-0 bottom-0 text-slate-400"
            onClick={() => navigate("/")}
          >
            <ChevronLeftIcon />
          </button>
          <h1 className="text-white text-3xl text-center font-bold">
            Detalhes da Tarefa
          </h1>
          <button
            className="absolute right-0 top-0 bottom-0 text-slate-400"
            onClick={() => updateTasksLocalStorage()}
          >
            {isEditing ? <Save /> : <Pencil />}
          </button>
        </div>
        <div className="bg-slate-400 p-3 rounded-md flex flex-col gap-3">
          <input
            className={`text-2xl font-bold border-slate-300 outline-slate-400 px-2 py-2 rounded-md ${
              isEditing && "border"
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={!isEditing}
          />
          <TextareaAutosize
            className={`border-slate-300 outline-slate-400 px-2 py-2 rounded-md ${
              isEditing && "border"
            }`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};
export default TaskPage;
