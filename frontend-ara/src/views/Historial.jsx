import { useState, useEffect } from 'react';
import { Table, Spinner, Alert, Button } from 'react-bootstrap';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function Historial({ agrobotId }) {

  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {

    const fetchHistorial = async () => {

      if (!agrobotId) {
        setError('Por favor, selecciona un Agrobot en tu panel de Cuenta.');
        setCargando(false);
        return;
      }

      const token = localStorage.getItem('ara_token');

      if (!token) {
        setError('Inicia sesión para ver tu historial de telemetría.');
        setCargando(false);
        return;
      }

      try {

        const response = await fetch(
          `http://localhost:8000/api/agrobots/${agrobotId}/telemetry`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        const resData = await response.json();

        if (!response.ok) {
          throw new Error(
            resData.message || 'Error al obtener el historial'
          );
        }

        setHistorial(resData.data || []);

      } catch (err) {

        setError(err.message);

      } finally {

        setCargando(false);

      }
    };

    fetchHistorial();

  }, [agrobotId]);

  const generarPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text(
      'Reporte de Historial ARA',
      14,
      20
    );

    doc.setFontSize(12);

    doc.text(
      `Fecha: ${new Date().toLocaleDateString('es-MX')}`,
      14,
      30
    );

    const rows = historial.map((lectura) => [

      new Date(
        lectura.created_at
      ).toLocaleString('es-MX'),

      lectura.nitrogen,
      lectura.phosphorus,
      lectura.potassium

    ]);

    autoTable(doc, {
      startY: 40,
      head: [[
        'Fecha y Hora',
        'N (mg/kg)',
        'P (mg/kg)',
        'K (mg/kg)'
      ]],
      body: rows
    });

    doc.save('Historial_ARA.pdf');

  };

  return (

    <section id="historial">

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px',
          marginBottom: '20px'
        }}
      >

        <h2>Historial de Análisis de Campo</h2>

        <Button
          variant="success"
          onClick={generarPDF}
        >
          Descargar PDF
        </Button>

      </div>

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {cargando ? (

        <div className="text-center my-5">

          <Spinner
            animation="border"
            variant="success"
          />

          <p style={{ marginTop: '10px' }}>
            Sincronizando con la base de datos...
          </p>

        </div>

      ) : (

        <Table
          striped
          bordered
          hover
          variant="dark"
          responsive
        >

          <thead>

            <tr>
              <th>Fecha y Hora</th>
              <th>N (mg/kg)</th>
              <th>P (mg/kg)</th>
              <th>K (mg/kg)</th>
            </tr>

          </thead>

          <tbody>

            {historial.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="text-center"
                >
                  No hay lecturas registradas aún.
                </td>

              </tr>

            ) : (

              historial.map((lectura) => (

                <tr key={lectura.id}>

                  <td>
                    {new Date(
                      lectura.created_at
                    ).toLocaleString('es-MX')}
                  </td>

                  <td>{lectura.nitrogen}</td>

                  <td>{lectura.phosphorus}</td>

                  <td>{lectura.potassium}</td>

                </tr>

              ))

            )}

          </tbody>

        </Table>

      )}

    </section>
  );
}

export default Historial;
