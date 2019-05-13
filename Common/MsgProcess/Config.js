let EVN = cc.Enum({
    debug : 1,
    online : 2,
})

let config = {
    // 网络请求地址
    // requstUrl : "http://192.168.1.231:14001/",
    // requstUrl : "http://192.168.1.233:14001/",
    // requstUrl : "https://vdgames.vdongchina.com/LG/",
    // requstUrl : "https://vd-game.vdongchina.com/p1/",
    requstUrl : "https://vd-game.vdongchina.com/LG/",
    // requstUrl : "https://test-lg.vdongchina.com/LG/",
    // requstUrl : "https://vdgames.vdongchina.com/LG-stable/",

    // 客户端版本号
    clientVersion : "1.2",

    // 环境
    evn : EVN.online,

    // 默认客户端配置
    clientCfg : "{\"previewVersion\":\"0.0\",\"online\":{\"moreGame\":1,\"share\":1,\"convert\":1,\"rule\":1},\"preview\":{\"moreGame\":0,\"share\":0,\"convert\":0,\"rule\":0}}",
}

let method = {
    parseClientCfg(data) {
        // console.log("版本====>", data);
        data = JSON.parse(data);
        let version = data.previewVersion;
        if (version === config.clientVersion) {
            // console.log('预览', data.preview);
            return data.preview;
        } else {
            // console.log('线上', data.online);
            return data.online;
        }
    },

    loadTexture(data, key) {
        let url_ = data[key];
        if (url_) {
            let cut = url_.split(".");
            cc.loader.load({url: url_, type: cut[cut.length - 1]}, (err, texture) => {
                if (err) return;
            })
        }
    },
}

module.exports = {
    EVN : EVN,
    Config : config,
    Method : method,
}