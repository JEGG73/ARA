import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";

export default function ResetPassword() {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setSuccess("Contraseña actualizada");
    setError("");
  };

  return (
    <AuthLayout title="Nueva Contraseña">

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>

        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit">
          Cambiar contraseña
        </button>

      </form>

    </AuthLayout>
  );
}