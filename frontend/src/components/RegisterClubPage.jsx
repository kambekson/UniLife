import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client.js";

const initialFormState = {
  name: "",
  full_description: "",
  contact_info: "",
};

const RegisterClubPage = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    api
      .post("/clubs", formData)
      .then(() => {
        setFormData(initialFormState);
        navigate("/");
      })
      .catch(() => {
        setError("Не удалось создать клуб. Попробуйте еще раз.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="form-card">
      <h1 className="page-title">Регистрация нового клуба</h1>
      <form className="form-fields" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="club-name">Название клуба</label>
          <input
            id="club-name"
            name="name"
            type="text"
            className="form-input"
            placeholder="Например, Eco Future"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="club-description">Полное описание</label>
          <textarea
            id="club-description"
            name="full_description"
            className="form-textarea"
            placeholder="Расскажите о миссии, мероприятиях и участниках клуба..."
            value={formData.full_description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="club-contact">Контактная информация</label>
          <input
            id="club-contact"
            name="contact_info"
            type="text"
            className="form-input"
            placeholder="Email, Telegram или другой способ связи"
            value={formData.contact_info}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="submit-button" type="submit" disabled={submitting}>
          {submitting ? "Отправка..." : "Создать клуб"}
        </button>
      </form>
    </div>
  );
};

export default RegisterClubPage;
