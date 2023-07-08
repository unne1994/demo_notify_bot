const config = require("../configs/config.js");
const sendType = require("./SendType");
const main = require('../controller/notify/Main.js');
const GetPicture = require('../utils/GetPicture');
const Sleep = require('../utils/Sleep');

async function appMain(useType, countCall) {

    console.log(`will start:`, useType);

    const mode = process.env.mode;

    console.log(`processMode: ${mode}`);

    const configs = config.getConfigs(mode);

    switch (useType) {
        case 'onceNotify':
            // 隨機內容
            // sendType.sendMessageType(useType, configs);

            // 自訂內容
            // const myMessage = '你好啊 QQ';
            // const imgUrl = 'https://www.crazybless.com/good-morning/morning/image/%E6%97%A9%E5%AE%89%E5%9C%96%E4%B8%8B%E8%BC%89%20(1290).jpg';
            // const stickerPackageid = '446';
            // const stickerid = '2004';
            // const form = main.NotifyMessage(myMessage, imgUrl, stickerPackageid, stickerid);
            // sendType.sendMessageType(useType, configs, form);
            
            break;


        case 'onceNotify_morning':

            if (countCall >= 5){
                const form = main.NotifyMessage(`*注意 爬蟲失敗 ${countCall}次 停止繼續!`, '', '', '');
                sendType.sendMessageType(useType, configs, form);
                return;
            }

            let myMessage2 = '你好優!!';
            let imgUrl2 ='https://www.pinterest.com/lu869/?eq=%E6%97%A90%E5%9C%96&etslf=6002'
            
            imgUrl2 = await GetPicture.getData(imgUrl2,'');

            if (imgUrl2 === undefined){
                console.log(`第${countCall}次 沒東西 再重新呼叫一次 步驟1`)
                countCall += 1;
                appMain(useType, countCall);
                return;
            }
            
            const form2 = main.NotifyMessage(myMessage2, imgUrl2);
            
            sendType.sendMessageType('onceNotify', configs, form2);

        break;

        case 'bot':
            break;

        case 'schedule':
            break;

        default:
            break;
    }
}


module.exports = {
    appMain
};