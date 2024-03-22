@echo off
REM Definir las variables para la conexión SSH
set "remoteUser=ubuntu"
set "remoteHost=ec2-51-20-246-74.eu-north-1.compute.amazonaws.com"
set "remoteScriptPath=/home/ubuntu/grace-hopper-01/build.sh"

REM Ejecutar el script remoto en la máquina remota
echo Ejecutando script remoto en la máquina remota...
ssh -i "psoft.pem" %remoteUser%@%remoteHost% "%remoteScriptPath%"

REM Esperar 5 segundos
timeout /t 5