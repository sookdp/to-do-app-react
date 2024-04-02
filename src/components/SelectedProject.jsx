import Tasks from "./Tasks";

export default function SelectedProject({
  project,
  onDelete,
  onAddTask,
  onDeleteTask,
  tasks,
  backgroundImage,
}) {
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
    backgroundImage: `url(${backgroundImage})`,
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
              onClick={onDelete}
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-200">{formattedDate}</p>
        <p className="text-stone-50 whitespace-pre-wrap">
          {project.description}
        </p>
      </header>
      <Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks} />
    </div>
  );
}
