import React, { useState } from 'react';
import { Table, Badge } from 'react-bootstrap';
import 'animate.css';
import './App.css';

function App() {

  const [vistaActiva, setVistaActiva] = useState('dashboard');

  const [nitrogeno, setNitrogeno] = useState(45);
  const [fosforo, setFosforo] = useState(12);
  const [ph, setPh] = useState(6.5);
  const [estadoAgrobot, setEstadoAgrobot] = useState('Conectado y transmitiendo');
  const [mensajes, setMensajes] = useState([
    { rol: 'ia', texto: '¡Hola! Soy TerraMind IA. He analizado la telemetría actual de tu parcela. ¿En qué te ayudo?' }
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
    if (!inputChat.trim()) return

    const nuevosMensajes = [...mensajes, { rol: 'usuario', texto: inputChat }];
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

      setMensajes(prevMensajes => [...prevMensajes, { rol: 'ia', texto: data.respuesta_ia }]);

    } catch (error) {
      console.error("Error al consultar a la IA:", error);
      setMensajes(prevMensajes => [...prevMensajes, { rol: 'ia', texto: 'Lo siento, perdí la conexión con el servidor. Intenta de nuevo.' }]);
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
          <ul>

            <li>
              <button
                className={vistaActiva === 'dashboard' ? 'nav-btn activo' : 'nav-btn'}
                onClick={() => setVistaActiva('dashboard')}
              >
                Inicio
              </button>
            </li>

            <li>
              <button
                className={vistaActiva === 'historial' ? 'nav-btn activo' : 'nav-btn'}
                onClick={() => setVistaActiva('historial')}
              >
                Historial
              </button>
            </li>

            <li>
              <button
                className={vistaActiva === 'chat' ? 'nav-btn activo' : 'nav-btn'}
                onClick={() => setVistaActiva('chat')}
              >
                IA
              </button>
            </li>

          </ul>
        </nav>

      </header>

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
            <p>
              Monitorea niveles de nitrógeno, fósforo y pH desde cualquier lugar.
            </p>
          </div>

          <div className="service-card">
            <h3>Asistente IA</h3>
            <p>
              Recomendaciones inteligentes para optimizar la producción agrícola.
            </p>
          </div>

          <div className="service-card">
            <h3>Integración Agrobot</h3>
            <p>
              Sincronización avanzada con robots agrícolas autónomos.
            </p>
          </div>

        </div>

      </section>

      <main>

        {vistaActiva === 'dashboard' && (

          <section id="dashboard" className="fade-in">

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gridColumn: '1 / -1'
              }}
            >

              <h2>Lecturas en Tiempo Real</h2>

              <button
                className="btn-accion animate__animated animate__pulse animate__infinite"
                onClick={actualizarTelemetria}
              >
                ↻ Sincronizar Agrobot
              </button>

            </div>

            <article className="animate__animated animate__fadeInUp">

              <h3>Nitrógeno (N)</h3>

              <p>
                Nivel actual: <strong>{nitrogeno} mg/kg</strong>
              </p>

            </article>

            <article className="animate__animated animate__fadeInUp animate__delay-1s">

              <h3>Fósforo (P)</h3>

              <p>
                Nivel actual: <strong>{fosforo} mg/kg</strong>
              </p>

            </article>

            <article className="animate__animated animate__fadeInUp animate__delay-2s">

              <h3>pH del Suelo</h3>

              <p>
                Nivel actual: <strong>{ph}</strong>
              </p>

            </article>

          </section>
        )}

        {vistaActiva === 'historial' && (

          <section id="historial" className="fade-in">

            <h2>Historial de Análisis de Campo</h2>

            <div className="mt-4">

              <Table striped bordered hover variant="dark" responsive>

                <thead>

                  <tr>
                    <th>Fecha y Hora</th>
                    <th>Sector</th>
                    <th>N (mg/kg)</th>
                    <th>P (mg/kg)</th>
                    <th>pH</th>
                  </tr>

                </thead>

                <tbody>

                  <tr>
                    <td>2026-04-06 08:30</td>
                    <td>Parcela Norte</td>
                    <td>42</td>
                    <td>14</td>
                    <td>6.4</td>
                  </tr>

                  <tr>
                    <td>2026-04-05 16:15</td>
                    <td>Parcela Norte</td>
                    <td>44</td>
                    <td>11</td>
                    <td>6.5</td>
                  </tr>

                  <tr>
                    <td>2026-04-04 09:00</td>
                    <td>Parcela Sur</td>
                    <td>38</td>
                    <td>18</td>
                    <td>6.8</td>
                  </tr>

                </tbody>

              </Table>

            </div>

          </section>
        )}

        {vistaActiva === 'chat' && (
          <section id="ia-chat" className="fade-in">
            <h2>Asistente Predictivo (ARA IA)</h2>

            <div className="chat-container">

              <div className="historial-mensajes" style={{ maxHeight: '400px', overflowY: 'auto', padding: '10px' }}>
                {mensajes.map((msg, index) => (
                  <div key={index} className={`mensaje ${msg.rol === 'usuario' ? 'mensaje-usuario' : 'mensaje-ia'}`}>
                    <p>
                      <strong>{msg.rol === 'usuario' ? 'Tú' : 'ARA IA'}:</strong> {msg.texto}
                    </p>
                  </div>
                ))}

                {cargandoIA && (
                  <div className="mensaje mensaje-ia">
                    <p><em>Analizando datos de suelo...</em></p>
                  </div>
                )}
              </div>

              <div className="chat-input-area">
                <input
                  type="text"
                  placeholder="Escribe tu consulta agronómica aquí..."
                  value={inputChat}
                  onChange={(e) => setInputChat(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !cargandoIA && enviarMensajeIA()}
                  disabled={cargandoIA}
                />
                <button
                  className="btn-accion"
                  onClick={enviarMensajeIA}
                  disabled={cargandoIA || !inputChat.trim()}
                >
                  Enviar
                </button>
              </div>

            </div>
          </section>
        )}

      </main>

      <footer>

        <p>&copy; 2026 Sistema ARA Web</p>

        <p>

          Estado del Agrobot:{' '}

          <Badge bg={estadoAgrobot.includes('Error') ? 'danger' : 'success'}>
            {estadoAgrobot}
          </Badge>

        </p>

      </footer>

    </div>
  );
}

export default App;