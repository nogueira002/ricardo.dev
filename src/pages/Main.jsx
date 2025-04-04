import "../App.css";
import Logo from "../assets/SVG.png";
import Navbar from "../componentes/Navbar";
import Project from "../componentes/project"; 

const Main = () => {
    return <>
    {/* Navbar */}
    <Navbar />
    {/* main-content 1 */}
    <div className="main-content">
      <div className="introduction">
        <h1>Ricardo Nogueira</h1>
        <p>Bem-vindo ao meu web-site! </p>
      </div>
      <div className="input-contact">
        <form action="">
          <input type="email" placeholder="name@gmail.com" required />
          <button>Contact-me</button>
        </form>
      </div>
      <div className="about">
        <div className="titile">
          <span>
            <img src={Logo} alt="" width={15} height={15} />
          </span>
          <h6>Introduction</h6>
        </div>
        <div className="paragraph">
          <p>
            <span>Olá, sou o Ricardo Nogueira,</span> sou um desenvolvedor
            Front-End júnior apaixonado por tecnologia. Meu objetivo é criar
            produtos de qualidade que impactem positivamente a vida das
            pessoas.
            <span> Bem-vindo ao meu website! </span>
          </p>
        </div>
      </div>
    </div>
    <Project />
  </>;
};
  
  export default Main;