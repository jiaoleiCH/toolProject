//对象池

let config = {
    //gold: "gold",
    rule_item : "rule_item",
    case_item : "case_item",
}


let prefabInfos = [
    //{name:config.gold,path:'prefab/gold',prefab:null,pool:new cc.NodePool()},
    {name:config.rule_item,path:'prefab/rule_item',prefab:null,pool:new cc.NodePool()},
    {name:config.case_item,path:'prefab/case_item',prefab:null,pool:new cc.NodePool()},
];

let PreLoadPrefabs = {};


function preLoadPrefabs(arr,cb){
    let count = arr.length;
    if(count == 0) return cb(null);
    arr.forEach(function(prefabInfo) {
        cc.loader.loadRes(prefabInfo.path,(error,prefab)=>{
            if(!error){
                prefabInfo.prefab = prefab;
                PreLoadPrefabs[prefabInfo.name] = prefabInfo;
                --count;
                if(count==0){
                    cb(null);
                }
            }else{
                cb(error);
            }
        });
    }, this);
}

let NodeCache = {};
function GetNodeFromPool(pool,prefab){
    let node = null;
    if (pool.size() > 0) { 
        node = pool.get();
    } else {
        node = cc.instantiate(prefab);
    }
    return node
}


function PutNodeToPool(pool,node){
    pool.put(node);
}
function GetNodeByType(typeName){
    let node = GetNodeFromPool(PreLoadPrefabs[typeName].pool,PreLoadPrefabs[typeName].prefab);
    node.typeName = typeName;
    return node;
}

function PutNode(node){
    let typeName = node.typeName;
    PutNodeToPool(PreLoadPrefabs[typeName].pool,node);
}

function preload(cb) {//循环引用的预制体不能同时加载 要有先后顺序
    preLoadPrefabs(prefabInfos,cb);
}


NodeCache.PutNode = PutNode;
NodeCache.GetNodeByType = GetNodeByType;
NodeCache.Config = config;
NodeCache.Preload = preload;

export default NodeCache;