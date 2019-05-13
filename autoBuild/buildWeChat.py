#! python2
# coding: utf-8

'auto build wechat game package!!!'

__author__ = 'Ye Wei'

##import argparse
import sys, os, json, locale, shutil
import subprocess
import ConfigTemplete

Config = ConfigTemplete

os.environ['PATH'] = Config.Data['CreaterPath']+';'+os.environ['PATH'];

def _write_json_file(data):
	'''将 python 数据对象转换成json 数据格式 并写入文件'''
	data_json = json.dumps(data,sort_keys=True,indent=2)
	f = open('build_tmp.json','w+')
	f.write(data_json)
	f.close()
	return data_json


def _exec_cmd(cmd, isShell):
	'''执行命令行命令'''
	print('carry cmd is =>', cmd)
	p = subprocess.Popen(cmd,shell=isShell,stdout=subprocess.PIPE)
	# print(p.stdout.read())
	while p.poll() == None:
		ret = p.stdout.readline()[:-1]
		if ret != "":
			print(ret)

def _build_tmp_file(data_):
	'''构建临时文件'''
	data_json = _write_json_file(data_)
	print(u'临时配置文件写入成功')
	print(data_json)

def _del_tmp_file():
	'''构建临时文件'''
	if os.path.exists('build_tmp.json'):
		os.remove('build_tmp.json');
		print(u'删除构建临时文件')

def _cp_file():
	'''拷贝文件到微信小游戏的包中'''
	for file in Config.Data['cp_res']:
		file_finfish = os.path.join(("%s\\assets"%(Config.Data['projPath'])),file)
		tar_dir = os.path.join(("%s\\wechatgame"%(Config.Build['buildPath'])),'res')
		if os.path.exists(file_finfish):
			shutil.copy(file_finfish,tar_dir)

	print(u'拷贝文件成功')

def _del_main_folder():
	tar_dir = os.path.join(("%s\\wechatgame"%(Config.Build['buildPath'])),r'res\raw-assets')
	if os.path.exists(tar_dir):
		_del_subPackage(tar_dir)
		print(u'主域资源删除成功')
	print(u'主域资源不存在')

def _del_subPackage(top):
	for root, dirs, files in os.walk(top, topdown=False):
	    for name in files:
	        os.remove(os.path.join(root, name))
	    for name in dirs:
	        os.rmdir(os.path.join(root, name))
	os.rmdir(top)

def _cp_subPackage():
	ori_dir = '%s\\%s'%(Config.Build_SubDomain['buildPath'],Config.Build_SubDomain['title'])
	tar_dir = '%s\\wechatgame\\%s'%(Config.Build['buildPath'],Config.Build_SubDomain['title'])

	if os.path.exists(tar_dir):
		_del_subPackage(tar_dir)
		print(u'移除已存在的子域成功')

	shutil.copytree(ori_dir,tar_dir)
	print(u'子域文件拷贝成功')

def _build_wcg_package(projPath):
	'''构建微信小游戏包'''
	tmpFilePath = os.path.join(os.getcwd(),'build_tmp.json')
	cmd = r"CocosCreator.exe --path %s --build configPath=%s"%(projPath,tmpFilePath)
	print(u'开始构建')
	_exec_cmd(cmd,False)
	print(u'构建微信包成功')

def _run_wcg_cli(commond):
	'''运行微信开发工具命令'''
	cmd = "cmd.exe /c " + os.path.join(Config.Data['wechatGameDevToolsPath'],'cli.bat') +' '+commond
	cmd = cmd.decode('utf-8').encode(locale.getdefaultlocale()[1])
	_exec_cmd(cmd,True)

def _start_up_wcg():
	'''启动微信开发工具'''
	print(u'启动微信开发工具')
	_run_wcg_cli("-o %s\\wechatgame"%(Config.Build['buildPath']))
	print(u'启动成功')

def _build_wcg_tmp_QRCode():
	'''生成预览二维码'''
	_run_wcg_cli("-p %s\\wechatgame --preview-qr-output terminal"%(Config.Build['buildPath']))

def _upload_wcg_package(ver=Config.Data['upload']['version'],desc=Config.Data['upload']['desc']):
	'''长传微信包到开放平台'''
	_run_wcg_cli("-u %s@%s\\wechatgame --upload-desc %s"%(ver,Config.Build['buildPath'],desc))

def _wcg_login():
	'''调用微信登录'''
	_run_wcg_cli("-l --login-qr-output terminal")

def main():
	is_skip_build_subPackage = sys.argv[1]

	if is_skip_build_subPackage == '0':
		_build_tmp_file(Config.Build_SubDomain)
		_build_wcg_package(Config.Data['subDomainProjPath'])

	is_skip_build_package = sys.argv[2]

	if is_skip_build_package == '0':
		_build_tmp_file(Config.Build)
		_build_wcg_package(Config.Data['projPath'])
		_del_tmp_file()
		_cp_file()

	is_skip_cp_sub_package = sys.argv[3]

	if is_skip_cp_sub_package == '0':
		_cp_subPackage()

	is_skip_del_main_res = sys.argv[4]

	if is_skip_del_main_res == '0':
		_del_main_folder()

	flag = sys.argv[5]
	if flag == '1':
		_start_up_wcg()
	elif flag == '2':
		_build_wcg_tmp_QRCode()
	elif flag == '3':
		_upload_wcg_package()
	

if __name__ == '__main__':
	main()
