# puppeteer_zhihu
zhihu

# 关于被服务器检测出来使用的是 `puppeteer`,知乎报错 `10001:请求参数异常，请升级客户端后重试`
具体原因在 `puppeteer` 中`window.navigator.webdriver`是为 `true`

在初始化 `browser` 设置 `args:['--disable-blink-features=AutomationControlled']`,具体查看`zhihu.ts`文件。
        