# Craftplay JoinBot
Single-public-bot-first JoinBot with dynamic multi-bot hotloading.

## Kerngedanke
- Initial genau **ein** öffentlicher Bot (`public_joinable=true`).
- Plattform ist vollständig multi-bot-fähig: neue Bots werden per API angelegt, aktiviert, authentifiziert und ohne Neustart gestartet.
- Nur Bots mit `public_joinable=true` sind in Freundeslisten als Join-Ziel sichtbar.

## Installation
1. `cp .env.example .env`
2. `docker compose up -d --build`
3. API prüfen: `GET /api/v1/status`

## Teamcontrol / Auth
- Device-Code-Flow verwenden (`/api/v1/auth/start` bzw. `/api/v1/auth/bots/{botId}/start`).
- Niemals Passworteingabe im Panel.
- Tokens verschlüsselt speichern, nie loggen.

## Multi-Bot API
- `POST /api/v1/bots` Bot live erstellen.
- `PATCH /api/v1/bots/{botId}` z.B. `publicJoinable` umschalten.
- `POST /api/v1/bots/{botId}/start|stop|pause|resume|restart`.
- Öffentlichen Bot wechseln: alten öffentlichen Bot deaktivieren oder Request ablehnen (Policy im BotManager).

## Hinweise
- Xbox-Gamertag ist der echte öffentliche Name, nicht `display_name`.
- Queue, Sessions und Audits sind bot-spezifisch ausgelegt.
