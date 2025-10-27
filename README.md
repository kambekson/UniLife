# UniLife Hub — Pre-MVP

Каталог студенческих клубов Евразийского национального университета с возможностью подать заявку на регистрацию нового клуба.

## Стек

- **Backend:** Node.js, Express.js, CORS
- **Frontend:** React 18 (Vite), React Router DOM, Axios
- **Хранилище:** `backend/data.json`

## Структура

```
UniLife/
├── backend/        # API и файл данных
└── frontend/       # Vite-приложение с каталогом и формой регистрации
```

## Подготовка окружения

1. Убедитесь, что установлен Node.js ≥ 18.
2. Установите зависимости:

   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

## Запуск

### Backend

```bash
cd backend
npm start
```

Сервис будет доступен на `http://localhost:3001/api`.

### Frontend

```bash
cd frontend
npm run dev
```

Vite предложит локальный URL (по умолчанию `http://localhost:5173`).

## Сборка фронтенда

```bash
cd frontend
npm run build
```

Готовый бандл появится в `frontend/dist`.

## Дополнительно

- Для добавления клубов вручную обновите `backend/data.json`.
- Форма регистрации (`/register-club`) создаёт новые записи через `POST /api/clubs`.

