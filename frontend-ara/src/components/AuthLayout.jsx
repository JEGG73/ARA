import "./AuthLayout.css";

export default function AuthLayout({ children, title }) {
  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1 className="logo">ARA Web</h1>
        <p className="subtitle">Asistente Robótico Agrícola</p>

        <h2>{title}</h2>

        {children}

      </div>

    </div>
  );
} 