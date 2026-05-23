function LecturasTiempoReal({
  nitrogeno,
  fosforo,
  potasio,
  actualizarTelemetria
}) {

  return (

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
          <h3>Potasio (K)</h3>
          <p>{potasio}</p>
        </div>

      </div>

    </section>
  );
}

export default LecturasTiempoReal;