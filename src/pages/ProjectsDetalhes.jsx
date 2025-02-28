import React from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../assets/js/axiosInstance";
import Navbar from "../componentes/Navbar";

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = React.useState(null);
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axiosInstance.get(`/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error("Erro ao carregar o projeto:", error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/comments/${id}`);
        setComments(response.data);
      } catch (error) {
        console.error("Erro ao carregar os comentários:", error.message);
      }
    };

    fetchProject();
    fetchComments();
    
  }, [id]);

  if (!project) return <p>A carregar...</p>;
  console.log("Projeto:", project);
  console.log("Comentários:", comments);
  
  return (<>
     <Navbar />
        <div className="main-container">
            <div className="project-container-project-detalhes">
                {project && project.length > 0 ? (
                    <div className="project-card">
                    <img src={project[0].image} alt={project[0].title} className="project-image" />
                    <h2>{project[0].title}</h2>
                    <p><strong>Linguagens:</strong> {project[0].languages ? project[0].languages.join(", ") : "N/A"}</p>
                    <p>{project && project.length > 0 ? project[0].description : "Sem descrição disponível."}</p>

                    </div>
                ) : (
                    <p>A carregar projeto...</p>
                )}
            
                <div className="project-details">
                    <h3>Comentários</h3>
                    {comments.length > 0 ? (
                    <ul>
                        {comments.map(comment => (
                        <li key={comment.id}>
                            <div>
                                <p>{comment.userName}</p>
                                <p>{comment.createdAt}</p>
                            </div>
                            <div>
                            {comment.comment}

                            </div>
                            
                            
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <p>Sem comentários.</p>
                    )}
                </div>
            </div>
        </div>
    </>
  );
  
};

export default ProjectPage;
