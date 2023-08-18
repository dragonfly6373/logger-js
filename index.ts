import {exec} from'child_process';
import path from 'path';
import * as dotenv from 'dotenv';

import colors from 'colors';
import moment from 'moment';

function parseBoolean(value: string | null | undefined) {
    return (value?.toLowerCase?.() === 'true');
}

dotenv.config();

const level             = parseInt(process.env.LOGGER_LEVEL || "4") || 4;
const isWriteToFile     = parseBoolean(process.env.LOGGER_WRITE_FILE);
const logDir            = process.env.LOGGER_OUTPUT || "";
const timeIncluded      = parseBoolean(process.env.LOGGER_TIME_INCLUDED);

export default class Logger {
    private _prefix: string = "Logger";

    constructor(prefix: string) {
        this._prefix = prefix;
    }

    static Levels = {
        ERROR: 1,
        WARN: 2,
        INFO: 3,
        DEBUG: 4
    };

    error(...msg: any) {
        let log_time = timeIncluded ? new Date().toTimeString() : "";
        let category = colors.red(`[ERROR][${this._prefix}]`);
        console.log.apply(null, [[log_time, category].join(" "), ...msg]);
        this._writefile(log_time, category, msg);
    }

    warn(...msg: any) {
        if (level < Logger.Levels.WARN) return;
        let log_time = timeIncluded ? new Date().toTimeString() : "";
        let category = colors.yellow(`[WARN][${this._prefix}]`);
        console.log.apply(null, [[log_time, category].join(" "), ...msg]);
        this._writefile(log_time, category, msg);
    }

    info(...msg: any) {
        if (level < Logger.Levels.INFO) return;
        let log_time = timeIncluded ? new Date().toTimeString() : "";
        let category = colors.green(`[INFO][${this._prefix}]`);
        console.log.apply(null, [[log_time, category].join(" "), ...msg]);
        this._writefile(log_time, category, msg);
    }

    debug(...msg: any) {
        if (level < Logger.Levels.DEBUG) return;
        let log_time = timeIncluded ? new Date().toTimeString() : "";
        let category = colors.blue(`[DEBUG][${this._prefix}]`);
        console.log.apply(null, [[log_time, category].join(" "), ...msg]);
        // this._writefile(log_time, category, msg);
    }

    private _writefile(log_time: String, category: String, msg: Array<any>) {
        if (!isWriteToFile) return;
        const url = `${path.join(logDir, "media-server_" + moment().format("yyyyMMDD") + ".log")}`;
        let content = `${log_time} ${category} - ${msg.map(s => JSON.stringify(s)).join(", ")}`;
        exec(`echo "${content.replace(/[\\$'"]/g, "\\$&")}" >> ${url}`,
            (error, stdout, stderr) => {
                if (error) console.log('Write log error:', error.message, stderr);
            }
        );
    }
}
