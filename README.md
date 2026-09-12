# Nebula

**Built with ❤️ by Abdullah Al Mamun — [@A2MBD3](https://t.me/A2MBD3)**

Open-source tools for the community. Fork, modify, and build freely — please keep credit to the original author.

---

## A2MBD3 API

Base URL:

```text
https://nebula-bot-g8ey.onrender.com
```

### Endpoint

```http
POST /A2MBD3
```

Authenticates with a **TOTP pin** (6 digits, 30s window) and returns a destination link for the selected mode.

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| `pin`  | Yes | Current 6-digit TOTP code from your API secret |
| `mode` | Yes | Target mode: `1`, `2`, or `vp` |
| `vp`   | Only if `mode` is `vp` | VPLink key / path to resolve |
| `Content-Type` | Recommended | `application/json` |

You may also send `pin`, `mode`, and `vp` in the JSON body. Headers take priority.

`type` is accepted as an alias of `mode`.

### Modes

| mode | Meaning |
|------|---------|
| `1`  | Aincrad Proxy |
| `2`  | Aincrad |
| `vp` | VPLink.in (requires `vp` header/body) |

### Get a TOTP secret

1. Open the **Nebula Telegram bot**.
2. Use the **API** button.
3. Accept the terms (client UI must show credit **@A2MBD3**).
4. Enter a **system name**.
5. The bot gives you a **one-time TOTP secret** (base32). Save it — each user gets one secret.

Generate the current pin with any standard TOTP app (Google Authenticator, Aegis, etc.) or in code (HMAC-SHA1, 30s step, 6 digits).

### Success response

```json
{
  "success": true,
  "destinationLink": "https://…",
  "type": "aincrad",
  "verified": true,
  "pinExpiresIn": "18s",
  "owner": "@A2MBD3",
  "client": "YourSystemName"
}
```

| Field | Description |
|-------|-------------|
| `destinationLink` | Resolved target URL |
| `type` | Mode label (`aincrad`, `aincrad proxy`, `vplink.in`, …) |
| `verified` | `true` when pin was accepted |
| `pinExpiresIn` | Seconds left in the current TOTP window |
| `owner` | Always `@A2MBD3` |
| `client` | Your registered system name (when applicable) |

### Error response

```json
{
  "error": "…",
  "status": "failed"
}
```

Common cases: missing/invalid pin, missing `vp` for mode `vp`, upstream timeout.

### Examples

**cURL — Aincrad (mode 2)**

```bash
curl -X POST "https://nebula-bot-g8ey.onrender.com/A2MBD3" \
  -H "Content-Type: application/json" \
  -H "pin: 123456" \
  -H "mode: 2"
```

**cURL — Aincrad Proxy (mode 1)**

```bash
curl -X POST "https://nebula-bot-g8ey.onrender.com/A2MBD3" \
  -H "pin: 123456" \
  -H "mode: 1"
```

**cURL — VPLink**

```bash
curl -X POST "https://nebula-bot-g8ey.onrender.com/A2MBD3" \
  -H "pin: 123456" \
  -H "mode: vp" \
  -H "vp: YOUR_VPLINK_KEY"
```

**JavaScript (fetch)**

```javascript
const pin = "123456"; // current TOTP

const res = await fetch("https://nebula-bot-g8ey.onrender.com/A2MBD3", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    pin,
    mode: "2",
  },
  body: JSON.stringify({ pin, mode: "2" }),
});

const data = await res.json();
if (data.success) {
  console.log(data.destinationLink);
} else {
  console.error(data.error || data.status);
}
```

**Python**

```python
import requests

pin = "123456"  # current TOTP
r = requests.post(
    "https://nebula-bot-g8ey.onrender.com/A2MBD3",
    headers={"pin": pin, "mode": "2", "Content-Type": "application/json"},
    json={"pin": pin, "mode": "2"},
    timeout=30,
)
print(r.json())
```

### CORS

`Access-Control-Allow-Origin: *` is enabled. Browser clients can call the API cross-origin. Allowed header names include `pin`, `mode`, `type`, `vp`, and `Content-Type`.

### Rules

- Always show credit **@A2MBD3** in any public client UI that uses this API.
- One TOTP secret per registered user; do not share secrets.
- Pin rotates every **30 seconds** — send a fresh code each request.

---

## License / credit

Use and modify freely. Keep attribution to **Abdullah Al Mamun (@A2MBD3)**.
