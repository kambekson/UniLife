import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client.js";

const ClubListPage = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    api
      .get("/clubs")
      .then((response) => {
        if (isMounted) {
          setClubs(response.data);
          setError(null);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Не удалось загрузить список клубов.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <p className="loading">Загружаем каталог клубов...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  const clubCount = clubs.length;

  return (
    <>
      <section className="hero">
        <div>
          <span className="hero-eyebrow">Сообщества кампуса</span>
          <h1 className="hero-title">Найдите клуб по интересам или создайте свой</h1>
          <p className="hero-text">
            UniLife Hub объединяет активистов, творцов и исследователей. Изучайте проекты,
            знакомьтесь с командами и делитесь собственными инициативами, чтобы кампус жил ярче.
          </p>
          <div className="hero-actions">
            <Link to="/register-club" className="primary-cta">
              Зарегистрировать клуб
            </Link>
            <a href="#clubs-list" className="secondary-cta">
              Смотреть каталог
            </a>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-value">{clubCount}</span>
            <span className="hero-stat-label">клубов уже опубликовано</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">2 мин</span>
            <span className="hero-stat-label">чтобы отправить заявку на регистрацию</span>
          </div>
        </div>
      </section>

      <section id="clubs-list" className="club-section">
        <h2 className="section-heading">
          Каталог клубов
        </h2>
        <div className="card-grid">
          {clubs.map((club) => (
            <Link key={club.id} to={`/clubs/${club.id}`} className="club-card">
              <h3 className="card-title">{club.name}</h3>
              <p className="card-description">{club.short_description}</p>
              <span className="card-arrow">
                Подробнее →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default ClubListPage;
