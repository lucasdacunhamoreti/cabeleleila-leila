import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Agendamentos from "./pages/Agendamentos";
import Clientes from "./pages/Clientes";
import Servicos from "./pages/Servicos";
import Login from "./pages/Login";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./styles.css";

const Layout = ({ children }) => {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Header />}
      <div className="container-fluid h-100">
        <div className="row h-100">
          {!isLoginPage && <Sidebar />}
          <main className="col">{children}</main>
        </div>
      </div>
    </>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/clientes" Component={Clientes} />
          <Route path="/servicos" Component={Servicos} />
          <Route path="/login" Component={Login} />
          <Route path="/agendamentos" Component={Agendamentos} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
