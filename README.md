# REST API промокодов

NestJS, PostgreSQL, Prisma. Подключение к БД — переменная **`DATABASE_URL`** в `.env` (шаблон — `.env.example`).

## Требования

- Node.js 20+
- PostgreSQL 16+ (локально или через Docker — см. `docker-compose.yml`)

## Первый запуск

1. **Зависимости** (после установки выполняется `postinstall` → `prisma generate`):

   ```bash
   npm install
   ```

2. **Окружение** — скопировать и при необходимости поправить хост, порт, пользователя БД:

   ```bash
   cp .env.example .env
   ```

3. **База** — поднять Postgres. Вариант с Docker:

   ```bash
   docker compose up -d
   ```

   База из примера: `promo`, пользователь/пароль `postgres`/`postgres`, порт **5432** (как в `.env.example`).

4. **Миграции**:

   ```bash
   npm run prisma:migrate
   ```

   Эквивалент: `npx prisma migrate deploy`. Отдельный `prisma generate` после `npm install` обычно не нужен.

5. **Сервер разработки**:

   ```bash
   npm run start:dev
   ```

Приложение слушает **`PORT`** из `.env` (по умолчанию **3000**). Базовый URL API: **`http://localhost:3000/api`**.

## Продакшен

```bash
npm run build
npm run start:prod
```

Нужны выставленные **`DATABASE_URL`**, **`PORT`** (если не 3000), применённые миграции на целевой БД (`npm run prisma:migrate`).

## Эндпоинты

| Метод  | Путь                               | Описание              |
| ------ | ---------------------------------- | --------------------- |
| `POST` | `/api/promocodes`                  | Создать промокод      |
| `GET`  | `/api/promocodes`                  | Список                |
| `GET`  | `/api/promocodes/:id`              | Один по UUID          |
| `PATCH`| `/api/promocodes/:id`              | Обновить              |
| `DELETE` | `/api/promocodes/:id`            | Удалить               |
| `POST` | `/api/promocodes/:id/activate`     | Активация по email    |

### Примеры тел запросов

Создание:

```json
{
  "code": "SUMMER20",
  "discountPercent": 20,
  "activationLimit": 100,
  "expiresAt": "2026-12-31T23:59:59.000Z"
}
```

Активация:

```json
{
  "email": "user@example.com"
}
```

Код промокода сохраняется в верхнем регистре, email — в нижнем.

## Скрипты npm

| Скрипт | Назначение |
| ------ | ---------- |
| `npm run build` | Сборка |
| `npm run start` | Запуск без watch |
| `npm run start:dev` | Разработка (watch) |
| `npm run start:debug` | Отладка + watch |
| `npm run start:prod` | `node dist/main` |
| `npm run lint` | ESLint |
| `npm run prisma:migrate` | Применить миграции (`migrate deploy`) |
| `npm run prisma:migrate:dev` | Dev: создать/применить миграции |
| `npm run prisma:generate` | Только Prisma Client |
