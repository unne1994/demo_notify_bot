const messageStyle = require("../MessageStyle.js");

// notify
let notifySchema = {
    Message: '',
    imgUrl: '',
    stickerPackageid: '',
    stickerid: ''
}

let botSchemaText = {
    'type': 'text',
    'text': ''
}

let finalSchema = {
    dataType: "",
    data: ""
}


function message(messageType, messageData) {
    finalSchema.dataType = messageType;
    finalSchema.data = messageData;
    return finalSchema;
}
// ==========================================
// user input room
function userInput(usrMessage) {
    switch (usrMessage) {
        case '通知':
            let schema = getSchema('notify');
            schema.data.Message = '通知回應囉!';
            return schema;

        default:
            console.log('use undefined usrMessage type !!!');
            let defaultData = getSchema('bot');
            defaultData.data.text = 'bot回應!';
            console.log(defaultData)
            return defaultData;
    }
}

function getSchema(type) {
    switch (type) {
        case 'notify':
            return message('messages', notifySchema);
            break;

        case 'bot':
            console.log('use undefined method type 用bot回覆!!!');
            return message('bot', botSchemaText);
        default:
            console.log('use undefined getSchema type !!!');
            break;

    }
}


module.exports = {
    userInput
};
