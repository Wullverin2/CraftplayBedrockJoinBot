const redact = (obj: unknown) => JSON.stringify(obj, (_, v) => {
  if (typeof v === 'string' && /(token|password|secret|key)/i.test(v)) return '[REDACTED]';
  return v;
});
export const log = (level: 'info'|'warn'|'error', event: string, data: Record<string, unknown> = {}) => {
  process.stdout.write(JSON.stringify({ ts: new Date().toISOString(), level, event, data: JSON.parse(redact(data)) }) + '\n');
};
