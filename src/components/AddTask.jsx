import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const AddTask = ({ onClickAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="bg-slate-600 rounded-md p-6 space-y-4 shadow flex flex-col">
      <input
        type="text"
        placeholder="Digite o título da tarefa"
        className="border border-slate-300 outline-slate-400 px-2 py-2 rounded-md"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      ></input>
      <TextareaAutosize
        type="text"
        placeholder="Digite o título da tarefa"
        className="border border-slate-300 outline-slate-400 px-2 py-2 rounded-md"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button
        className="bg-slate-800 rounded-md text-white p-2"
        onClick={() => {
          if (!title.trim() || !description.trim()) {
            return alert("Digite um título e descrição");
          }
          onClickAdd(title, description);
          setTitle("");
          setDescription("");
        }}
      >
        Adicionar
      </button>
    </div>
  );
};

export default AddTask;
