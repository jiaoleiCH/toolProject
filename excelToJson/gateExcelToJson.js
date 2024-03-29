const excel = require('node-xlsx');
var fs = require('fs');
var list = excel.parse("gateList.xlsx");

praseExcel(list);
//解析Excel
function praseExcel(list)
{
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
             console.log("item",item);
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
    return obj;
}


function changeValue(value,type)
{
    var dataStrArr;
    var dataIntArr;
    if(value == null || value =="null") 
    return null
    if(type =="int") return Math.floor(value);
    if(type =="number") return value;
    if(type =="string") return value; 
    if(type =="int[]") 
    {
        value.toString();
        if(typeof value == "string")
        {
            dataStrArr = value.split(",");
            dataIntArr = dataStrArr.map((value)=>{
                return parseInt(value);
            })
        }
        else
        {
            dataIntArr = value;
        }
        console.log("dataIntArr",dataIntArr);
        return dataIntArr;
    }
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
