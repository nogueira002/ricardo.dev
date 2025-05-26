import React from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../assets/js/axiosInstance";
import Navbar from "../componentes/Navbar";

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = React.useState(null);
  const [comments, setComments] = React.useState([]);
  const [showCommentForm, setShowCommentForm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    userName: "",
    comment: ""
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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

  // Função para lidar com mudanças nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Função para submeter o comentário
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    // Validações básicas
    if (!formData.userName.trim() || !formData.comment.trim()) {
      alert("Por favor, preenche todos os campos!");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post("/comments", {
        userName: formData.userName.trim(),
        comment: formData.comment.trim(),
        projectId: id
      });

      // Adicionar o novo comentário à lista
      setComments(prev => [...prev, response.data.comentario]);
      
      // Limpar o formulário
      setFormData({ userName: "", comment: "" });
      setShowCommentForm(false);
      
      alert("Comentário adicionado com sucesso!");
      
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
      alert("Erro ao adicionar comentário. Tenta novamente!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para cancelar a adição de comentário
  const handleCancelComment = () => {
    setFormData({ userName: "", comment: "" });
    setShowCommentForm(false);
  };

  if (!project) return <p className="loading">A carregar...</p>;

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="project-container-project-detalhes">
          {project && project.length > 0 ? (
            <div className="project-card">
              {project[0].image ? (
                <img
                  src={project[0].image}
                  alt={project[0].title}
                  className="project-image"
                />
              ) : (
                <div className="no-image">Sem imagem disponível</div>
              )}

              <div className="project-content">
                <h2>{project[0].title}</h2>
                <p>{project[0].description || "Sem descrição disponível."}</p>
                <hr />
                <p>
                  <strong>Linguagens:</strong>{" "}
                  {project[0].languages
                    ? project[0].languages.join(", ")
                    : "N/A"}
                </p>
              </div>
            </div>
          ) : (
            <p className="loading">A carregar projeto...</p>
          )}

          <div className="project-details">
            <h3>Comentários ({comments.length})</h3>
            
            {/* Lista de comentários existentes */}
            {comments.length > 0 ? (
              <ul className="comments-list">
                {comments.map((comment) => (
                  <li key={comment.id} className="comment-item">
                    <div className="comment-header">
                      <p className="comment-author">{comment.userName}</p>
                      <p className="comment-date">
                        {new Date(comment.createdAt).toLocaleDateString('pt-PT')}
                      </p>
                    </div>
                    <div className="comment-content">{comment.comment}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Ainda não há comentários. Sê o primeiro a comentar!</p>
            )}

            {/* Botão para adicionar comentário */}
            {!showCommentForm ? (
              <ul className="adiconarComentario">
                <li>
                  <div 
                    onClick={() => setShowCommentForm(true)}
                    style={{ cursor: 'pointer' }}
                  >
                    <p>Adicionar Comentário</p>
                    <p>+</p>
                  </div>
                </li>
              </ul>
            ) : (
              /* Formulário para adicionar comentário */
              <div className="comment-form">
                <h4>Adicionar Comentário</h4>
                <form onSubmit={handleSubmitComment}>
                  <div className="input-contact">
                    <label htmlFor="userName">Nome:</label>
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      value={formData.userName}
                      onChange={handleInputChange}
                      placeholder="O teu nome..."
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="comment">Comentário:</label>
                    <textarea
                      id="comment"
                      name="comment"
                      value={formData.comment}
                      onChange={handleInputChange}
                      placeholder="Escreve o teu comentário..."
                      rows="4"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  
                  <div className="form-buttons">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="btn-submit"
                    >
                      {isSubmitting ? "A enviar..." : "Enviar Comentário"}
                    </button>
                    <button 
                      type="button" 
                      onClick={handleCancelComment}
                      disabled={isSubmitting}
                      className="btn-cancel"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectPage;