# Herramientas a Instalar

Para preparar el entorno de desarrollo local, cada miembro del equipo
deberá instalar y configurar el siguiente software en el orden
establecido:

-- Servidor Local y Base de Datos (Laragon 6.0)
Se ha definido el uso estricto de Laragon versión 6.0 como la suite de
desarrollo principal.
Instalación: Descargar el instalador "Laragon Full" e instalarlo en la
raíz del disco duro (usualmente C:\laragon).
Configuración: Al iniciar Laragon, acceder a las preferencias y
asegurarse de que los servicios de Apache/Nginx y MySQL inicien
automáticamente. Es vital verificar que la función de Auto Virtual Hosts
esté activada, lo que nos permitirá acceder al proyecto localmente a
través de un dominio amigable como ara.test.

-- Gestor de Dependencias de Backend (Composer)
Aunque Laragon incluye una versión de Composer, se recomienda instalar la
versión global más reciente de Composer para Windows.
Instalación: Ejecutar el instalador y asegurar que la ruta del ejecutable
de PHP apunte a la carpeta de PHP dentro de Laragon (ej.
C:\laragon\bin\php\php-8.3.29\php.exe). Este es un requisito fundamental
para instalar y gestionar las dependencias de Laravel 11.

-- Entorno de Ejecución de Frontend (Node.js y npm)
Requerido para compilar y ejecutar el cliente de React (PWA) y las
herramientas de bundling de Laravel (Vite).
Instalación: Descargar e instalar la versión LTS (Long Term Support)
actual de Node.js. Al finalizar, verificar la instalación abriendo una
terminal y ejecutando node -v y npm -v.

-- Entorno de Inteligencia Artificial (Python)
Requerido para el microservicio de análisis predictivo.
Instalación: Descargar la versión estable más reciente de Python 3
Durante la instalación en Windows, es obligatorio marcar la casilla "Add
Python to PATH" para que los scripts puedan ser ejecutados desde la
terminal en la raíz del proyecto.
Buenas prácticas: Cada desarrollador deberá crear un entorno virtua
(venv) dentro de la carpeta del microservicio para instalar las librerías
de IA (Pandas, Scikit-learn, etc.) sin contaminar el entorno global de su
sistema operativo.