import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";

function Cuenta({ authVista, setAuthVista }) {

  return (

    <section className="cuenta-section">

      <div className="auth-buttons">

        <button onClick={() => setAuthVista('login')}>
          Login
        </button>

        <button onClick={() => setAuthVista('register')}>
          Registro
        </button>

        <button onClick={() => setAuthVista('forgot')}>
          Recuperar
        </button>

      </div>

      {authVista === 'login' && <Login />}
      {authVista === 'register' && <Register />}
      {authVista === 'forgot' && <ForgotPassword />}
      {authVista === 'reset' && <ResetPassword />}

    </section>
  );
}

export default Cuenta;