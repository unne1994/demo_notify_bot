function getConfigs(mode) {
    let configs = {};

    switch (mode) {
        case 'debug':

            // 怪怪的 notify
            configs.lineBotNotify = process.env.strange_token_notify;

             // 怪怪的 bot
          // // configs.lineBotChannel_ID = process.env.bot_Channel_ID;
            // configs.lineBotChannel_secret = process.env.strange_bot_Channel_secret;
            // configs.lineBotChannel_access_token = process.env.strange_bot_Channel_access_token;

            return configs;

        case 'production':
           
            return ;

        default:
            console.log('use undefined mode type !!!');
            break;
    }
}
module.exports = {
    getConfigs
};