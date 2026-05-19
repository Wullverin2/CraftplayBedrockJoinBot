"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../packages/config/src/index.js");
const index_js_2 = require("../../../packages/logger/src/index.js");
const cfg = (0, index_js_1.loadConfig)();
(0, index_js_2.log)('info', 'gateway_boot', { target: cfg.target, singlePublicBot: true, dynamicBots: true });
setInterval(() => (0, index_js_2.log)('info', 'health_heartbeat', { service: 'gateway' }), cfg.bot.heartbeat_seconds * 1000);
