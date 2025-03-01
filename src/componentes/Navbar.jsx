import { Link } from "react-router-dom";
import LogoRN from "../assets/Logotipo.png";
import "../App.css";

const Navbar = () => {
  return (
    <>
    <nav className="navbar-nobile">
        <div className="logo-nobile">
          <h1>
            <span>
              <img src={LogoRN} alt="Logo" width={70} height={70} />
            </span>
          </h1>
        </div>
        <button className="contact-button-nobile">
        <Link to="/contacto">Contacto</Link>
      </button>
    </nav>
    <nav className="navbar">
      <div className="logo">
        <h1>
          <span>
            <img src={LogoRN} alt="Logo" width={60} height={60} />
          </span>
        </h1>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Projetos</Link>
        </li>
        <li>
          <Link to="/work">Work</Link>
        </li>
        <li>
          <Link to="/contacto">Contacto</Link>
        </li>
      </ul>
      <button className="contact-button">
        <Link to="/contacto">Contacto</Link>
      </button>
    </nav>
    </>
  );
};

export default Navbar;
