import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Agendamentos from "./pages/Agendamentos";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";
import Clientes from "./pages/Clientes";

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
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
};

export default AppRoutes;
