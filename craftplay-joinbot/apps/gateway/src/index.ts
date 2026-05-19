import { loadConfig } from '../../../packages/config/src/index.js';
import { log } from '../../../packages/logger/src/index.js';
const cfg = loadConfig();
log('info','gateway_boot',{ target: cfg.target, singlePublicBot: true, dynamicBots: true });
setInterval(()=>log('info','health_heartbeat',{service:'gateway'}), cfg.bot.heartbeat_seconds*1000);
