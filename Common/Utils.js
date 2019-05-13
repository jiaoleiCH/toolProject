//app工具类
// import BigNum from "BigNum";

let Utils = {};

/**
 * 大数运算
 * */
// Utils.BigNum = BigNum;

Utils.playAudio = function(file, callback, is_bgm = false, isLoop=false, volume=1) {
    cc.loader.loadRes('audio/' + file, cc.AudioClip, (err, clip) => {
        if(err) return null;
        if (is_bgm) {
            let id = cc.audioEngine.playMusic(clip,isLoop);
            if (callback) {
                callback(id);
            }
        }else {
            let id = cc.audioEngine.playEffect(clip,isLoop);
            if (callback) {
                callback(id);
            }
        }
    })
},

Utils.pauseMusic = function (musicId) {
    cc.audioEngine.pauseMusic(musicId);
}

Utils.resumeMusic = function (musicId) {
    cc.audioEngine.resumeMusic(musicId);
}

Utils.stopMusic = function (musicId) {
    cc.audioEngine.stopMusic(musicId);
}

Utils.stop = function( musicId ){
    cc.audioEngine.stop(musicId)
}

Utils.resumeMusic = function( musicId ){
    cc.audioEngine.resume( musicId )
}

Utils.pauseMusic = function( musicId ){
    cc.audioEngine.pause(musicId);
}

Utils.formatSeconds = function(value) {
    let result = parseInt(value);
    let h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
    let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
    return {h:h,m:m,s:s};
}

let coinA = ['','K','M','G','T','P','E','B','Q','R','S','N','V','Y','D','C','X','A','W','I','O','J','L','Z','U','H','F','Zk','Zm','Zg','Zt','Zp','Ze','Zb','Zq','Zr','Zs','Zn','Zv','Zy','Zd','Zc','Zx','Za','Zw','Zi','Zo','Zj','Zl','Zz','Zu','Zh','Zf','ZK','ZM','ZG','ZT','ZP','ZE','ZB','ZQ','ZR','ZS','ZN','ZV','ZY','ZD','ZC'];

// Utils.bytesToSize = function (bytes,signList=coinA) {
//     if (bytes == 0) return '0';
//     var k = 1000,
//     i = Math.floor(Math.log(bytes) / Math.log(k));
//     let bit = bytes.length >=3 ? 3 : bytes.length;
//     let num = (bytes / Math.pow(k, i)).toPrecision(bit);
//     let result = (Utils.BigNum.isLessThan(num,'1000') ? Utils.BigNum.toFixed(num,0) : Utils.BigNum.toFixed(num,2) ) + signList[i];
//     return result;
// }

/*
    * warn
    * 存储的key值可以是数字也可以是 字符串 ,, 但是 数字的 1 和 字符串的 '1' 多存储的内容是一样的
    */
Utils.setLocalData = function(key,data) {
    if(!key || data === null) cc.error('setLocalData error | data or key is not null');
    cc.sys.localStorage.setItem(key,data);
}

Utils.getLocalData = function(key) {
    if(!key) cc.error('getLocalData error | data or key is not null');
    return cc.sys.localStorage.getItem(key);
}

Utils.removeLocalData = function(key) {
    if(!key) cc.error('removeLocalData error | data or key is not null');
    cc.sys.localStorage.removeItem(key);
}

/*
ej:
    VDUtils.cprVersion('1.0.2','1.0.1') => -1
    VDUtils.cprVersion('1.0.2','1.0.2') => 0
    VDUtils.cprVersion('1.0.3','1.0.15') => -1
    VDUtils.cprVersion('1.0.30','1.1.03') => 1
    VDUtils.cprVersion('0.2','0.1') => 1
**/
Utils.cprVersion = function(ver1,ver2) {
    function toNum(a) {
        var a = a.toString();
        //也可以这样写 var c=a.split(/\./);
        var c = a.split('.');
        var r = ["0000", "000", "00", "0", ""];
        for (var i = 0; i < c.length; i++) {
          var len = c[i].length;
          c[i] = r[len] + c[i];
        }
        var res = c.join('');
        return res;
    }
    var _a = toNum(ver1), _b = toNum(ver2);
    if (_a == _b) return 0;
    if (_a > _b) return -1;
    if (_a < _b) return 1;
}

Utils.random0To1 = function() {
    let num = Math.random();
    if(num >= 0.99) {
        num = 1;
    }
    return num;
}

Utils.randomMinus1To1 = function() {
    return 2 * (Math.random() - .5);
}

Utils.random = function(min,max) {
    return Math.round((max-min) * Math.random() + min);
},

/**
* 产生一个区间[start,end]的随机整数
*/
Utils.randint = function (start, end) {
       return Math.floor(start + (end-start+1)*Math.random());
}

Utils.toFixed = function(number,fractionDigits){
    var times = Math.pow(10, fractionDigits);
    var roundNum = Math.round(number * times) / times;
    return roundNum.toFixed(fractionDigits);
}

//权重概率
Utils.weightRandom = function (weight_json) {
    var weight = 0;
    weight_json.forEach(val => {
        weight += val.weight;
    })
    var rand = Utils.randint(0, weight - 1);
    for (var i = 0; i < weight_json.length; i++) {
        if (rand < weight_json[i].weight) {
            var reward = weight_json[i];
            break;
        }
        rand -= weight_json[i].weight;
    }
    reward = reward == undefined ? 0 : reward;

    return  reward;
},

Utils.moveToBarn = function (node, ep, cb) {
    ep = node.parent.convertToNodeSpaceAR(ep);
    let sp = node.position;
    let diff_value = ep.sub(sp);
    let randX = Utils.random(-200, 200);
    let randY = Utils.random(1.5, 5);
    let ctrl_1 = {
        x : sp.x + randX,
        y : sp.y + diff_value.y / randY
    }
    Tween.to(node, 0.5, {
        bezier:[{x : sp.x, y : sp.y}, ctrl_1, {x : ep.x, y : ep.y}],
        onComplete : () => {
            cb ? cb() : null;
        }
    });
},

Utils.shuffle = function (arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        var index = parseInt(Math.random() * (len - i));
        var temp = arr[index];
        arr[index] = arr[len - i - 1];
        arr[len - i - 1] = temp;
    }
    return arr;
}

Utils.secondToDate = function (result) {
    // var h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
    var m = Math.floor((result / 60 )) < 10 ? '0' + Math.floor((result / 60)) : Math.floor((result / 60 ));
    var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
    return result =  m + ":" + s;
    // return result = h + ":" + m + ":" + s;
}

Utils.copyTabe = function(tb) {
    var new_tb = {};
    for(var key in tb) {
        if(typeof tb[key] != "object") {
            new_tb[key] = tb[key];
        } else {
            new_tb[key] = Utils.copyTabe(tb[key]);
        }
    }
    return new_tb;
}

/**
* 修复了 调用方式跟之前的一样
* fix1: 保证所有的元素都可以放的下
* fix2: 保证最后重复的两行元素不重复问题
*  
* author： vker
*/

let _colIndexList = null;
let _existsConfigList = [];
let maxPlaceLineNum = 0;
Utils.randomBall = function(lineNum, colIndex, colNum, config) {
   maxPlaceLineNum = Math.ceil(config.setpLineMaxBall / config.sameLineMaxBall);
   function _randomN2M(n, m) {
       return Math.round(n + (Math.random() * 10 / 10) * (m-n));
   }

   function _init() {
       config.curSpecialBall = 0;
       _existsConfigList = [];
       _colIndexList = [];
   }

   function _init2() {
       if(!config.alreadyBuildBallsFlag) {
           config.alreadyBuildBalls = 0;
           colIndexList = [];
           config.alreadyBuildBallsFlag = true;
       }
   }

   function getActualLineNum() {
       return (lineNum - config.minLine)+1;
   }

   function getLineIndex() {
       let num = getActualLineNum() % config.stepLineNum
       return num == 0 ? config.stepLineNum : num;
   }

   function getColIndexList() {
       let tmpList = [],tmpList2 = [];
       for(let i=1; i<=colNum; i++) {
           if(!_colIndexList[i]) {
               _colIndexList[i] = true;
               tmpList.push(i);
           }
           tmpList2.push(false);
       }
       tmpList.sort((a,b) => {return Math.random()>.5});
   
       let resList = tmpList.splice(0, Math.min(tmpList.length, config.sameLineMaxBall));
       resList.forEach(val => {
           tmpList2[val] = true;
       });
       _existsConfigList[config.name] = tmpList2;
       return resList;
   }

   if(lineNum < config.minLine) {
       return false;
   }

   if( getLineIndex() == 1) {
       _init2();
   }

   if( getLineIndex() == 2) {
       config.alreadyBuildBallsFlag = false;
   }
   let colIndexList = colIndexList || [];

   if(lineNum != config.lastLineNum) {
       _init();
       config.lastLineNum = lineNum
   }

   let flag1 = _randomN2M(1,100) < (1 - config.curSpecialBall / config.sameLineMaxBall) * 100;
   let flag2 = _randomN2M(1,100) < (1 - config.alreadyBuildBalls / config.setpLineMaxBall) * 100;
   let flag3 = _randomN2M(1,100) < 50;

   let flag4 = (config.alreadyBuildBalls < config.setpLineMaxBall && config.stepLineNum - (getLineIndex()-1) <= maxPlaceLineNum);
   flag4 && lineNum != config.lastLineNum && !_existsConfigList[config.name] ? colIndexList = getColIndexList() : null;
   !_existsConfigList[config.name] ? null : colIndexList = _existsConfigList[config.name];
   let flag5 = colIndexList[colIndex];
   
   let result = flag4 && flag5 || (flag1 && flag2 && flag3);
   if(result) {
       config.curSpecialBall++;
       config.alreadyBuildBalls++;
   }
   return result;
}

module.exports = Utils;