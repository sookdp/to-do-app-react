import ProjectsSideBar from "./components/ProjectsSideBar";
import NewProject from "./components/NewProject";
import Project from "./components/Project";
import NoProjectSelected from "./components/NoProjectSelected";
import {useState, useEffect} from "react";
import {storeData, getData} from "./components/Storage";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  useEffect(() => {
    const loadProjects = async () => {
      const storedProjects = await getData('projects');
      if (storedProjects !== null) {
        setProjectsState(prevState => ({...prevState, projects: JSON.parse(storedProjects)}));
      }
    };

    loadProjects();
  }, []);

  function handleUpdate(project) {
    // Save the new project into projects
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
      storeData('projects', JSON.stringify([...prevprojectsState.projects, newProject])); // stocker les projets mis à jour
      return {
        ...prevprojectsState,
        selectedProjectId: undefined,
        projects: [...prevprojectsState.projects, newProject],
      };
    });
  }

  function handleDeleteProject(projectId) {
    setProjectsState((prevprojectsState) => {
      const updatedProjects = prevprojectsState.projects.filter(
        (project) => project.id !== projectId,
      );
      storeData('projects', JSON.stringify(updatedProjects));
      return {
        ...prevprojectsState,
        selectedProjectId: undefined,
        projects: updatedProjects,
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId,
  );

/////////////////////////////
// Affichage de la page
/////////////////////////////

  let content = (
    <Project
      project={selectedProject}
      deleteProject={handleDeleteProject}
      update={handleUpdate}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected OnStartAddProject={handleStartAddProject}/>;
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
