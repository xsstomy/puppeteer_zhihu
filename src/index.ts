import { Page } from "puppeteer";
import schedule from "node-schedule";
import zhihu from './zhihu';
import config from './config';
import util from "./util";
const log = console.log.bind(console);
import dayjs from 'dayjs';
import pupp from './pupp';

// schedule.scheduleJob('0 */30 * * * *', async () => {
//     if (!page) return;

//     const isAfter = dayjs().isAfter(dayjs().hour(8).minute(0).second(0));
//     const isBefore = dayjs().isBefore(dayjs().hour(23).minute(59).second(59));
//     if (!isAfter || !isBefore) return;
//     const title = await page.title();
//     log(title);
//     if (title.match(/[1-9]+/g)) {
//         await util.sendMsg(title);
//     }
// });

let page: Page | null = null;

(async () => {
    const userInfo = {
        name: config.name,
        psd: config.psd,
    }
    const browser = await pupp.initBrowser();
    const context = await pupp.initContext(browser);
    await zhihu.onLogin(userInfo, context)
    // page = await zhihu.goto(config.infoUrl, context);
    const pages = await context.pages();
    page = pages[0];
    const title = await page.title();
    log(title);
})();

