import {exec} from'child_process';
import path from 'path';

import colors from 'colors';
import moment from 'moment';

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

    static _configs: {
        level: number, isWriteToFile: boolean, logDir: string, timeIncluded: boolean
    } = {
        level: 4,
        isWriteToFile: false,
        logDir: "",
        timeIncluded: true
    };

    static config(configs: {level: number, isWriteToFile: boolean, logDir: string, timeIncluded: boolean}): void {
        Logger._configs = configs;
    }

    error(...msg: any) {
        let log_time = Logger._configs.timeIncluded ? new Date().toTimeString() : "";
        let category = colors.red(`[ERROR][${this._prefix}]`);
        console.log.apply(null, [[log_time, category].join(" "), ...msg]);
        if (Logger._configs.isWriteToFile) this._writefile(log_time, category, msg);
    }

    warn(...msg: any) {
        if (Logger._configs.level < Logger.Levels.WARN) return;
        let log_time = Logger._configs.timeIncluded ? new Date().toTimeString() : "";
        let category = colors.yellow(`[WARN][${this._prefix}]`);
        console.log.apply(null, [[log_time, category].join(" "), ...msg]);
        if (Logger._configs.isWriteToFile) this._writefile(log_time, category, msg);
    }

    info(...msg: any) {
        if (Logger._configs.level < Logger.Levels.INFO) return;
        let log_time = Logger._configs.timeIncluded ? new Date().toTimeString() : "";
        let category = colors.green(`[INFO][${this._prefix}]`);
        console.log.apply(null, [[log_time, category].join(" "), ...msg]);
        if (Logger._configs.isWriteToFile) this._writefile(log_time, category, msg);
    }

    debug(...msg: any) {
        if (Logger._configs.level < Logger.Levels.DEBUG) return;
        let log_time = Logger._configs.timeIncluded ? new Date().toTimeString() : "";
        let category = colors.blue(`[DEBUG][${this._prefix}]`);
        console.log.apply(null, [[log_time, category].join(" "), ...msg]);
        // if (Logger._configs.isWriteToFile) this._writefile(log_time, category, msg);
    }

    private _writefile(log_time: String, category: String, msg: Array<any>) {
        if (!Logger._configs.isWriteToFile) return;
        const url = `${path.join(Logger._configs.logDir, "media-server_" + moment().format("yyyyMMDD") + ".log")}`;
        let content = `${log_time} ${category} - ${msg.map(s => JSON.stringify(s)).join(", ")}`;
        exec(`echo "${content.replace(/[\\$'"]/g, "\\$&")}" >> ${url}`,
            (error, stdout, stderr) => {
                if (error) console.log('Write log error:', error.message, stderr);
            }
        );
    }
}
