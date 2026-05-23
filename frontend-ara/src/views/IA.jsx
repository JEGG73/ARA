function IA({
  mensajes,
  cargandoIA,
  inputChat,
  setInputChat,
  enviarMensajeIA
}) {

  return (

    <section id="chat">

      <h2>ARA IA</h2>

      <div className="chat-container">

        <div className="historial-mensajes">

          {mensajes.map((msg, i) => (
            <div
              key={i}
              className={msg.rol === 'usuario'
                ? 'mensaje-usuario'
                : 'mensaje-ia'}
            >
              {msg.texto}
            </div>
          ))}

          {cargandoIA && (
            <div className="mensaje-ia">
              Analizando...
            </div>
          )}

        </div>

        <div className="chat-input-area">

          <input
            value={inputChat}
            onChange={(e) => setInputChat(e.target.value)}
            onKeyDown={(e) =>
              e.key === 'Enter' && enviarMensajeIA()
            }
            placeholder="Escribe..."
          />

          <button onClick={enviarMensajeIA}>
            Enviar
          </button>

        </div>

      </div>

    </section>
  );
}

export default IA;