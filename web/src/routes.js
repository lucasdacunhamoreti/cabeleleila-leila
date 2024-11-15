import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Agendamentos from "./pages/Agendamentos";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";
import Clientes from "./pages/Clientes";
import Servicos from "./pages/Servicos";
import Horarios from "./pages/Horarios";

const AppRoutes = () => {
  return (
    <>
      <Header />
      <div className="container-fluid h-100">
        <div className="row h-100">
          <Router>
            <Sidebar />

            <Routes>
              <Route path="/" exact Component={Agendamentos} />
              <Route path="/clientes" Component={Clientes} />
              <Route path="/servicos" Component={Servicos} />
              <Route path="/horarios" Component={Horarios} />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
};

export default AppRoutes;
