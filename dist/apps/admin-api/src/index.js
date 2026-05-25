"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_js_1 = require("../../../packages/config/src/index.js");
const botManager_js_1 = require("../../../packages/sessions/src/botManager.js");
const config = (0, index_js_1.loadConfig)();
const manager = new botManager_js_1.BotManager();
manager.upsert({ id: config.bot.id, displayName: config.bot.display_name, publicJoinable: true, enabled: config.bot.enabled, maxPlayers: config.bot.max_players, status: 'offline' });
const app = (0, express_1.default)();
app.use(express_1.default.json());
const p = '/api/v1';
app.get(`${p}/status`, (_req, res) => res.json({ ok: true, bots: manager.list().length }));
app.get(`${p}/bot`, (_req, res) => res.json(manager.list().find(b => b.publicJoinable) ?? null));
app.get(`${p}/bots`, (_req, res) => res.json(manager.list()));
app.get(`${p}/bots/:botId`, (req, res) => res.json(manager.get(req.params.botId) ?? null));
app.post(`${p}/bots`, (req, res) => res.json({ botId: manager.create(req.body).id, status: 'created' }));
app.patch(`${p}/bots/:botId`, (req, res) => res.json(manager.upsert({ ...manager.get(req.params.botId), ...req.body })));
app.delete(`${p}/bots/:botId`, (req, res) => res.json({ deleted: manager.delete(req.params.botId) }));
for (const action of ['start', 'stop', 'restart', 'pause', 'resume'])
    app.post(`${p}/bots/:botId/${action}`, (req, res) => {
        const id = req.params.botId;
        const map = { start: () => manager.start(id), stop: () => manager.stop(id), restart: () => { manager.stop(id); return manager.start(id); }, pause: () => manager.pause(id), resume: () => manager.resume(id) };
        res.json(map[action]());
    });
app.listen(config.api.port, config.api.bind, () => console.log(`admin-api listening on ${config.api.port}`));
