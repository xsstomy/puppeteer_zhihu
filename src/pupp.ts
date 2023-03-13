import puppeteer, { Browser, BrowserContext } from "puppeteer";
class Pupp {
    public async initBrowser(browserUrl?: string): Promise<Browser> {
        const executablePath = browserUrl || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 100,
            args: [
                '–no-sandbox',
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

    public async initContext(browser: Browser): Promise<BrowserContext> {
        return await browser.createIncognitoBrowserContext();
    }

    public async goto(url: string, browser: BrowserContext) {
        const pages = await browser.pages();
        const page = pages[0];
        await page.goto(url);
        return page;
    }
}

export default new Pupp();