import React, { useState } from 'react';
import { Table, Badge } from 'react-bootstrap';
import 'animate.css';
import './App.css';

import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import ForgotPassword from "./views/auth/ForgotPassword";
import ResetPassword from "./views/auth/ResetPassword";

function App() {

  const [vistaActiva, setVistaActiva] = useState('dashboard');
  const [authVista, setAuthVista] = useState('login');

  // MENÚ HAMBURGUESA
  const [menuAbierto, setMenuAbierto] = useState(false);

  const [nitrogeno, setNitrogeno] = useState(45);
  const [fosforo, setFosforo] = useState(12);
  const [ph, setPh] = useState(6.5);

  const [estadoAgrobot, setEstadoAgrobot] = useState('Conectado y transmitiendo');

  const [mensajes, setMensajes] = useState([
    {
      rol: 'ia',
      texto: '¡Hola! Soy ARA IA. He analizado la telemetría actual de tu parcela. ¿En qué te ayudo?'
    }
  ]);

  const [inputChat, setInputChat] = useState('');
  const [cargandoIA, setCargandoIA] = useState(false);

  const actualizarTelemetria = async () => {

    setEstadoAgrobot('Consultando al servidor por HTTP...');

    try {

      const response = await fetch('/telemetria.json');

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();

      setTimeout(() => {

        setNitrogeno(data.nitrogeno);
        setFosforo(data.fosforo);
        setPh(data.ph);
        setEstadoAgrobot(data.estado);

      }, 800);

    } catch (error) {

      console.error("Error en Fetch API:", error);
      setEstadoAgrobot('Error de conexión con la API 🔴');

    }
  };

  const enviarMensajeIA = async () => {

    if (!inputChat.trim()) return;

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
          'Authorization': 'Bearer 1|Ypa81gP6LwS2GYYiPgeyadbOpRaYUIsSg4ep072b1d50f883'
        },
        body: JSON.stringify({
          prompt: inputChat,
          agrobot_id: 1
        })
      });

      if (!response.ok) {
        throw new Error('Error de autorizacion o en el servidor');
      }

      const data = await response.json();

      setMensajes(prevMensajes => [
        ...prevMensajes,
        { rol: 'ia', texto: data.respuesta_ia }
      ]);

    } catch (error) {

      console.error("Error al consultar a la IA:", error);

      setMensajes(prevMensajes => [
        ...prevMensajes,
        {
          rol: 'ia',
          texto: 'Lo siento, perdí la conexión con el servidor. Intenta de nuevo.'
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
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            ☰
          </button>

          <ul className={menuAbierto ? "active" : ""}>

            <li>
              <button
                className={vistaActiva === 'dashboard' ? 'nav-btn activo' : 'nav-btn'}
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
                className={vistaActiva === 'historial' ? 'nav-btn activo' : 'nav-btn'}
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
                className={vistaActiva === 'chat' ? 'nav-btn activo' : 'nav-btn'}
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
                className={vistaActiva === 'cuenta' ? 'nav-btn activo' : 'nav-btn'}
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

      {vistaActiva !== 'cuenta' && (

        <>
          <section className="hero">

            <div className="hero-overlay">

              <h1 className="hero-title">
                Agricultura Inteligente
              </h1>

              <p className="hero-subtitle">
                Plataforma de monitoreo agrícola impulsada por Inteligencia Artificial y Agrobots.
              </p>

              <button className="hero-btn">
                Explorar Plataforma
              </button>

            </div>

          </section>

          <section className="servicios">

            <h2>Nuestros Servicios</h2>

            <div className="cards-servicios">

              <div className="service-card">
                <h3>Telemetría en Tiempo Real</h3>
                <p>Monitorea niveles de nitrógeno, fósforo y pH desde cualquier lugar.</p>
              </div>

              <div className="service-card">
                <h3>Asistente IA</h3>
                <p>Recomendaciones inteligentes para optimizar la producción agrícola.</p>
              </div>

              <div className="service-card">
                <h3>Integración Agrobot</h3>
                <p>Sincronización avanzada con robots agrícolas autónomos.</p>
              </div>

            </div>

          </section>
        </>
      )}

      <main>

        {vistaActiva === 'dashboard' && (
          <section id="dashboard">

            <div className="dashboard-header">

              <h2>Lecturas en Tiempo Real</h2>

              <button
                className="btn-accion"
                onClick={actualizarTelemetria}
              >
                ↻ Sincronizar Agrobot
              </button>

            </div>

            <div className="dashboard-cards">

              <div className="dashboard-card">
                <h3>Nitrógeno (N)</h3>
                <p>{nitrogeno} mg/kg</p>
              </div>

              <div className="dashboard-card">
                <h3>Fósforo (P)</h3>
                <p>{fosforo} mg/kg</p>
              </div>

              <div className="dashboard-card">
                <h3>pH del Suelo</h3>
                <p>{ph}</p>
              </div>

            </div>

          </section>
        )}

        {vistaActiva === 'historial' && (
          <section id="historial">

            <h2>Historial de Análisis de Campo</h2>

            <Table striped bordered hover variant="dark" responsive>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Sector</th>
                  <th>N</th>
                  <th>P</th>
                  <th>pH</th>
                </tr>
              </thead>

              <tbody>
                <tr><td>2026-04-06</td><td>Norte</td><td>42</td><td>14</td><td>6.4</td></tr>
                <tr><td>2026-04-05</td><td>Norte</td><td>44</td><td>11</td><td>6.5</td></tr>
                <tr><td>2026-04-04</td><td>Sur</td><td>38</td><td>18</td><td>6.8</td></tr>
              </tbody>
            </Table>

          </section>
        )}

        {vistaActiva === 'chat' && (
          <section id="chat">

            <h2>ARA IA</h2>

            <div className="chat-container">

              <div className="historial-mensajes">

                {mensajes.map((msg, i) => (
                  <div
                    key={i}
                    className={msg.rol === 'usuario' ? 'mensaje-usuario' : 'mensaje-ia'}
                  >
                    {msg.texto}
                  </div>
                ))}

                {cargandoIA && (
                  <div className="mensaje-ia">
                    Analizando...
                  </div>
                )}

              </div>

              <div className="chat-input-area">

                <input
                  value={inputChat}
                  onChange={(e) => setInputChat(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && enviarMensajeIA()}
                  placeholder="Escribe..."
                />

                <button onClick={enviarMensajeIA}>
                  Enviar
                </button>

              </div>

            </div>

          </section>
        )}

        {vistaActiva === 'cuenta' && (
          <section className="cuenta-section">

            <div className="auth-buttons">

              <button onClick={() => setAuthVista('login')}>
                Login
              </button>

              <button onClick={() => setAuthVista('register')}>
                Registro
              </button>

              <button onClick={() => setAuthVista('forgot')}>
                Recuperar
              </button>

            </div>

            {authVista === 'login' && <Login />}
            {authVista === 'register' && <Register />}
            {authVista === 'forgot' && <ForgotPassword />}
            {authVista === 'reset' && <ResetPassword />}

          </section>
        )}

      </main>

      <footer>

        <p>&copy; 2026 Sistema ARA Web</p>

        <p>
          Estado del Agrobot:{" "}
          <Badge bg={estadoAgrobot.includes('Error') ? 'danger' : 'success'}>
            {estadoAgrobot}
          </Badge>
        </p>

      </footer>

    </div>
  );
}

export default App;