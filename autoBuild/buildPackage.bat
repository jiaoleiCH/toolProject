@echo off

:start

echo."======΢��С��Ϸ�Զ��������======"

echo."===author Ye Wei ==="

set tips=" 1 ������ 0 ������ ���س�����"

echo."�Ƿ�����������"%tips%

set /p p1=

echo."�Ƿ�����������"%tips%

set /p p2=

echo."�Ƿ�������������",%tips%

set /p p3=

echo."�Ƿ�����ɾ������ res/raw-assets ����Դ",%tips%

set /p p4=

echo."1 => ����΢�ſ�������"
echo."2 => ����Ԥ����ά��"
echo."3 => �ϴ�����"

set /p p5=


echo.���յ�����Ϊ python -u buildWeChat.py %p1% %p2% %p3% %p4% %p5%

python -u buildWeChat.py %p1% %p2% %p3% %p4% %p5%

pause
