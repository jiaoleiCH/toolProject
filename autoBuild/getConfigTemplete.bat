@echo off

if exist ConfigTemplete.py (
	echo.�ļ��Ѵ���
	goto over	
)

copy Config.py ConfigTemplete.py

if exist ConfigTemplete.py (
	echo.�����ɹ�
) else (
	echo.����ʧ��
)

:over
pause