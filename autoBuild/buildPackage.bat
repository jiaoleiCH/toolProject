@echo off

:start

echo."======微信小游戏自动打包工具======"

echo."===author Ye Wei ==="

set tips=" 1 是跳过 0 不跳过 按回车继续"

echo."是否跳过子域打包"%tips%

set /p p1=

echo."是否跳过主域打包"%tips%

set /p p2=

echo."是否跳过拷贝子域",%tips%

set /p p3=

echo."是否跳过删除子域 res/raw-assets 的资源",%tips%

set /p p4=

echo."1 => 启动微信开发工具"
echo."2 => 生成预览二维码"
echo."3 => 上传代码"

set /p p5=


echo.最终的命令为 python -u buildWeChat.py %p1% %p2% %p3% %p4% %p5%

python -u buildWeChat.py %p1% %p2% %p3% %p4% %p5%

pause
