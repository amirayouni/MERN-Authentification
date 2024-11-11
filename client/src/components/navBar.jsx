import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import "../style/navBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <nav className="navbar">
      <img src={logo} alt="hoobank" className="navbar-logo" />
      <div className="navbar-title">USER DATA</div>
      <FontAwesomeIcon
        icon={faSignOutAlt}
        className="logout-icon"
        onClick={handleLogout}
      />
    </nav>
  );
};

export default Navbar;
