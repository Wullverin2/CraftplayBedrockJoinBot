import express from 'express';
import { loadConfig } from '../../../packages/config/src/index.js';
import { BotManager } from '../../../packages/sessions/src/botManager.js';

const config = loadConfig();
const manager = new BotManager();
manager.upsert({ id: config.bot.id, displayName: config.bot.display_name, publicJoinable: true, enabled: config.bot.enabled, maxPlayers: config.bot.max_players, status: 'offline' });

const app = express();
app.use(express.json());
const p = '/api/v1';
app.get(`${p}/status`, (_req,res) => res.json({ ok: true, bots: manager.list().length }));
app.get(`${p}/bot`, (_req,res) => res.json(manager.list().find(b=>b.publicJoinable) ?? null));
app.get(`${p}/bots`, (_req,res) => res.json(manager.list()));
app.get(`${p}/bots/:botId`, (req,res) => res.json(manager.get(req.params.botId) ?? null));
app.post(`${p}/bots`, (req,res) => res.json({ botId: manager.create(req.body).id, status: 'created' }));
app.patch(`${p}/bots/:botId`, (req,res) => res.json(manager.upsert({ ...manager.get(req.params.botId)!, ...req.body })));
app.delete(`${p}/bots/:botId`, (req,res) => res.json({ deleted: manager.delete(req.params.botId) }));
for (const action of ['start','stop','restart','pause','resume']) app.post(`${p}/bots/:botId/${action}`, (req,res) => {
  const id=req.params.botId;
  const map:any={start:()=>manager.start(id),stop:()=>manager.stop(id),restart:()=>{manager.stop(id);return manager.start(id);},pause:()=>manager.pause(id),resume:()=>manager.resume(id)};
  res.json(map[action]());
});
app.listen(config.api.port, config.api.bind, () => console.log(`admin-api listening on ${config.api.port}`));
