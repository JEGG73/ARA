@echo off
TITLE Ecosistema ARA SaaS
COLOR 0A

echo ===================================================
echo      INICIANDO SERVIDORES ARA (FRONTEND + BACKEND)
echo ===================================================
echo.

:: 1. Iniciar Laravel (Backend)
:: Usamos --host=0.0.0.0 para que el Agrobot (ESP32) pueda conectarse a la API
echo [1/2] Levantando API de Laravel...
start "ARA Backend - Laravel" cmd /k "cd backend-ara && php artisan serve --host=0.0.0.0 --port=8000"

:: Esperamos 2 segundos para no saturar el procesador
timeout /t 2 /nobreak > NUL

:: 2. Iniciar React Vite (Frontend)
:: Usamos --host para que Vite exponga la IP y puedas probar la web en tu telefono
echo [2/2] Levantando Frontend de React...
start "ARA Frontend - Vite" cmd /k "cd frontend-ara && npm run dev -- --host"

echo.
echo ===================================================
echo ¡SERVIDORES EN LINEA!
echo ===================================================
echo Laravel escuchando en: http://TU_IP:8000
echo React escuchando en:   http://TU_IP:5173
echo.
echo Puedes presionar cualquier tecla para cerrar esta ventana. 
echo Los servidores seguiran corriendo en sus propias terminales.
pause > NUL