import { Table } from 'react-bootstrap';

function Historial() {

  return (

    <section id="historial">

      <h2>Historial de Análisis de Campo</h2>

      <Table striped bordered hover variant="dark" responsive>

        <thead>
          <tr>
            <th>Fecha</th>
            <th>Sector</th>
            <th>N</th>
            <th>P</th>
            <th>K</th>
          </tr>
        </thead>

        <tbody>
          <tr><td>2026-04-06</td><td>Norte</td><td>42</td><td>14</td><td>6.4</td></tr>
          <tr><td>2026-04-05</td><td>Norte</td><td>44</td><td>11</td><td>6.5</td></tr>
          <tr><td>2026-04-04</td><td>Sur</td><td>38</td><td>18</td><td>6.8</td></tr>
        </tbody>

      </Table>

    </section>
  );
}

export default Historial;