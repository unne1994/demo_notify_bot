const main = require('../controller/notify/Main.js');


function sendMessageType(useType, configs, form) {
    switch (useType) {
        case 'onceNotify':
            if (process.env.mode === 'debug') {
                if (form === undefined || form === '') {
                    // 單次 內容隨機
                    main.setUp('', configs.lineBotNotify);
                } else {
                    // 單次 內容由外部帶入
                    main.setUp(form, configs.lineBotNotify);
                }
            } else {
                main.setUp(form, configs.lineBotNotify);
            }
            break;

        case 'bot':

            break;

        case 'schedule':
            break;

        default:
            console.log('use undefined sendMessageType !!!');
            break;
    }
}


module.exports = {
    sendMessageType
};