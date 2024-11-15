const Header = () => {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
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
