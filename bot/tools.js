class Tools {
    constructor(FB_ACCESS_TOKEN, event) {
        this.FB_ACCESS_TOKEN = FB_ACCESS_TOKEN;
        this.event = event;
    }

    sendBtnTemplate = (msg) => {
        return new Promise((resolve, reject) => {
            var message = {
                "attachment":{
                    "type":"template",
                    "payload":{
                        "template_type":"button",
                        "text": msg.text,
                        "buttons": msg.buttons
                    }
                }
            };
    
            request({
                url: 'https://graph.facebook.com/v2.6/me/messages',
                qs: { access_token: this.FB_ACCESS_TOKEN },
                method: 'POST',
                json: {
                    recipient: { id: this.event.sender.id },
                    message: message,
                }
            }, function (error, response, body) {
                if (error) {
                    reject(error);
                } else if (response.body.error) {
                    reject(response.body.error);
                } else {
                    resolve(body);
                }
            });
        })
    }

    sendQrTemplate = (msg) => {
        return new Promise((resolve, reject) => {
            var message = {
                "text": msg.text,
                "quick_replies": msg.qrs
            };
    
            request({
                url: 'https://graph.facebook.com/v2.6/me/messages',
                qs: { access_token: this.FB_ACCESS_TOKEN },
                method: 'POST',
                json: {
                    recipient: { id: this.event.sender.id },
                    message: message,
                }
            }, function (error, response, body) {
                if (error) {
                    reject(error);
                } else if (response.body.error) {
                    reject(response.body.error);
                } else {
                    resolve(body);
                }
            });
        })
    }
}

module.exports = Tools;