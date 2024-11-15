import { useNavigate } from "react-router-dom";

const Header = () => {
  // const navigate = useNavigate(); // Hook para navegação

  const logout = () => {
    localStorage.clear(); // Limpa o localStorage
    window.location.href = "/login"; // Redireciona para a página de login
  };

  return (
    <header className="container-fluid d-flex justify-content-end">
      <div
        className="d-flex align-items-center text-white"
        onClick={logout}
        style={{ cursor: "pointer" }}
      >
        Sair
        <span className="mdi mdi-logout" style={{ marginLeft: "5px" }}></span>
      </div>
    </header>
  );
};

export default Header;
