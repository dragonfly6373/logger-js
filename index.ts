import {exec} from'child_process';
import path from 'path';

import colors from 'colors';
import moment from 'moment';

export default class Logger {
    private _prefix: string = "Logger";

    constructor(prefix: string) {
        this._prefix = prefix;
    }
    /*
    # LOGGING - Serverity
    DEFAULT  (0) The log entry has no assigned severity level.
    NOTICE  (300) Normal but significant events, such as start up, shut down, or a configuration change.
    CRITICAL  (600) Critical events cause more severe problems or outages.
    ALERT  (700) A person must take an action immediately.
    EMERGENCY  (800) One or more systems are unusable.
    */
    static Levels = {
        DEFAULT: 0,
        DEBUG: 100,
        INFO: 200,
        NOTICE: 300,
        WARNING: 400,
        ERROR: 500,
        CRITICAL: 600,
        ALERT: 700,
        EMERGENCY: 800
    };

    static _configs: {
        appName: string, level: number, isWriteToFile: boolean, logDir: string, timeIncluded: boolean
    } = {
        appName: "logger",
        level: 4,
        isWriteToFile: false,
        logDir: "",
        timeIncluded: true
    };

    static config(configs: {appName: string, level: number, isWriteToFile: boolean, logDir: string, timeIncluded: boolean}): void {
        Logger._configs = configs;
    }

    default(...msg: any) {
        if (Logger._configs.level > Logger.Levels.DEFAULT) return;
        let log_time = Logger._configs.timeIncluded ? new Date().toTimeString() : "";
        let category = colors.gray(`[DEFAULT][${this._prefix}]`);
        console.log.apply(null, [[log_time, category].join(" "), ...msg]);
        if (Logger._configs.isWriteToFile) this._writefile(log_time, category, msg);
    }

    debug(...msg: any) {
        if (Logger._configs.level > Logger.Levels.DEBUG) return;
        let log_time = Logger._configs.timeIncluded ? new Date().toTimeString() : "";
        let category = colors.blue(`[DEBUG][${this._prefix}]`);
        console.log.apply(null, [[log_time, category].join(" "), ...msg]);
        // if (Logger._configs.isWriteToFile) this._writefile(log_time, category, msg);
    }

    info(...msg: any) {
        if (Logger._configs.level > Logger.Levels.INFO) return;
        let log_time = Logger._configs.timeIncluded ? new Date().toTimeString() : "";
        let category = colors.green(`[INFO][${this._prefix}]`);
        console.log.apply(null, [[log_time, category].join(" "), ...msg]);
        if (Logger._configs.isWriteToFile) this._writefile(log_time, category, msg);
    }

    notice(...msg: any) {
        if (Logger._configs.level > Logger.Levels.NOTICE) return;
        let log_time = Logger._configs.timeIncluded ? new Date().toTimeString() : "";
        let category = colors.green(`[NOTICE][${this._prefix}]`);
        console.log.apply(null, [[log_time, category].join(" "), ...msg]);
        if (Logger._configs.isWriteToFile) this._writefile(log_time, category, msg);
    }

    warn(...msg: any) {
        if (Logger._configs.level > Logger.Levels.WARNING) return;
        let log_time = Logger._configs.timeIncluded ? new Date().toTimeString() : "";
        let category = colors.yellow(`[WARN][${this._prefix}]`);
        console.log.apply(null, [[log_time, category].join(" "), ...msg]);
        if (Logger._configs.isWriteToFile) this._writefile(log_time, category, msg);
    }

    error(...msg: any) {
        if (Logger._configs.level > Logger.Levels.ERROR) return;
        let log_time = Logger._configs.timeIncluded ? new Date().toTimeString() : "";
        let category = colors.red(`[ERROR][${this._prefix}]`);
        console.log.apply(null, [[log_time, category].join(" "), ...msg]);
        if (Logger._configs.isWriteToFile) this._writefile(log_time, category, msg);
    }

    critical(...msg: any) {
        if (Logger._configs.level > Logger.Levels.CRITICAL) return;
        let log_time = Logger._configs.timeIncluded ? new Date().toTimeString() : "";
        let category = colors.red(`[CRITICAL][${this._prefix}]`);
        console.log.apply(null, [[log_time, category].join(" "), ...msg]);
        if (Logger._configs.isWriteToFile) this._writefile(log_time, category, msg);
    }

    alert(...msg: any) {
        if (Logger._configs.level > Logger.Levels.ALERT) return;
        let log_time = Logger._configs.timeIncluded ? new Date().toTimeString() : "";
        let category = colors.red(`[ALERT][${this._prefix}]`);
        console.log.apply(null, [[log_time, category].join(" "), ...msg]);
        if (Logger._configs.isWriteToFile) this._writefile(log_time, category, msg);
    }

    emergency(...msg: any) {
        let log_time = Logger._configs.timeIncluded ? new Date().toTimeString() : "";
        let category = colors.red(`[EMERGENCY][${this._prefix}]`);
        console.log.apply(null, [[log_time, category].join(" "), ...msg]);
        if (Logger._configs.isWriteToFile) this._writefile(log_time, category, msg);
    }

    private _writefile(log_time: String, category: String, msg: Array<any>) {
        if (!Logger._configs.isWriteToFile) return;
        const url = `${path.join(Logger._configs.logDir, Logger._configs.appName + "_" + moment().format("yyyyMMDD") + ".log")}`;
        let content = `${log_time} ${category} - ${msg.map(s => JSON.stringify(s)).join(", ")}`;
        exec(`echo "${content.replace(/[\\$'"]/g, "\\$&")}" >> ${url}`,
            (error, stdout, stderr) => {
                if (error) console.log('Write log error:', error.message, stderr);
            }
        );
    }
}
