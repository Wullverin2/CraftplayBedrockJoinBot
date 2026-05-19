export type BotRecord = {
  id: string;
  displayName: string;
  publicJoinable: boolean;
  enabled: boolean;
  maxPlayers: number;
  authState: 'none' | 'pending' | 'ready' | 'error';
};

export type AppConfig = {
  network: { name: string; public_motd: string; max_total_players: number };
  target: { host: string; port: number; type: 'geyser' };
  bot: { id: string; display_name: string; enabled: boolean; auth_cache_dir: string; max_players: number; reconnect_delay_seconds: number; reconnect_attempts: number; heartbeat_seconds: number };
};
