import Logger from './index';

Logger.config({
    appName: 'example',
    level: Logger.Levels.DEBUG,
    isWriteToFile: false,
    logDir: "/var/log/appname",
    timeIncluded: true
});
const logger = new Logger('Server');

try {
    logger.default("this message will not be printed on console");
    logger.debug("inspect some data here", {data: 1}, {value: 2});
    logger.info("some info message");
    logger.notice("inspect some data here", {data: 1}, {value: 2});
    logger.warn("this is warning message", {data: 1});
    logger.error("inspect some data here", {data: 1}, {value: 2});
    logger.critical("inspect some data here", {data: 1}, {value: 2});
    logger.alert("inspect some data here", {data: 1}, {value: 2});
    logger.emergency("inspect some data here", {data: 1}, {value: 2});
} catch(error: any) {
    logger.error("something wrong with error", error.message);
} finally {
    logger.error("finally in error color");
}
