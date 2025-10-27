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

## Деплой на Railway

На Railway проект удобно разделить на два сервиса: API (Express) и фронтенд (Vite preview).

1. Загрузите репозиторий в GitHub и создайте проект на Railway.
2. Добавьте **Backend service**:
   - Deploy From GitHub → выберите ваш репозиторий.
   - Command: `bash start.sh`
   - (Опционально) задайте переменную `APP_ROLE=backend`, иначе скрипт ориентируется на имя сервиса (`backend/api/server`).
   - Railway передаст `PORT` автоматически, Express его использует.
3. Добавьте **Frontend service**:
   - Deploy From GitHub → тот же репозиторий.
   - Command: `bash start.sh`
   - Установите переменную `APP_ROLE=frontend` (или назовите сервис `frontend/web/client`).
   - Скрипт запустит `npm run preview`, слушая `0.0.0.0:$PORT`.
4. После деплоя возьмите публичный URL фронтенда и пропишите его в ваших клиентых настройках (если нужно).

> Советы:
> - Для ускорения билда можно включить автоматически кэш Node.js в настройках Nixpacks.
> - Если хотите обслуживать фронтенд и бэкенд с одного сервиса, соберите фронтенд и раздайте папку `dist` через Express (стоит вынести в отдельный middleware).

## Дополнительно

- Стартовый список клубов основан на публичной информации ЕНУ им. Л.Н. Гумилева.
- Для добавления клубов вручную обновите `backend/data.json`.
- Форма регистрации (`/register-club`) создаёт новые записи через `POST /api/clubs`.
