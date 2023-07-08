const express = require('express');
const botRouter = express.Router();;
botRouter.use(express.json());
botRouter.use(express.urlencoded({ extended: true }));
const Time = require("../../utils/Time.js");
const sendType = require("../../services/SendType.js");
const config = require("../../configs/config.js");
const main = require('../../controller/notify/Main.js');
const reply = require('../bot/reply.js');
const messageStyle = require("./MessageStyle");
const botMethod = require("./service/BotMethod.js");
const appService = require("../../services/appService.js")

botRouter.post("/bot", function (req, res) {

    // console.log(req.body);
    const events = req.body.events;

    if (events.length === 0) {
        res.send("HTTP POST request sent to the webhook URL!")
    } else {

        const def = [
            {
                "type": "notify",
                "desc": "用 notify 回覆"
            }, {
                "type": "reply",
                "desc": "用 line bot 回覆"
            }
        ]
        let useIndex = 0;
        let replyUserType = def[useIndex]['type'];
        console.log(`*預設 使用type: ${replyUserType}  ===> ${def[useIndex]['desc']}`);


        const eventsData = events[0];
        const source = eventsData.source;

        // 判斷 來源 是 個人or 群組
        const type = source['type'];
        // 所有bot 可以回傳方式
        const canUseType = receiveChats(type);

        let token = '';

        const receiveTime = Time.ConverUTC(eventsData.timestamp);

        console.log("收到訊息:");
        console.log(eventsData);
        const userMessage = eventsData.message.text;

        // 處理指令
        const resData = botMethod.userInput(userMessage);
        const resDataType = resData.dataType;
        console.log(`resDataType => ${resDataType}`)

        if (type === 'user') {
            console.log(`來源:個人(${source['type']}) 時間:${receiveTime}  userId:${source['userId']}`);

            // 測試個人
            token = process.env.ez_token2;
        } else {
            console.log(`來源:群組(${source['type']}) 時間:${receiveTime} groupId:${source['groupId']} userId:${source['userId']}`);

            if (resDataType !== 'messages') {
                useIndex = 1;
                replyUserType = def[useIndex]['type'];
                console.log(`*更改 使用type: ${def[useIndex]['type']}  ===> ${def[useIndex]['desc']}`);
            }

        }

        switch (replyUserType) {
            case 'reply':
                // reply = 用line bot 回覆
                const replyToken = eventsData.replyToken;
                console.log(`replyToken => ${replyToken}`)
                
                reply.replyMessage(replyToken, resData.data);

                break;
            case 'notify':
                // notify = 用notify 回覆
                const mode = process.env.mode;
                console.log(`回覆訊息: `, resData.data);

                appService.appMain('onceNotify_morning' , 1);

                break;

            default:
                break;
        }
    }
});


// 機器人可以接收的TYPE  (個人 以及 群組)
function receiveChats(type) {
    // console.log(type);
    const message = { 'type': 'message', 'description': '消息事件 (用戶發送了消息)' };
    const unsend = { 'type': 'unsend', 'description': '取消活動 (使用者在群聊或談話室中未發送消息)' };
    const follow = { 'type': 'follow', 'description': '關注事件 (您的LINE官方帳戶被添加為好友（或已解除封鎖）)' };
    const unfollow = { 'type': 'unfollow', 'description': '取消關注事件 您的LINE官方帳戶被封鎖' };
    const join = { 'type': 'join', 'description': '加入活動 (您的LINE官方帳戶加入了群聊或談話室)' };
    const leave = { 'type': 'leave', 'description': '離開活動 (使用者從群聊中刪除了您的LINE官方帳戶，或者LINE官方帳戶已離開群聊或談話室' };
    const memberJoined = { 'type': 'memberJoined', 'description': '會員加入活動 (使用者加入了您的LINE官方帳戶為成員的群聊或聊天室' };
    const memberLeft = { 'type': 'memberLeft', 'description': '會員離開活動 (用戶離開您的LINE官方帳戶為成員的組或談話室' };
    const postback = { 'type': 'postback', 'description': '後背事件 (直接讓 Server 收到訊息 event 不會被使用者看到指令)' };
    const videoPlayComplete = { 'type': 'videoPlayComplete', 'description': '視頻觀看完整事件 (表示使用者在從LINE官方帳戶發送的指定消息後觀看了視頻消息)' };

    switch (type) {
        case 'user':
            let one_on_one = [];
            one_on_one.push(message, follow, unfollow, postback, videoPlayComplete);
            return one_on_one;

        case 'group':
            let group = [];
            group = [message, unsend, join, leave, memberJoined, memberLeft, postback];
            return group;

        default:
            return [];
    }
}



module.exports = botRouter;