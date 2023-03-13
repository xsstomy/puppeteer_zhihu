import puppeteer, { Page, Browser, BrowserContext } from "puppeteer";

const log = console.log.bind(console);

const onLogin = async (userInfo: { name: string, psd: string }, context: BrowserContext) => {
    const page = await context.newPage();
    const isLogined = await page.$("div[class='AppHeader-profile']");
    if (!isLogined) {
        log("未登录");
        await page.goto("https://www.zhihu.com/signin?next=%2F", { waitUntil: 'networkidle2' });

        const countMode = await page.waitForSelector("div[class='SignFlow-tab']");
        if (!countMode) return;
        await countMode.click();
        await page.type("input[name='username']", userInfo.name);
        await page.type("input[name='password']", userInfo.psd);
        // await page.click("button.SignFlow-submitButton");
        await Promise.all([
            page.click("button.SignFlow-submitButton"),
            page.waitForNavigation()
        ]);
    } else {
        log("已经登录");
    }
    log("登录成功");
    return page;
}

export default {
    onLogin
}