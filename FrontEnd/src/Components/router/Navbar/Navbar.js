import { useState, useContext } from "react";
import { Link } from "react-router-dom"
// import {Link as scroll} from "react-scroll"
import logo from '../../../assets/logoLiceo.png';
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im"
import { User } from "./User";
import { Context } from "../../../Context/Context";
import "./Navbar.css";


const Navbar = () => {

  const [mobile, setMobile] = useState(false);
  const { user } = useContext(Context)
  return (
    <>
      <header className="header">
        <nav className="navbar">

          <img className="imgLogo" src={logo} alt='logodelliceo' />

          <ul className={mobile ? "navlinksmobile" : "navlinks"} onClick={() => setMobile(false)}>
            <Link to="/"><li className="active">Inicio</li></Link>
            <Link to="/about" ><li>Acerca de</li></Link>
            <Link to="/register" ><li>Crear Cuenta</li></Link>
            <Link to="/login" ><li>Inicio Sesión</li></Link>
            <Link to="/contact" ><li>Contacto</li></Link>
            {/** <Link to="/prematricula" ><li> <button className="botonNavbar" disabled={!user} >Prematrícula</button> </li></Link> */}
          </ul>
          <button className="mobilemenu" onClick={() => setMobile(!mobile)}>
            {mobile ? <ImCross /> : <FaBars />}
          </button>
          <div className="accountNav">
            <User />
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar