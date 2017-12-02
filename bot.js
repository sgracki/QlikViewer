const VR_URL = `https://wandlee.com/qlikathondemo/`;

var def = (data, done) => {
    data.tools.sendText("Serwus B) Chciałbyś coś wiedzieć o obiekcie w pobliżu Ciebie?", {}, [{
        "content_type":"location"
    }]);
};

var sendVrBtn = (data, payload) => {
    var url = `${VR_URL}?lat=${payload.lat}&lon=${payload.lon}`;
    console.log(url);
    data.tools.sendText("Znalazłem trochę informacji o obiektach wokół Ciebie <3 zlurkuj sobie, niezły odlot ✈️", {}, [], () => {
        data.tools.sendOptions({
            "template_type":"generic",
            "elements":[{
                "title":"Wizualizacja VR qlik",
                "image_url":"https://www.qlik.com/us/-/media/images/qlik/global/qlik-logo-2x.png",
                "subtitle":"Informacje o obiektach blisko Ciebie",
                "buttons":[{
                    "type":"web_url",
                    "url": url,
                    "title":"Tak, pokaż!"
                },{
                    "type":"element_share"
                }]
            }]
        });
    });
};

var handleLocation = (data, attachments) => {
    try {
        sendVrBtn(data, {lat:attachments[0].payload.coordinates.lat, lon: attachments[0].payload.coordinates.long});
    } catch(e) {
        
    }
    
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