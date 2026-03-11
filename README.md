# English Learn

Веб-приложение для изучения английского языка: словарь, повторение слов и упражнения. Интерфейс рассчитан на детей — светлая тема и яркая палитра в стиле Google.

## Возможности

- **Изучаем слова** — добавление и изучение новых слов
- **Вспоминаем слова** — повторение и закрепление изученного
- **Упражнения** — задания для практики (в разработке)
- **Регистрация и вход** — аккаунт для сохранения прогресса

## Стек

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- **PostgreSQL** — пользователи и сессии (auth)
- **Docker** — запуск БД и приложения

## Быстрый старт

```bash
# Только БД в Docker, приложение локально
docker compose up -d postgres
cp .env.example .env   # при необходимости отредактировать DATABASE_URL
npm install
npm run dev
```

Приложение: [http://localhost:3000](http://localhost:3000)

Полный запуск в Docker и деплой на VDS — в [docs/SETUP-DB.md](docs/SETUP-DB.md).

## Скрипты

| Команда | Описание |
|--------|----------|
| `npm run dev` | Режим разработки |
| `npm run build` | Сборка для production |
| `npm run start` | Запуск production-сборки |
| `npm run lint` | Проверка ESLint |
| `npm run format` | Форматирование кода (Prettier) |
| `npm run docker:up` | Запуск всего стека в Docker |

## Структура проекта

Архитектура по [FSD](https://feature-sliced.design/): `app` (роуты), `pages`, `widgets`, `layouts`, `entities`, `shared`.
