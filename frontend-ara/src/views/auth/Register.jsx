import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";

export default function Register({ setVistaActiva }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setCargando(true);
    setError("");

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: confirmPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al crear la cuenta");
      }

      localStorage.setItem('ara_token', data.access_token);

      alert("¡Cuenta creada con éxito! Bienvenido a ARA Web.");

      if (setVistaActiva) {
        setVistaActiva('lecturas');
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <AuthLayout title="Crear Cuenta">

      {error && <p className="error">{error}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={cargando}
        />

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={cargando}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={cargando}
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={cargando}
        />

        <button type="submit" disabled={cargando}>
          {cargando ? 'Creando cuenta...' : 'Registrarse'}
        </button>

      </form>

    </AuthLayout>
  );
}