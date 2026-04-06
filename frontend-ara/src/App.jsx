import React, { useState } from 'react';
import './App.css';

function App() {
  // Estado para la navegación
  const [vistaActiva, setVistaActiva] = useState('dashboard');

  // Estados de Telemetria
  const [nitrogeno, setNitrogeno] = useState(45);
  const [fosforo, setFosforo] = useState(12);
  const [ph, setPh] = useState(6.5);
  const [estadoAgrobot, setEstadoAgrobot] = useState('Conectado y transmitiendo');

  const actualizarTelemetria = () => {
    setEstadoAgrobot('Recibiendo datos del Agrobot...');
    setTimeout(() => {
      setNitrogeno(Math.floor(Math.random() * (60 - 30 + 1)) + 30);
      setFosforo(Math.floor(Math.random() * (20 - 5 + 1)) + 5);
      setPh((Math.random() * (7.5 - 5.5) + 5.5).toFixed(1));
      setEstadoAgrobot('Conectado y transmitiendo');
    }, 1000);
  };

  return (
    <div className="ara-app-container">
      <header>
        <h1>ARA Web - Asistente Robótico Agrícola</h1>
        <p>Perfil: Ingeniero Agrónomo</p>
      </header>

      {/* Navegacion */}
      <nav>
        <ul>
          <li>
            <button
              className={vistaActiva === 'dashboard' ? 'nav-btn activo' : 'nav-btn'}
              onClick={() => setVistaActiva('dashboard')}
            >Panel de Telemetría</button>
          </li>
          <li>
            <button
              className={vistaActiva === 'historial' ? 'nav-btn activo' : 'nav-btn'}
              onClick={() => setVistaActiva('historial')}
            >Historial de Suelo</button>
          </li>
          <li>
            <button
              className={vistaActiva === 'chat' ? 'nav-btn activo' : 'nav-btn'}
              onClick={() => setVistaActiva('chat')}
            >Asistente IA</button>
          </li>
        </ul>
      </nav>

      <main>
        {/* Dashboard */}
        {vistaActiva === 'dashboard' && (
          <section id="dashboard" className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gridColumn: '1 / -1' }}>
              <h2>Lecturas en Tiempo Real</h2>
              <button className="btn-accion" onClick={actualizarTelemetria}>↻ Sincronizar Agrobot</button>
            </div>

            <article>
              <h3>Nitrógeno (N)</h3>
              <p>Nivel actual: <strong>{nitrogeno} mg/kg</strong></p>
            </article>

            <article>
              <h3>Fósforo (P)</h3>
              <p>Nivel actual: <strong>{fosforo} mg/kg</strong></p>
            </article>

            <article>
              <h3>pH del Suelo</h3>
              <p>Nivel actual: <strong>{ph}</strong></p>
            </article>
          </section>
        )}

        {/* Historial */}
        {vistaActiva === 'historial' && (
          <section id="historial" className="fade-in">
            <h2>Historial de Análisis de Campo</h2>
            <div className="tabla-responsive">
              <table className="ara-tabla">
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
              </table>
            </div>
          </section>
        )}

        {/* Chat de IA */}
        {vistaActiva === 'chat' && (
          <section id="ia-chat" className="fade-in">
            <h2>Asistente Predictivo (TerraMind IA)</h2>
            <div className="chat-container">
              <div className="mensaje mensaje-usuario">
                <p><strong>Tú:</strong> ¿Qué recomiendas para la Parcela Norte según el historial reciente?</p>
              </div>
              <div className="mensaje mensaje-ia">
                <p><strong>ARA IA:</strong> Analizando el histórico de los últimos 3 días, he detectado una tendencia a la baja en el Fósforo (P) en la Parcela Norte. Recomiendo una aplicación preventiva de superfosfato de calcio antes de la próxima lluvia.</p>
              </div>

              <div className="chat-input-area">
                <input type="text" placeholder="Escribe tu consulta agronómica aquí..." disabled />
                <button className="btn-accion" disabled>Enviar</button>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer>
        <p>&copy; 2026 Sistema ARA Web. Módulo de Desarrollo Web.</p>
        <p>Estado del Agrobot: <em>{estadoAgrobot}</em></p>
      </footer>
    </div>
  );
}

export default App;