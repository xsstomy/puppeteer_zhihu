import puppeteer, { Page, Browser } from "puppeteer";

const log = console.log.bind(console);

const init = async (options: { name: string, psd: string, url?: string }) => {
    const { name, psd } = options;
    const url = options.url || "https://www.zhihu.com";

    const browser = await initBrowser();
    const pages = await browser.pages();
    const page = pages[0];

    await page.goto(url);
    await onLogin(name, psd, page);
    return browser;
}

const initBrowser = async (browserUrl?: string) => {
    const executablePath = browserUrl || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 100,
        args: [
            '--disable-blink-features=AutomationControlled',
            "--window-size=1400,900",
        ],
        userDataDir: "./temp",
        defaultViewport: { width: 1400, height: 900 },
        dumpio: false,
        ignoreDefaultArgs: ['--enable-automation'],
        executablePath
    });
    return browser;
}

const onLogin = async (name: string, psd: string, page: Page) => {
    const isLogined = await page.$("div[class='AppHeader-profile']");
    if (!isLogined) {
        log("未登录");
        const countMode = await page.waitForSelector("div[class='SignFlow-tab']");
        if (!countMode) return;
        await countMode.click();
        await page.type("input[name='username']", name);
        await page.type("input[name='password']", psd);
        await page.click("button.SignFlow-submitButton");
    } else {
        log("已经登录");
    }

}

const goto = async (url: string, browser: Browser) => {
    const pages = await browser.pages();
    const page = pages[0];
    await page.goto(url);
    return page;
}

export default {
    init,
    goto,
}