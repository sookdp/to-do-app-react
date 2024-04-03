import { list } from "postcss";
import NewTask from "./NewTask";
import downArrow from "../assets/downArrow.png"
import upArrow from "../assets/upArrow.png"

export default function Tasks({ tasks, onAdd, onDelete, moveUp, moveDown}) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAdd={onAdd} />
      {tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any task
        </p>
      )}
      {tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
            {tasks.map((task) => (
                <li key={task.id} className="flex justify-between my-4">
                    <div className="flex items-center space-x-2">
                        <img src={upArrow} className="w-6 h-6 cursor-pointer" onClick={() => moveUp(task.id)}/>
                        <img src={downArrow} className="w-6 h-6 cursor-pointer" onClick={() => moveDown(task.id)}/>
                    </div>
                    <span>{task.text}</span>
                  <button
                      onClick={() => onDelete(task.id)}
                      className="text-stone-700 hover:text-red-500"
                  >
                      Clear
                  </button>
              </li>
          ))}
        </ul>
      )}
    </section>
  );
}
