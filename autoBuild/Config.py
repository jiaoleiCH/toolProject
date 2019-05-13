#! python2
# coding: utf-8

import os

__all__ = ['Data','Build','Build_SubDomain']

Data = {
	'CreaterPath': r'G:\CocosCreator', # r'G:\CocosCreator' | 'G:\\CocosCreator'
	'projPath': r'D:\pro\creator_pro\test', # 工程的路径
	'subDomainProjPath': r'D:\pro\creator_pro\test', # 子域工程路径
	'wechatGameDevToolsPath': r'G:\微信web开发者工具', # 微信开发工具的路径
	'upload': {
		# 长传资源时 配置
		'version': '1.0.0',
		'desc': 'auto upload',
	},
	'cp_res':['btn_start.png']
}

'''
其他没写注释都保持默认就行了
'''
Build = {
	"appKey": "",
	"appSecret": "",
  	"encryptJs": True,
  	# 不参与构建的场景
	"excludeScenes": [
		"564cd7f4-ec9a-4831-b3e0-8f264a87ca8b"
	],
	# 是否开启 MD5
	"md5Cache": True,
	"inlineSpriteFrames": True,
	"inlineSpriteFrames_native": True,
	# 工程的名字
	"title": "test",
	# 构建路径
	"buildPath": os.path.join(Data['projPath'],'build'),
	# 启动场景
	"startScene": "3ae94eb1-0e6b-4f01-8970-d509475ef2a6",
	# 微信小游戏的配置
	"wechatgame": {
		# 服务器地址
    	"REMOTE_SERVER_ROOT": "",
    	"appid": "wx3262ed5e9446416c",
    	# 是否是子域
    	"isSubdomain": False,
    	# 横屏(landscape) 还是 竖屏(portrait)
    	"orientation": "landscape",
    	# 子域的名字
    	"subContext": ""
  	},

	"fb-instant-games": {},
  	"includeAnySDK": False,
	"includeSDKBox": False,
	"jailbreakPlatform": False,
	"mergeStartScene": False,
	"oauthLoginServer": "",
	"optimizeHotUpdate": False,
	"orientation": {
		"landscapeLeft": True,
		"landscapeRight": True,
		"portrait": False,
		"upsideDown": False
	},
  	"packageName": "org.cocos2d.test",
  	"privateKey": "",
  	"qqplay": {
    	"REMOTE_SERVER_ROOT": "",
    	"orientation": "portrait"
  	},
  	
  	"webOrientation": "auto",
  	"xxteaKey": "b0fbc740-7e59-42",
  	"zipCompressJs": True
}

Build_SubDomain = {
	"appKey": "",
	"appSecret": "",
  	"encryptJs": True,
  	# 不参与构建的场景
	"excludeScenes": [
		"564cd7f4-ec9a-4831-b3e0-8f264a87ca8b"
	],
	# 是否开启 MD5
	"md5Cache": True,
	"inlineSpriteFrames": True,
	"inlineSpriteFrames_native": True,
	# 工程的名字
	"title": "subPackage",
	# 构建路径
	"buildPath": os.path.join(Data['subDomainProjPath'],'build'),
	# 启动场景
	"startScene": "3ae94eb1-0e6b-4f01-8970-d509475ef2a6",
	# 微信小游戏的配置
	"wechatgame": {
		# 服务器地址
    	"REMOTE_SERVER_ROOT": "",
    	"appid": "wx3262ed5e9446416c",
    	# 是否是子域
    	"isSubdomain": True,
    	# 横屏(landscape) 还是 竖屏(portrait)
    	"orientation": "landscape",
    	# 子域的名字
    	"subContext": ""
  	},

	"fb-instant-games": {},
  	"includeAnySDK": False,
	"includeSDKBox": False,
	"jailbreakPlatform": False,
	"mergeStartScene": False,
	"oauthLoginServer": "",
	"optimizeHotUpdate": False,
	"orientation": {
		"landscapeLeft": True,
		"landscapeRight": True,
		"portrait": False,
		"upsideDown": False
	},
  	"packageName": "org.cocos2d.test",
  	"privateKey": "",
  	"qqplay": {
    	"REMOTE_SERVER_ROOT": "",
    	"orientation": "portrait"
  	},
  	
  	"webOrientation": "auto",
  	"xxteaKey": "b0fbc740-7e59-42",
  	"zipCompressJs": True
}