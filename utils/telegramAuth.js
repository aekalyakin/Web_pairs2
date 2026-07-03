const crypto = require('crypto');

function verifyTelegramInitData(initData, botToken) {
  if (!initData || !botToken) return { valid: false, data: null };

  const params = new URLSearchParams(initData);
  const hash = params.get('hash');
  if (!hash) return { valid: false, data: null };

  params.delete('hash');

  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();
  const computedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

  const valid = computedHash === hash;

  const authDate = Number(params.get('auth_date') || 0);
  const isFresh = authDate > 0 && (Date.now() / 1000 - authDate) < 86400;

  let userData = null;
  try {
    userData = JSON.parse(params.get('user') || 'null');
  } catch {}

  return { valid: valid && isFresh, data: userData };
}

module.exports = { verifyTelegramInitData };
