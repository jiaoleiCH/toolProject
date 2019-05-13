const excel = require('node-xlsx');
var fs = require('fs');
var list = excel.parse("HeroList.xlsx");

praseExcel(list);
//解析Excel
function praseExcel(list)
{
    console.log("list",list);
    for (var i = 0; i < list.length; i++) 
    {
         var excleData = list[i].data;
         var sheetArray  = [];
         var typeArray =  excleData[1];
         var keyArray =  excleData[2];
        for (var j = 3; j < excleData.length ; j++)
        {
             var curData = excleData[j];
             if(curData.length == 0) continue;
             var item = changeObj(curData,typeArray,keyArray);
             sheetArray.push(item);
        }
        if(sheetArray.length >0) 
        writeFile(list[i].name+".json",JSON.stringify(sheetArray));
    }
}
//转换数据类型
function changeObj(curData,typeArray,keyArray)
{
    var obj = {};
    for (var i = 0; i < typeArray.length; i++) 
    {  
        obj[keyArray[i]] = changeValue(curData[i],typeArray[i]); 
    }
    lvPandect(obj,"coinList");
    lvAtk(obj,"atkList");
    secondLvCoin(obj,"coinList");
    secondAtk(obj,"atkList");
    return obj;
}


function changeValue(value,type)
{
    if(value == null || value =="null") 
    return null
    if(type =="int") return Math.floor(value);
    if(type =="number") return value;
    if(type =="string") return value;  
}

function writeFile(fileName,data)
{  
  fs.writeFile(fileName,data,'utf-8',complete);
  function complete(err)
  {
      if(!err)
      {
          console.log("文件生成成功");
      }   
  } 
}

// 名称插入 点击英雄等级金币
function lvPandect(keyArray,keyName)
{
    if (keyArray[keyName] != null &&  keyArray["AtkType"] ==1 )
    {
       keyArray[keyName]=clickHeroLvCoin(keyArray["MaxLv"],keyArray["coinList"]);
    }
}

//名称插入  秒伤英雄等级金币
function secondLvCoin(keyArray,keyName)
{
    if (keyArray[keyName] != null &&  keyArray["AtkType"] ==2)
    {
       keyArray[keyName]=secondHeroLvCoin(keyArray["MaxLv"],keyArray["coinList"],keyArray["id"]);
    }
}

//名称插入 点击英雄等级攻击
function lvAtk(keyArray,keyName)
{
    if (keyArray[keyName] != null)
    {
        if(keyArray["id"] == 1)
        {
            keyArray[keyName]=clickHeroLvHarm(keyArray["MaxLv"],keyArray["atkList"]);
        }
    }
}


//名称插入 秒伤英雄等级攻击
function secondAtk(keyArray,keyName)
{
    if (keyArray[keyName] != null)
    {
        if(keyArray["AtkType"] == 2)
        {
            keyArray["atkList"] = secondHeroLvHarm(keyArray["MaxLv"],keyArray["id"],keyArray["atkList"]);
        }
    }
}

//点击所有等级金币
//LV  等级                       
//initialCion 初始金币   
function clickHeroLvCoin(maxlv,initialCoin)
{ 
    var localCoin = initialCoin;
    var lvcalLvCoin = [];
    for(var i = 1 ; i <= maxlv; i++ )
    {
        if(i != 1)
        {
            localCoin = localCoin + i*2
            lvcalLvCoin[i-1] = Math.floor(localCoin);
        }
        else
        {
            lvcalLvCoin[i-1] = localCoin;
        }
    }
    return lvcalLvCoin;
}

//秒伤所有等级金币
//LV  等级  
//initialCion 初始金币
//id 当前ID
function secondHeroLvCoin(maxlv,initialCoin,id)
{
    var localCoin = initialCoin;
    var lvcalLvCoin = [];
    for(var i = 1 ; i <= maxlv; i++ )
    {
        if(i != 1)
        {
            localCoin = localCoin + 20*maxlv*Math.pow(3,id-1)*Math.pow(2, Math.ceil(i/10))*0.8;
            lvcalLvCoin[i-1] = Math.floor(localCoin);
        }
        else
        {
            lvcalLvCoin[i-1] = localCoin;
        }
    }
    return lvcalLvCoin;
}


//点击所有等级攻击力
function clickHeroLvHarm(maxlv,basisAtk)
{
    var localatk = basisAtk;
    var lvcalLvatk = [];
    for(var i = 1 ; i <= maxlv; i++)
    {
        if(i != 1)
        {
            localatk = 1*Math.pow(2, Math.ceil(i/10))+localatk;
            lvcalLvatk[i-1] = Math.floor(localatk);
        }
        else
        {
            lvcalLvatk[i-1] = localatk;
        }   
    }
    return lvcalLvatk;
}


//秒伤所有等级攻击力
function secondHeroLvHarm(maxlv,id,initialAtk)
{
    var localatk = initialAtk;
    var lvcalLvatk = [];
    for(var i = 1 ; i <= maxlv; i++)
    {
        if(i != 1)
        {
            localatk= Math.pow(3,id-1)*Math.pow(2, Math.ceil(i/10))+localatk;
            lvcalLvatk[i-1] = Math.floor(localatk);
        }
        else
        {
            lvcalLvatk[i-1] = localatk; 
        }   
    }
    return lvcalLvatk;
}
