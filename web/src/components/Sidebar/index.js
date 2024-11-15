import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

const Sidebar = () => {
  const location = useLocation();

  return (
    <sidebar className="col-2 h-100">
      <img src={logo} className="img-fluid px-3 py-4" alt="Logo" />
      <ul>
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            <span className="mdi mdi-calendar-check"></span>
            <span>Agendamentos</span>
          </Link>
        </li>
        <li>
          <Link
            to="/clientes"
            className={location.pathname === "/clientes" ? "active" : ""}
          >
            <span className="mdi mdi-account-multiple"></span>
            <span>Clientes</span>
          </Link>
        </li>
        <li>
          <Link
            to="/servicos"
            className={location.pathname === "/servicos" ? "active" : ""}
          >
            <span className="mdi mdi-auto-fix"></span>
            <span>Serviços</span>
          </Link>
        </li>
        <li>
          <Link
            to="/horarios-atendimento"
            className={
              location.pathname === "/horarios-atendimento" ? "active" : ""
            }
          >
            <span className="mdi mdi-clock-check-outline"></span>
            <span>Horários</span>
          </Link>
        </li>
      </ul>
    </sidebar>
  );
};

export default Sidebar;
