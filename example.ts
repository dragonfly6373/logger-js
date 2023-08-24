import Logger from './index';

Logger.config({
    level: 4,
    isWriteToFile: false,
    logDir: "/var/log/appname",
    timeIncluded: true
});
const logger = new Logger('Server');

try {
    logger.info("some info message");
    logger.warn("this is warning message", {data: 1});
    logger.debug("inspect some data here", {data: 1}, {value: 2});
} catch(error: any) {
    logger.error("something wrong with error", error.message);
} finally {
    logger.error("finally in error color");
}
