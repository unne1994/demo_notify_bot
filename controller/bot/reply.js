const https = require("https");

function replyMessage(myReplyToken, myMessages) {
    // let myType = req.body.events[0].type;
    let myType = 'message';
    // If the user sends a message to your bot, send a reply message
    if (myType === "message") {
        // Message data, must be stringified
        const dataString = JSON.stringify({
            replyToken: myReplyToken,
            messages: [myMessages],
        })

        // Request header
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + process.env.strange_bot_Channel_access_token

        }

        // Options to pass into the request
        const webhookOptions = {
            "hostname": "api.line.me",
            "path": "/v2/bot/message/reply",
            "method": "POST",
            "headers": headers,
            "body": dataString
        }

        // console.log(webhookOptions);

        // Define request
        const request = https.request(webhookOptions, (res) => {
            res.on("data", (d) => {
                process.stdout.write(d)
            })
        })

        // Handle error
        request.on("error", (err) => {
            console.error(err)
        })

        // Send data
        request.write(dataString)

        request.end();

    }
}

module.exports = {
    replyMessage
};