# Logger-js
write node backend log to file and console 4 different levels of logging in a specific order: 'errror', 'warn', 'info', 'debug'
# Usage
```typescript
import logger from 'logger-js';

Logger.config(appConfigs.LOGGER_CONFIGS);
const logger = new Logger('Server');

try {
    logger.info("some info messae");
    logger.warn("this is warning message", {data: 1});
    logger.debug("inspect some data here", {data: 1}, {value: 2});
} catch(error: any) {
    logger.error("something wrong with error", error.message);
}
```
# Result:
![image](https://github.com/dragonfly6373/logger-js/assets/14802379/bcbc830c-51cf-4b30-aa17-beb24a44689b)
