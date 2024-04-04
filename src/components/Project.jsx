import {useState} from "react";
import Tasks from "./Tasks";
import History from "./History";
import {storeData} from "./Storage";

export default function Project({
                                  project,
                                  deleteProject,
                                  update,
                                }) {
  const [tasks, setTasks] = useState(project.tasks || []);
  const [accomplishTasks, setAccomplishTasks] = useState(project.accomplishTasks || []);
  const [background, setBackground] = useState(project.background || null);

  const handleAddTask = (text) => {
    const taskId = Math.random();
    const newTask = {
      text: text,
      projectId: project.id,
      id: taskId,
    };
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    update();
  };

  function handleRestoreTask(id) {
    setProjectsState((prevState) => {
      const taskToRestore = prevState.accomplishTasks.find((task) => task.id === id);
      if (!taskToRestore) {
        return prevState;
      }

      return {
        ...prevState,
        tasks: [...prevState.tasks, taskToRestore],
        accomplishTasks: prevState.accomplishTasks.filter((task) => task.id !== id),
      };
    });
  }

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    update();
  };

  function moveUp(id) {
    const index = projectsState.tasks.findIndex(task => task.id === id);
    if (index === -1 || index === 0) return;

    const updatedTasks = [...projectsState.tasks];
    const temp = updatedTasks[index];
    updatedTasks[index] = updatedTasks[index - 1];
    updatedTasks[index - 1] = temp;

    storeData('tasks', JSON.stringify(updatedTasks)); // Mettre à jour le localStorage

    setProjectsState(prevState => ({ ...prevState, tasks: updatedTasks }));
  }

  function moveDown(id) {
    const index = projectsState.tasks.findIndex(task => task.id === id);
    if (index === -1 || index === projectsState.tasks.length - 1) return;

    const updatedTasks = [...projectsState.tasks];
    const temp = updatedTasks[index];
    updatedTasks[index] = updatedTasks[index + 1];
    updatedTasks[index + 1] = temp;

    storeData('tasks', JSON.stringify(updatedTasks)); // Mettre à jour le localStorage

    setProjectsState(prevState => ({ ...prevState, tasks: updatedTasks }));
  }

  const formattedDate = new Date(project.dueDate).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const headerStyle = {
    position: 'relative',
    color: '#FFF',
    padding: '1rem',
  };

  const imageOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    filter: 'brightness(50%)',
    zIndex: -1,
    backgroundColor: '#1c1917',
  };

  return (
    <div className="w-[35rem] mt-1">
      <header className="pb-4 mb-4 border-b-2 border-stone-300 overflow-hidden shadow-lg" style={headerStyle}>
        <div style={imageOverlayStyle}/>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-50 mb-2">
            {project.title}
          </h1>
          <button
            className="text-stone-200 hover:text-stone-50"
            onClick={() => deleteProject(project.id)}
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-200">{formattedDate}</p>
        <p className="text-stone-50 whitespace-pre-wrap">
          {project.description}
        </p>
      </header>
      <Tasks onAdd={handleAddTask} onDelete={handleDeleteTask} tasks={tasks}/>
      <History accomplishTasks={accomplishTasks} onRestore={handleRestoreTask}/>
    </div>
  );
}