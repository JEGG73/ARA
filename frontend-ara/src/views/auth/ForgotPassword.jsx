import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email);

    setSuccess("Correo enviado correctamente");
  };

  return (
    <AuthLayout title="Recuperar Contraseña">

      {success && <p className="success">{success}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">
          Enviar enlace
        </button>

      </form>

    </AuthLayout>
  );
}