import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    console.log({
      email,
      password
    });

    setError("");
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