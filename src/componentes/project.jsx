import React from "react";
import axiosInstance from "../assets/js/axiosInstance"; 
import "../App.css";
import Logo from "../assets/SVG.png";
import { Link } from "react-router-dom";

export default function App() {
  const [projects, setProjects] = React.useState(null); 

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get('/projects'); // Chamada GET com axiosInstance
        setProjects(response.data); // Armazenar os dados no estado
      } catch (error) {
        console.error("Erro ao carregar os projetos:", error.message); // Tratamento de erro
      }
    };

    fetchProjects(); 
  }, []); 

  if (!projects) return (
  <div>
    <div className="project-container">
      <div className="about">
          <div className="titile">
            <span>
              <img src={Logo} alt="" width={20} height={20} />
            </span>
            <h6>Projetos</h6>
          </div>
          <div className="paragraph">
            <p>
              <span>Soluções web eficientes e escaláveis</span>, focadas em usabilidade, desempenho e inovação, utilizando 
              <span> tecnologias modernas!</span>
            </p>
          </div>
        </div>
        <div className="paragraph">
          <p>A carregar projetos...</p>
        </div>
    </div>

  </div>); 

  return (
    <div className="project-container">
      <div className="about">
          <div className="titile">
            <span>
              <img src={Logo} alt="" width={20} height={20} />
            </span>
            <h6>Projetos</h6>
          </div>
          <div className="paragraph">
            <p>
              <span>Soluções web eficientes e escaláveis</span>, focadas em usabilidade, desempenho e inovação, utilizando 
              <span> tecnologias modernas!</span>
            </p>
          </div>
        </div>
      <ul className="project-list">
        {projects.map((project) => (        
          <li key={project.id} className="project-item">
            <div className="project-content">
              <h2 className="project-title">{project.title}</h2>
              <p className="project-description">
                {project.description}
              </p>
              <div className="project-footer">
                <p className="project-date">
                  Data: {new Date(project.createdAt).toLocaleDateString()}
                  
                </p>
                <Link to={`/projetos/${project.id}`} style={{ textDecoration: "none" }}>
                  <button className="project-button">Saiba mais...</button>
                </Link>
              </div>
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
