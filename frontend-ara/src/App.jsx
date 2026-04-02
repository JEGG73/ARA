import React from 'react';
import './App.css'

function App() {
  return (
    <div className="ara-app-container">
      {/* Cabecera */}
      <header>
        <h1>ARA Web - Asistente Robótico Agrícola</h1>
        <br />
        <p>Perfil: Ingeniero Agrónomo</p>
      </header>

      {/* Navegación principal */}
      <nav>
        <ul>
          <li><a href="#dashboard">Panel de Telemetría</a></li>
          <li><a href="#historial">Historial de Suelo</a></li>
          <li><a href="#ia-chat">Asistente Predictivo (IA)</a></li>
        </ul>
      </nav>

      {/* Contenedor principal de la aplicación */}
      <main>
        {/* Sección de Múltiples Artículos */}
        <section id="dashboard">
          <h2>Lecturas en Tiempo Real</h2>

          <article>
            <h3>Nitrógeno (N)</h3>
            <p>Nivel actual: <strong>45 mg/kg</strong> (Normal)</p>
          </article>

          <article>
            <h3>Fósforo (P)</h3>
            <p>Nivel actual: <strong>12 mg/kg</strong> (Bajo)</p>
          </article>

          <article>
            <h3>pH del Suelo</h3>
            <p>Nivel actual: <strong>6.5</strong> (Óptimo)</p>
          </article>
        </section>

        {/* Sección para el módulo de IA */}
        <section id="ia-chat">
          <h2>Diagnóstico IA</h2>
          <article>
            <p><strong>ARA IA:</strong> Se detecta una deficiencia en Fósforo (P). Se recomienda aplicar fertilizante fosfatado en el sector norte de la parcela.</p>
          </article>
        </section>
      </main>

      {/* Pie de página */}
      <footer>
        <p>&copy; 2026 Sistema ARA Web. Módulo de Desarrollo Web.</p>
        <p>Estado del Agrobot: <em>Conectado y transmitiendo</em> 🟢</p>
      </footer>
    </div>
  );
}

export default App;