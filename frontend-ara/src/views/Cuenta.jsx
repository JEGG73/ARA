import { useState, useEffect } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";

function Cuenta({ authVista, setAuthVista, setVistaActiva, agrobotId, setAgrobotId }) {

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('ara_token'));
  const [nuevoMac, setNuevoMac] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('ara_token'));
  }, [authVista]);

  const handleLogout = async () => {
    const token = localStorage.getItem('ara_token');

    try {
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error("Error al revocar token en el backend:", error);
    }

    localStorage.removeItem('ara_token');
    setIsLoggedIn(false);

    setAuthVista('login');
    alert("Sesión cerrada de forma segura");

    if (setVistaActiva) {
      setVistaActiva('dashboard');
    }
  };

  const registrarAgrobot = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('ara_token');

    try {
      const response = await fetch('http://localhost:8000/api/agrobots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          mac_address: nuevoMac,
          name: nuevoNombre,
          is_active: true
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert("¡Agrobot registrado con éxito!");
      setAgrobotId(data.agrobot.id);
      setNuevoMac("");
      setNuevoNombre("");

    } catch (err) {
      alert("Error al registrar: " + err.message);
    }
  };

  if (isLoggedIn) {
    return (
      <section className="cuenta-section animate__animated animate__fadeIn">
        <div className="auth-layout" style={{ maxWidth: '500px', margin: '40px auto', color: 'white' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Panel SaaS</h2>

          {/* Tarjeta de Selección */}
          <div className="dashboard-card" style={{ padding: '20px', marginBottom: '20px', background: '#1a1a1a' }}>
            <h3>Mi Hardware</h3>
            <div style={{ margin: '15px 0' }}>
              <label>Agrobot Activo: </label>
              <input
                type="number"
                value={agrobotId}
                onChange={(e) => setAgrobotId(e.target.value)}
                placeholder="ID del Agrobot (ej. 1)"
                style={{ marginLeft: '10px', width: '100px', padding: '5px' }}
              />
              <p style={{ fontSize: '12px', color: '#888', marginTop: '10px' }}>
                *En el futuro este campo será un menú desplegable (Select) que cargará tu lista de equipos automáticamente.
              </p>
            </div>
          </div>

          {/* Formulario de Registro de Nuevo Agrobot */}
          <div className="dashboard-card" style={{ padding: '20px', marginBottom: '30px', background: '#1a1a1a' }}>
            <h3>Registrar Nuevo Equipo</h3>
            <form onSubmit={registrarAgrobot} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
              <input
                type="text"
                placeholder="Nombre (ej. ARA Sector Norte)"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
                required
                style={{ padding: '10px' }}
              />
              <input
                type="text"
                placeholder="Dirección MAC (ej. 24:6F:28:A1:B2:C3)"
                value={nuevoMac}
                onChange={(e) => setNuevoMac(e.target.value)}
                required
                style={{ padding: '10px' }}
              />
              <button type="submit" style={{ background: '#00ff88', color: 'black', padding: '10px', fontWeight: 'bold' }}>
                Vincular Hardware
              </button>
            </form>
          </div>

          <button onClick={handleLogout} style={{ background: '#ff3333', color: 'white', padding: '12px 20px', width: '100%', fontWeight: 'bold' }}>
            Cerrar Sesión
          </button>
        </div>
      </section>
    );
  }

  // CORRECCIÓN 5: VISTA 2: Usuario sin iniciar sesión (Faltaba este return)
  return (
    <section className="cuenta-section">
      <div className="auth-buttons">
        <button onClick={() => setAuthVista('login')}>Login</button>
        <button onClick={() => setAuthVista('register')}>Registro</button>
        <button onClick={() => setAuthVista('forgot')}>Recuperar</button>
      </div>

      {authVista === 'login' && <Login setVistaActiva={setVistaActiva} />}
      {authVista === 'register' && <Register setVistaActiva={setVistaActiva} />}
      {authVista === 'forgot' && <ForgotPassword />}
      {authVista === 'reset' && <ResetPassword />}
    </section>
  );
}

export default Cuenta;