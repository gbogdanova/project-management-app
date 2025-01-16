import { useState } from 'react'

import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";
import SelectedProject from './components/SelectedProject';

function App() {
  const [projectState, setProjectState] = useState({
    selectedProject: undefined,
    projects: [],
  });

  function handleStartAddProject(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProject: null,
      }
    })
  }
  function handleCanselAddProject(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProject: undefined,
      }
    })
  }
  function handleSelectProject(id){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProject: id,
      }
    })
  }
  function handleAddProject(projectData){
    setProjectState(prevState => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      }
      return {
        ...prevState,
        selectedProject: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }
  const selectedProjectID = projectState.projects.find(project => project.id === projectState.selectedProject) 

  let content = <SelectedProject project={selectedProjectID}/>;

  if(projectState.selectedProject === null){
    content = <NewProject  onAdd={handleAddProject} onCancel={handleCanselAddProject}/>
  } else if (projectState.selectedProject === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar  
        onStartAddProject={handleStartAddProject} 
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProject}
      />
      {content}
    </main>
  );
}

export default App;
