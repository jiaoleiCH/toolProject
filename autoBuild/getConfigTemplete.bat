@echo off

if exist ConfigTemplete.py (
	echo.文件已存在
	goto over	
)

copy Config.py ConfigTemplete.py

if exist ConfigTemplete.py (
	echo.拷贝成功
) else (
	echo.拷贝失败
)

:over
pause