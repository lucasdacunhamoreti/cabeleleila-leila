import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const location = useLocation();

  const isAdmin = user.cliente.role === "admin";
  const isCustomer = user.cliente.role === "customer";

  return (
    <sidebar className="col-2 h-100">
      <img src={logo} className="img-fluid px-3 py-4" alt="Logo" />
      <ul>
        {isAdmin && (
          <li>
            <Link
              to="/clientes"
              className={location.pathname === "/clientes" ? "active" : ""}
            >
              <span className="mdi mdi-account-multiple"></span>
              <span>Clientes</span>
            </Link>
          </li>
        )}

        {isAdmin && (
          <li>
            <Link
              to="/servicos"
              className={location.pathname === "/servicos" ? "active" : ""}
            >
              <span className="mdi mdi-auto-fix"></span>
              <span>Serviços</span>
            </Link>
          </li>
        )}

        <li>
          <Link
            to="/agendamentos"
            className={location.pathname === "/agendamentos" ? "active" : ""}
          >
            <span className="mdi mdi-clock-check-outline"></span>
            <span>Agendamentos</span>
          </Link>
        </li>
      </ul>
    </sidebar>
  );
};

export default Sidebar;
