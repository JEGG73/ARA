import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";

export default function ResetPassword() {

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !token || !password || !confirmPassword) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setCargando(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch('http://localhost:8000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email,
          token,
          password,
          password_confirmation: confirmPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al actualizar la contraseña. Verifica el token.");
      }

      setSuccess("Tu contraseña ha sido actualizada con éxito. Ya puedes iniciar sesión.");

      setEmail("");
      setToken("");
      setPassword("");
      setConfirmPassword("");

    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <AuthLayout title="Nueva Contraseña">

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Confirma tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={cargando}
        />

        <input
          type="text"
          placeholder="Pega el token de tu correo"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          disabled={cargando}
        />

        <input
          type="password"
          placeholder="Nueva contraseña"
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
          {cargando ? 'Actualizando...' : 'Cambiar contraseña'}
        </button>
      </form>
    </AuthLayout>
  );
}