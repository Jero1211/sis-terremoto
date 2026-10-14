@echo off
title SIS-TERREMOTO - Servidor Local
color 0B

echo =========================================================================
echo       SIS-TERREMOTO: INICIANDO SERVIDOR LOCAL (PUERTO 3000)
echo =========================================================================
echo.

start http://localhost:3000
node server.js

pause
