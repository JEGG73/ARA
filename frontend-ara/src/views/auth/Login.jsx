import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";

export default function Login({ setVistaActiva }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Credenciales incorrectas");
      }

      localStorage.setItem('ara_token', data.access_token);

      setError("");
      alert("¡Inicio de sesión exitoso!");

      if (setVistaActiva) {
        setVistaActiva('lecturas');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout title="Iniciar Sesión">

      {error && <p className="error">{error}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Entrar
        </button>

      </form>

      <p className="auth-link">
        ¿Olvidaste tu contraseña?
      </p>

    </AuthLayout>
  );
}