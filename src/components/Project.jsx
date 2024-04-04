import {useState} from "react";
import Tasks from "./Tasks";
import History from "./History";

export default function Project({
                                  project,
                                  deleteProject,
                                  update,
                                }) {
  const [tasks, setTasks] = useState(project.tasks || []);
  const [accomplishTasks, setAccomplishTasks] = useState(project.accomplishTasks || []);

  function handleAddTask(text) {
    const taskId = Math.random();
    const newTask = {
      text: text,
      projectId: project.id,
      id: taskId,
    };
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);

    const updatedProject = {...project, tasks: updatedTasks};
    update(updatedProject);
  }

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
    update(project);
  };

  function moveUp(id) {
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1 || index === 0) return;

    const updatedTasks = [...tasks];
    const temp = updatedTasks[index];
    updatedTasks[index] = updatedTasks[index - 1];
    updatedTasks[index - 1] = temp;

    setTasks(updatedTasks);
    update(project);
  }

  function moveDown(id) {
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1 || index === tasks.length - 1) return;

    const updatedTasks = [...tasks];
    const temp = updatedTasks[index];
    updatedTasks[index] = updatedTasks[index + 1];
    updatedTasks[index + 1] = temp;

    setTasks(updatedTasks);
    update(project);
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
    backgroundImage: `url(${project.backgroundImage})`,
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
      <Tasks onAdd={handleAddTask} onDelete={handleDeleteTask} tasks={tasks} moveUp={moveUp} moveDown={moveDown}/>
      <History accomplishTasks={accomplishTasks} onRestore={handleRestoreTask}/>
    </div>
  );
}