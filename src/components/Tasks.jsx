import { list } from "postcss";
import NewTask from "./NewTask";
import downArrow from "../assets/downArrow.png";
import upArrow from "../assets/upArrow.png";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function Tasks({ tasks, onAdd, onDelete, moveUp, moveDown}) {
    const [filteredTasks, setFilteredTasks] = useState(tasks);

    const handleSearch = (searchText) => {
        const filtered = tasks.filter(task =>
            task.text.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredTasks(filtered);
    };
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAdd={onAdd} />
        <SearchBar onSearch={handleSearch} />
        {filteredTasks.length === 0 && (
            <p className="text-stone-800 my-4">This task does not exist....</p>
        )}
      {tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any task
        </p>
      )}
      {tasks.length > 0 && (
          <ul className="p-4 mt-8 rounded-md bg-stone-100">
              {tasks.map((task) => (
                  <li key={task.id} className="flex items-center my-4">
                      <div className="flex items-center space-x-1">
                          <img src={upArrow} className="w-3 h-3 cursor-pointer mt-1" onClick={() => moveUp(task.id)}/>
                          <img src={downArrow} className="w-3 h-3 cursor-pointer mt-1 mr-1"
                               onClick={() => moveDown(task.id)}/>
                      </div>
                      <div className="flex items-center justify-between w-full ml-2">
                          <span>{task.text}</span>
                          <button
                              onClick={() => onDelete(task.id)}
                              className="text-stone-700 hover:text-red-500"
                          >
                              Clear
                          </button>
                      </div>


                  </li>
              ))}
          </ul>

      )}
    </section>
  );
}
