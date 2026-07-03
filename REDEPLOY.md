# Разворачиваем бэкенд заново

Старый бэкенд (`function-bun-production-73ad`) больше не существует — Railway
освободил домен. Разворачиваем новый, уже со всеми правками (Telegram-вход,
реальный мэтч, три состояния голоса).

---

## Шаг 1 — MongoDB (проверить/создать)

**Если у тебя ещё жив кластер MongoDB Atlas с прошлого раза** — просто возьми
его connection string и переходи к Шагу 2.

**Если не уверен или нужно создать заново:**

1. [cloud.mongodb.com](https://cloud.mongodb.com) → Sign in / Sign up
2. **Create** → Free tier (M0, 512MB — бесплатно навсегда)
3. **Database Access** → Add New Database User → логин/пароль (сохрани пароль!)
4. **Network Access** → Add IP Address → **Allow Access from Anywhere** (`0.0.0.0/0`)
5. **Database → Connect → Drivers → Node.js** → скопируй строку вида:
   ```
   mongodb+srv://user:PASSWORD@cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Вставь пароль вместо `PASSWORD`, добавь имя базы перед `?`:
   ```
   mongodb+srv://user:PASSWORD@cluster.xxxxx.mongodb.net/pair-decisions?retryWrites=true&w=majority
   ```

---

## Шаг 2 — Новый репозиторий на GitHub

1. Распакуй `pair-decisions-backend.zip`
2. GitHub Desktop → **File → Add Local Repository** → выбери папку
3. Если попросит "create a repository" — нажми на ссылку
4. **Publish repository** — назови например `pair-decisions-backend`

---

## Шаг 3 — Новый проект в Railway

1. [railway.app/dashboard](https://railway.app/dashboard) → **New Project**
2. **Deploy from GitHub repo** → выбери `pair-decisions-backend`
3. Railway сам определит Node.js и начнёт билд

### Переменные окружения

Пока билдится — открой вкладку **Variables** у сервиса, добавь:

| Переменная | Значение |
|---|---|
| `MONGODB_URI` | строка из Шага 1 |
| `JWT_SECRET` | любая случайная строка 32+ символов (см. ниже как сгенерировать) |
| `TELEGRAM_BOT_TOKEN` | `8858843443:AAEZ5P7dp15crLRfsmln05NiZTXpjWSVQSY` |
| `NODE_ENV` | `production` |

Сгенерировать `JWT_SECRET` — в любом терминале с Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Публичный домен

**Settings → Networking → Generate Domain** — получишь адрес вида:
```
pair-decisions-backend-production.up.railway.app
```

---

## Шаг 4 — Проверка

Открой в браузере:
```
https://ТВОЙ-ДОМЕН.up.railway.app/api/health
```

Должен увидеть JSON:
```json
{"status":"ok","timestamp":"...","env":"production"}
```

Если видишь ошибку — открой в Railway вкладку **Deployments → (последний деплой) → View logs**, там будет причина (чаще всего — опечатка в `MONGODB_URI`).

---

## Шаг 5 — Подключить фронтенд к новому бэкенду

Новый домен нужно вписать во фронтенд-код. Открой файл
`WEB-PAIRs/src/api/client.js`, найди строку:

```js
const API_URL = 'https://function-bun-production-73ad.up.railway.app/api';
```

Замени на новый домен:

```js
const API_URL = 'https://ТВОЙ-НОВЫЙ-ДОМЕН.up.railway.app/api';
```

Сохрани → Commit → Push в GitHub Desktop. Vercel/Railway (в зависимости от
того, где сейчас фронтенд) передеплоит автоматически.

---

## Шаг 6 — Финальная проверка в Telegram

1. Открой Mini App в Telegram
2. Должен войти автоматически (экран Auth не показывается)
3. Создай тестовый опрос с 2 карточками
4. Проверь голосование и результаты

---

## Если что-то не работает

Пришли мне:
- Скриншот логов из Railway (**Deployments → View logs**)
- Или текст ошибки, если что-то не открывается

Разберём вместе.
