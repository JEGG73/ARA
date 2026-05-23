function Inicio() {
  return (
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
            <p>Monitorea niveles de nitrógeno, fósforo y potasio desde cualquier lugar.</p>
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
  );
}

export default Inicio;