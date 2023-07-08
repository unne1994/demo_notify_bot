function message(message) {
    return {
        "type": "text",
        "text": message
    }
}


function Carousel() {
    return {
        "type": "template",
        "altText": "this is a carousel template",
        "template": {
            "type": "carousel",
            "columns": [
                {
                    "thumbnailImageUrl": "https://file-examples-com.github.io/uploads/2017/10/file_example_PNG_500kB.png",
                    "imageBackgroundColor": "#FFFFFF",
                    "title": "this is menu",
                    "text": "description",
                    "defaultAction": {
                        "type": "uri",
                        "label": "View detail",
                        "uri": "http://example.com/page/123"
                    },
                    "actions": [
                        {
                            "type": "postback",
                            "label": "Buy",
                            "data": "action=buy&itemid=111"
                        },
                        {
                            "type": "postback",
                            "label": "Add to cart",
                            "data": "action=add&itemid=111"
                        },
                        {
                            "type": "uri",
                            "label": "View detail",
                            "uri": "http://example.com/page/111"
                        }
                    ]
                },
                {
                    "thumbnailImageUrl": "https://www.steamxo.com/wp-content/uploads/2019/04/5C11Ex230610_611159.jpg",
                    "imageBackgroundColor": "#000000",
                    "title": "this is menu",
                    "text": "description",
                    "defaultAction": {
                        "type": "uri",
                        "label": "View detail",
                        "uri": "http://example.com/page/222"
                    },
                    "actions": [
                        {
                            "type": "postback",
                            "label": "Buy",
                            "data": "action=buy&itemid=222"
                        },
                        {
                            "type": "postback",
                            "label": "Add to cart",
                            "data": "action=add&itemid=222"
                        },
                        {
                            "type": "uri",
                            "label": "View detail",
                            "uri": "http://example.com/page/222"
                        }
                    ]
                }
            ],
            "imageAspectRatio": "rectangle",

            // cover (Default) 只顯示部分圖片區域，但填滿整個圖片空間
            // contain 顯示全部圖片，但不保證填滿圖片空間
            "imageSize": "contain"
        }
    }
}


module.exports = {
    message,
    Carousel
};