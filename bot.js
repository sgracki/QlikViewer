const VR_URL = `https://www.qlik.com/`;

var def = (data, done) => {
    data.tools.sendText("Serwus B) Chciałbyś coś wiedzieć o obiekcie w pobliżu Ciebie?", {}, [{
        "content_type":"location"
    }]);
};

var sendVrBtn = (data, payload) => {
    data.tools.sendVerticalText("Znalazłem trochę informacji o obiektach wokół Ciebie <3 zlurkuj sobie, niezły odlot ✈️", {}, [{
        title: "Zobacz!",
        type: "web_url",
        url: `${VR_URL}`,
        messenger_extensions: true
    }]);
};

var handleLocation = (data, attachments) => {
    sendVrBtn(data, {lat:attachments[0].payload.coordinates.lat, lng: attachments[0].payload.coordinates.long});
};

exports.Menu = (data, done) => {
    var newOptions = {
    	"whitelisted_domains": [
    		"https://www.qlik.com/"
    	],
    	"get_started": {
    		"payload": "default"
    	}
    };
    
    data.tools.sendFBPost("me/messenger_profile",newOptions);
    done(data);
};

exports.MyStart = (data, done) => {
    data.tools.sendTyping();
    data.triggerPayload("default", def);
    data.triggerPayload("geo", handleLocation);
    data.doTrigger(data);
    done(data);
};
exports.MyEnd = (data, done) => {
    data.finishCallback(data);
    done(data);
};