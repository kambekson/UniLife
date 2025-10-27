import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/client.js";

const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString;
  }
};

const ClubDetailPage = () => {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    api
      .get(`/clubs/${id}`)
      .then((response) => {
        if (isMounted) {
          setClub(response.data);
          setError(null);
        }
      })
      .catch((fetchError) => {
        if (isMounted) {
          if (fetchError?.response?.status === 404) {
            setError("Клуб с таким идентификатором не найден.");
          } else {
            setError("Не удалось загрузить данные клуба.");
          }
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
  }, [id]);

  if (loading) {
    return <p className="loading">Загружаем страницу клуба...</p>;
  }

  if (error) {
    return (
      <>
        <Link to="/" className="back-link">
          ← Назад к каталогу
        </Link>
        <p className="error-message">{error}</p>
      </>
    );
  }

  if (!club) {
    return null;
  }

  return (
    <>
      <Link to="/" className="back-link">
        ← Назад к каталогу
      </Link>
      <div className="detail-wrapper">
        <header className="detail-header">
          <h1 className="detail-title">{club.name}</h1>
          <div className="detail-meta">
            <span className="detail-contact">{club.contact_info}</span>
          </div>
        </header>

        <p className="detail-description">{club.full_description}</p>

        <section>
          <h2 className="events-heading">Ближайшие мероприятия</h2>
          <ul className="events-list">
            {club.events?.length ? (
              club.events.map((event) => (
                <li key={event.id}>
                  <span>{event.title}</span>
                  <span className="event-date">{formatDate(event.date)}</span>
                </li>
              ))
            ) : (
              <li>Нет запланированных событий.</li>
            )}
          </ul>
        </section>
      </div>
    </>
  );
};

export default ClubDetailPage;
