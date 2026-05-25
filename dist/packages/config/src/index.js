"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const yaml_1 = __importDefault(require("yaml"));
const loadConfig = (path = 'config/config.yml') => yaml_1.default.parse(node_fs_1.default.readFileSync(path, 'utf8'));
exports.loadConfig = loadConfig;
