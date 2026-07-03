# Деплой на FirstVDS

## 1. Локально
```bash
npm install
npm run build            # разово
# или для постоянной разработки:
npm run build -- --watch # пересобирает dist/ при каждом сохранении файла
```

## 2. Сервер (один раз)
```bash
apt update && apt install -y nginx certbot python3-certbot-nginx
mkdir -p /var/www/pair-decisions
```
Загрузить `nginx-pair-decisions.conf` в `/etc/nginx/sites-available/pair-decisions`,
заменить `ВАШ_ДОМЕН`, затем:
```bash
ln -s /etc/nginx/sites-available/pair-decisions /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
certbot --nginx -d ваш-домен.ru   # HTTPS обязателен — без него не работает Telegram Mini App
```

## 3. WinSCP — автосинхронизация
Подключиться по SFTP → **Commands → Keep Remote Directory up to Date** (Ctrl+U)
- Локально: `pair-decisions-web\dist`
- На сервере: `/var/www/pair-decisions`

Держи открытым `npm run build -- --watch` — изменения долетают до сайта за ~30 сек.

## 4. Telegram Mini App
После HTTPS: @BotFather → `/newapp` → указать `https://ваш-домен.ru`
