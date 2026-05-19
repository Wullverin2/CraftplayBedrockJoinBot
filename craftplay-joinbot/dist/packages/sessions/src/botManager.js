"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotManager = void 0;
const uuid_1 = require("uuid");
const index_js_1 = require("../../logger/src/index.js");
class BotManager {
    bots = new Map();
    list = () => [...this.bots.values()];
    get = (id) => this.bots.get(id);
    upsert(bot) {
        if (bot.publicJoinable)
            for (const b of this.bots.values())
                b.publicJoinable = false;
        const finalBot = { ...bot, status: bot.status ?? 'offline' };
        this.bots.set(bot.id, finalBot);
        return finalBot;
    }
    create(input) {
        const id = `bot-${(0, uuid_1.v4)().slice(0, 8)}`;
        return this.upsert({ id, ...input });
    }
    delete(id) { return this.bots.delete(id); }
    start(id) { const b = this.must(id); b.status = 'online'; (0, index_js_1.log)('info', 'bot_online', { botId: id }); return b; }
    stop(id) { const b = this.must(id); b.status = 'offline'; (0, index_js_1.log)('info', 'bot_offline', { botId: id }); return b; }
    pause(id) { const b = this.must(id); b.status = 'paused'; (0, index_js_1.log)('info', 'bot_paused', { botId: id }); return b; }
    resume(id) { const b = this.must(id); b.status = 'online'; return b; }
    must(id) { const b = this.bots.get(id); if (!b)
        throw new Error('bot_not_found'); return b; }
}
exports.BotManager = BotManager;
