import got from 'got';
const log = console.log.bind(console);
import config from './config';
const sendMsg = async (msg: string) => {
    const strContent = encodeURI(`${msg}`);
    try {
        const titleContent = encodeURI("知乎");
        const apiUrl = `${config.msgToWXUrl}?title=${titleContent}&desp=${strContent}`;
        await got.get(apiUrl);
    } catch (e) {
        log(`消息推送失败${e}`);
    }
};

export default {
    sendMsg,
}