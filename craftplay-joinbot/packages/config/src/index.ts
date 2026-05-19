import fs from 'node:fs';
import YAML from 'yaml';
export const loadConfig = (path = 'config/config.yml') => YAML.parse(fs.readFileSync(path, 'utf8'));
