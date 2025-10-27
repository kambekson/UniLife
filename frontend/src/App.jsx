import { Link, Route, Routes } from "react-router-dom";
import ClubDetailPage from "./components/ClubDetailPage.jsx";
import ClubListPage from "./components/ClubListPage.jsx";
import RegisterClubPage from "./components/RegisterClubPage.jsx";

const App = () => (
  <div className="app-shell">
    <header className="page-header">
      <Link to="/" className="home-link">
        UniLife Hub
      </Link>
      <nav className="nav-actions">
        <Link to="/register-club" className="register-link">
          Зарегистрировать клуб
        </Link>
      </nav>
    </header>

    <Routes>
      <Route path="/" element={<ClubListPage />} />
      <Route path="/clubs/:id" element={<ClubDetailPage />} />
      <Route path="/register-club" element={<RegisterClubPage />} />
    </Routes>
  </div>
);

export default App;
