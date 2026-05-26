import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';
import 'animate.css';
import './App.css';

import Inicio from "./views/Inicio";
import Historial from "./views/Historial";
import IA from "./views/IA";
import LecturasTiempoReal from "./views/LecturasTiempoReal";
import Cuenta from "./views/Cuenta";

function App() {

  const [vistaActiva, setVistaActiva] = useState('dashboard');
  const [authVista, setAuthVista] = useState('login');

  const [menuAbierto, setMenuAbierto] = useState(false);

  const [nitrogeno, setNitrogeno] = useState(45);
  const [fosforo, setFosforo] = useState(12);
  const [potasio, setPotasio] = useState(6.5);

  const [estadoAgrobot, setEstadoAgrobot] =
    useState('Conectado y transmitiendo');

  const [agrobotId, setAgrobotId] = useState("");

  const [mensajes, setMensajes] = useState([
    {
      rol: 'ia',
      texto:
        '¡Hola! Soy ARA IA. He analizado la telemetría actual de tu parcela. ¿En qué te ayudo?'
    }
  ]);

  const [inputChat, setInputChat] = useState('');
  const [cargandoIA, setCargandoIA] = useState(false);

  const actualizarTelemetria = async () => {

    if (!agrobotId) {
      setEstadoAgrobot('Error: Selecciona o registra un Agrobot primero');
      return;
    }

    setEstadoAgrobot('Consultando al servidor por HTTP...');
    const token = localStorage.getItem('ara_token');

    if (!token) {
      setEstadoAgrobot('Error: No has iniciado sesión');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/agrobots/${agrobotId}/telemetry`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const resData = await response.json();

      if (resData.data && resData.data.length > 0) {
        const ultimaLectura = resData.data[0];
        setNitrogeno(ultimaLectura.nitrogen);
        setFosforo(ultimaLectura.phosphorus);
        setPotasio(ultimaLectura.potassium);
        setEstadoAgrobot("Sincronizado correctamente");
      } else {
        setEstadoAgrobot("Sin datos registrados aún");
      }

    } catch (error) {

      console.error("Error en Fetch API:", error);
      setEstadoAgrobot('Error de conexión con la API');

    }
  };

  const enviarMensajeIA = async () => {

    if (!inputChat.trim()) return;

    const token = localStorage.getItem('ara_token');

    if (!token) {
      alert('Por favor, inicia sesión para consultar a la IA');
      return;
    }

    const nuevosMensajes = [
      ...mensajes,
      { rol: 'usuario', texto: inputChat }
    ];

    setMensajes(nuevosMensajes);
    setInputChat('');
    setCargandoIA(true);

    try {

      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          prompt: inputChat,
          agrobot_id: agrobotId
        })
      }
      );

      if (!response.ok) {
        throw new Error('Error de autorización o en el servidor');
      }

      const data = await response.json();

      setMensajes(prevMensajes => [
        ...prevMensajes,
        { rol: 'ia', texto: data.respuesta_ia }
      ]);

    } catch (error) {

      console.error(
        "Error al consultar a la IA:", error);

      setMensajes(prevMensajes => [
        ...prevMensajes,
        {
          rol: 'ia',
          texto:
            'Lo siento, perdí la conexión con el servidor. Intenta de nuevo.'
        }
      ]);

    } finally {
      setCargandoIA(false);
    }
  };

  return (

    <div className="ara-app-container">

      <header>

        <div>
          <h1>ARA Web</h1>
          <p>Asistente Robótico Agrícola</p>
        </div>

        <nav>

          <button
            className="hamburger"
            onClick={() =>
              setMenuAbierto(!menuAbierto)
            }
          >
            ☰
          </button>

          <ul className={menuAbierto ? "active" : ""}>

            <li>
              <button
                className={
                  vistaActiva === 'dashboard'
                    ? 'nav-btn activo'
                    : 'nav-btn'
                }
                onClick={() => {
                  setVistaActiva('dashboard');
                  setMenuAbierto(false);
                }}
              >
                Inicio
              </button>
            </li>

            <li>
              <button
                className={
                  vistaActiva === 'lecturas'
                    ? 'nav-btn activo'
                    : 'nav-btn'
                }
                onClick={() => {
                  setVistaActiva('lecturas');
                  setMenuAbierto(false);
                }}
              >
                Lecturas
              </button>
            </li>

            <li>
              <button
                className={
                  vistaActiva === 'historial'
                    ? 'nav-btn activo'
                    : 'nav-btn'
                }
                onClick={() => {
                  setVistaActiva('historial');
                  setMenuAbierto(false);
                }}
              >
                Historial
              </button>
            </li>

            <li>
              <button
                className={
                  vistaActiva === 'chat'
                    ? 'nav-btn activo'
                    : 'nav-btn'
                }
                onClick={() => {
                  setVistaActiva('chat');
                  setMenuAbierto(false);
                }}
              >
                IA
              </button>
            </li>

            <li>
              <button
                className={
                  vistaActiva === 'cuenta'
                    ? 'nav-btn activo'
                    : 'nav-btn'
                }
                onClick={() => {
                  setVistaActiva('cuenta');
                  setMenuAbierto(false);
                }}
              >
                Cuenta
              </button>
            </li>

          </ul>

        </nav>

      </header>

      <main>

        {vistaActiva === 'dashboard' && (
          <Inicio />
        )}

        {vistaActiva === 'lecturas' && (
          <LecturasTiempoReal
            nitrogeno={nitrogeno}
            fosforo={fosforo}
            potasio={potasio}
            actualizarTelemetria={actualizarTelemetria}
          />
        )}

        {vistaActiva === 'historial' && (
          <Historial agrobotId={agrobotId}/>
        )}

        {vistaActiva === 'chat' && (
          <IA
            mensajes={mensajes}
            cargandoIA={cargandoIA}
            inputChat={inputChat}
            setInputChat={setInputChat}
            enviarMensajeIA={enviarMensajeIA}
          />
        )}

        {vistaActiva === 'cuenta' && (
          <Cuenta
            authVista={authVista}
            setAuthVista={setAuthVista}
            setVistaActiva={setVistaActiva}
            agrobotId={agrobotId}
            setAgrobotId={setAgrobotId}
          />
        )}

      </main>

      <footer>

        <p>&copy; 2026 Sistema ARA Web</p>

        <p>
          Estado del Agrobot:{" "}

          <Badge
            bg={
              estadoAgrobot.includes('Error')
                ? 'danger'
                : 'success'
            }
          >
            {estadoAgrobot}
          </Badge>

        </p>

      </footer>

    </div>
  );
}

export default App;