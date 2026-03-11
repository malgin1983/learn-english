# Запуск проекта (локально и на VDS)

Всё крутится в **Docker**. Данные PostgreSQL лежат в папке `data/postgres` — их можно бэкапить и переносить на сервер.

## Локально (Mac / Linux)

### 1. Установить Docker

[Install Docker Desktop](https://docs.docker.com/get-docker/) (или только Engine на Linux).

### 2. (Опционально) Создать `.env`

Для одного только `docker compose up` файл не обязателен — переменные заданы в `docker-compose.yml`. Файл нужен, если хотите переопределить пароль БД или другие опции: `cp .env.example .env` и отредактируйте.

### 3. Запустить

```bash
docker compose up -d
```

При **первом** запуске Postgres поднимет пустую БД и сам выполнит миграции из `db/` (в т.ч. `001_auth.sql`). Данные сохраняются в `./data/postgres`.

- Приложение: http://localhost:3000  
- Postgres: localhost:5432 (логин/пароль из `.env.example`)

### 4. Остановить

```bash
docker compose down
```

Данные в `data/postgres` остаются. Чтобы удалить и их: `docker compose down -v` не трогает bind mount; нужно удалить папку вручную: `rm -rf data/postgres`.

---

## Разработка: только БД в Docker, приложение локально

Если удобнее крутить Next.js через `npm run dev`:

```bash
docker compose up -d postgres
```

В `.env` укажите хост `localhost` (из контейнера порт 5432 проброшен):

```env
DATABASE_URL=postgresql://postgres:Candy@localhost:5432/english-learn
```

Миграции при первом запуске контейнера применятся автоматически. Дальше:

```bash
npm run dev
```

---

## Деплой на VDS

1. На сервере: установить Docker и Docker Compose (или плагин `compose` в Docker).
2. Склонировать репозиторий на сервер.
3. Создать `.env` (можно так же от `cp .env.example .env`; на проде лучше сменить пароль Postgres и при необходимости порты).
4. Запустить:

   ```bash
   docker compose up -d
   ```

Данные БД будут в `./data/postgres`. Рекомендуется настроить бэкапы этой папки (или дампы через `pg_dump`).

### Пароль Postgres на проде

В `docker-compose.yml` замените `POSTGRES_PASSWORD` и в сервисе `app` в `environment.DATABASE_URL` укажите тот же пароль, либо задайте пароль только в `.env` и используйте в compose переменную окружения (например `POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}` и `DATABASE_URL: postgresql://postgres:${POSTGRES_PASSWORD}@postgres:5432/english-learn`).

### Nginx перед приложением (опционально)

На VDS часто ставят Nginx как обратный прокси на порт 80/443 и проксируют на `localhost:3000`. Конфиг и SSL — отдельная тема; приложение слушает порт 3000 внутри контейнера.

---

## Бэкап и перенос данных

- **Папка:** скопировать `data/postgres` на другой сервер; при первом запуске compose на новом месте использовать эту папку как volume (как в текущем `docker-compose.yml`).
- **Дамп:**  
  `docker compose exec postgres pg_dump -U postgres english-learn > backup.sql`  
  Восстановление:  
  `docker compose exec -T postgres psql -U postgres english-learn < backup.sql`
