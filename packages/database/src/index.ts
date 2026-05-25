import mysql from 'mysql2/promise';
export const connectDb = (cfg: any) => mysql.createPool({ host: cfg.host, port: cfg.port, user: cfg.username, password: cfg.password, database: cfg.database, waitForConnections: true, connectionLimit: cfg.pool.max });

export const bootstrapSchema = async (db: mysql.Pool) => {
  const ddl = [
    `CREATE TABLE IF NOT EXISTS bots (id VARCHAR(64) PRIMARY KEY, display_name VARCHAR(64) NOT NULL, public_joinable BOOLEAN NOT NULL DEFAULT FALSE, enabled BOOLEAN NOT NULL DEFAULT TRUE, max_players INT NOT NULL DEFAULT 20, auth_state VARCHAR(16) NOT NULL DEFAULT 'none', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, last_online_at TIMESTAMP NULL)`,
    `CREATE TABLE IF NOT EXISTS bot_auth_state (bot_id VARCHAR(64) PRIMARY KEY, encrypted_tokens TEXT NULL, device_code VARCHAR(64) NULL, user_code VARCHAR(32) NULL, verification_uri VARCHAR(255) NULL, expires_at TIMESTAMP NULL, status VARCHAR(16) NOT NULL DEFAULT 'none')`,
    `CREATE TABLE IF NOT EXISTS player_sessions (id BIGINT AUTO_INCREMENT PRIMARY KEY, bot_id VARCHAR(64) NOT NULL, xuid VARCHAR(32) NOT NULL, joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, left_at TIMESTAMP NULL)`,
    `CREATE TABLE IF NOT EXISTS queue_entries (id BIGINT AUTO_INCREMENT PRIMARY KEY, bot_id VARCHAR(64) NOT NULL, xuid VARCHAR(32) NOT NULL, priority INT NOT NULL DEFAULT 0, enqueued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`,
    `CREATE TABLE IF NOT EXISTS player_history (id BIGINT AUTO_INCREMENT PRIMARY KEY, bot_id VARCHAR(64) NOT NULL, xuid VARCHAR(32) NOT NULL, action VARCHAR(32) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`,
    `CREATE TABLE IF NOT EXISTS system_logs (id BIGINT AUTO_INCREMENT PRIMARY KEY, level VARCHAR(16), message TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`,
    `CREATE TABLE IF NOT EXISTS api_audit_log (id BIGINT AUTO_INCREMENT PRIMARY KEY, api_key_name VARCHAR(64), action VARCHAR(128), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`,
    `CREATE TABLE IF NOT EXISTS metrics_snapshots (id BIGINT AUTO_INCREMENT PRIMARY KEY, payload JSON, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`
  ];
  for (const q of ddl) await db.query(q);
};
