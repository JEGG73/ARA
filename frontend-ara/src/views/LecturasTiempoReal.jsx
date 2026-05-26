import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

function LecturasTiempoReal({
  nitrogeno,
  fosforo,
  potasio,
  actualizarTelemetria
}) {

  const dataNPK = {
    labels: [
      "Nitrógeno",
      "Fósforo",
      "Potasio"
    ],
    datasets: [
      {
        data: [
          nitrogeno,
          fosforo,
          potasio
        ],
        backgroundColor: [
          "#00ff88",
          "#0099ff",
          "#ffcc00"
        ],
        borderWidth: 1
      }
    ]
  };

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
          <p>{potasio} mg/kg</p>
        </div>

      </div>

      <div
        style={{
          width: "350px",
          margin: "40px auto"
        }}
      >

        <h3
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#00ff88"
          }}
        >
          Niveles NPK
        </h3>

        <Pie
          data={dataNPK}
          options={{
            plugins: {
              datalabels: {
                color: "#ffffff",
                font: {
                  weight: "bold",
                  size: 16
                },
                formatter: (value) => value + "%"
              },
              legend: {
                labels: {
                  color: "white"
                }
              }
            }
          }}
        />

      </div>

    </section>
  );
}

export default LecturasTiempoReal;