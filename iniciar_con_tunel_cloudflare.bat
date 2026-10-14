@echo off
title SIS-TERREMOTO - Servidor Local y Tunel Cloudflare
color 0A

echo =========================================================================
echo       SIS-TERREMOTO: SISTEMA DE EVACUACION ANTE TERREMOTO
echo =========================================================================
echo.
echo 1. Iniciando servidor web local en puerto 3000...
start /B node server.js

timeout /t 2 /nobreak >nul

echo.
echo 2. Abriendo Tunel Seguro de Cloudflare (Quick Tunnel)...
echo.
echo -------------------------------------------------------------------------
echo   BUSCA LA LINEA QUE DICE "https://xxxxx.trycloudflare.com" ABAJO.
echo   Ese enlace HTTPS publico lo puedes abrir desde cualquier celular
echo   o compartirlo con tu profesor para la evaluacion del proyecto!
echo -------------------------------------------------------------------------
echo.

cloudflared.exe tunnel --url http://localhost:3000

pause
