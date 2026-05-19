import { v4 as uuid } from 'uuid';
import { log } from '../../logger/src/index.js';

export type BotState = { id: string; displayName: string; publicJoinable: boolean; enabled: boolean; maxPlayers: number; status: 'offline'|'online'|'paused' };

export class BotManager {
  private bots = new Map<string, BotState>();
  list = () => [...this.bots.values()];
  get = (id: string) => this.bots.get(id);
  upsert(bot: Omit<BotState, 'status'> & { status?: BotState['status'] }) {
    if (bot.publicJoinable) for (const b of this.bots.values()) b.publicJoinable = false;
    const finalBot: BotState = { ...bot, status: bot.status ?? 'offline' };
    this.bots.set(bot.id, finalBot);
    return finalBot;
  }
  create(input: { displayName: string; publicJoinable: boolean; enabled: boolean; maxPlayers: number }) {
    const id = `bot-${uuid().slice(0, 8)}`;
    return this.upsert({ id, ...input });
  }
  delete(id: string) { return this.bots.delete(id); }
  start(id: string) { const b = this.must(id); b.status='online'; log('info','bot_online',{botId:id}); return b; }
  stop(id: string) { const b = this.must(id); b.status='offline'; log('info','bot_offline',{botId:id}); return b; }
  pause(id: string) { const b = this.must(id); b.status='paused'; log('info','bot_paused',{botId:id}); return b; }
  resume(id: string) { const b = this.must(id); b.status='online'; return b; }
  private must(id:string){ const b=this.bots.get(id); if(!b) throw new Error('bot_not_found'); return b; }
}
