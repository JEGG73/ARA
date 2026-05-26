import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Por favor, ingresa tu correo electrónico");
      return;
    }

    setCargando(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch('http://localhost:8000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "No pudimos enviar el enlace de recuperación");
      }

      setSuccess("¡Enlace enviado! Revisa tu bandeja de entrada o tu bandeja de Mailtrap.");
      setEmail("");
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <AuthLayout title="Recuperar Contraseña">

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={cargando}
        />

        <button type="submit" disabled={cargando}>
          {cargando ? 'Enviando...' : 'Enviar enlace'}
        </button>
      </form>
    </AuthLayout>
  );
}