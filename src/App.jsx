import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Work from "./pages/Work";
import Contacto from "./pages/Contacto";
import Main from "./pages/Main";
import ProjetoDetalhes from "./pages/ProjectsDetalhes"

function App() {
  return (
    <Router>
      <>
        {/* Navbar */}
      
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/work" element={<Work />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/projetos/:id" element={<ProjetoDetalhes />} /> {/* Rota com ID */}
        </Routes>
        
      </>
    </Router>
  );
}

export default App;
