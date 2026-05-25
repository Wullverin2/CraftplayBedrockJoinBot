"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const redact = (obj) => JSON.stringify(obj, (_, v) => {
    if (typeof v === 'string' && /(token|password|secret|key)/i.test(v))
        return '[REDACTED]';
    return v;
});
const log = (level, event, data = {}) => {
    process.stdout.write(JSON.stringify({ ts: new Date().toISOString(), level, event, data: JSON.parse(redact(data)) }) + '\n');
};
exports.log = log;
