import ProjectsSideBar from "./components/ProjectsSideBar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProject: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevprojectsState) => {
      return {
        ...prevprojectsState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevprojectsState) => {
      return {
        ...prevprojectsState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevprojectsState) => {
      return {
        ...prevprojectsState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevprojectsState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevprojectsState,
        selectedProjectId: undefined,
        projects: [...prevprojectsState.projects, newProject],
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevprojectsState) => {
      return {
        ...prevprojectsState,
        selectedProjectId: undefined,
        projects: prevprojectsState.projects.filter(
          (project) => project.id !== prevprojectsState.selectedProjectId,
        ),
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId,
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
      backgroundImage={selectedProject ? selectedProject.backgroundImage : null}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} backgroundImage={selectedProject ? selectedProject.backgroundImage : null} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected OnStartAddProject={handleStartAddProject} />;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSideBar
        OnStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
