// Message Componet using Bootstrap

function Message({ type, message }) {
  return (
    <div variant={type} className={`d-flex flex-column align-items-center`}>
      <i
        className={`bi icon-40 ${
          type === "success" ? "bi-check-circle-fill" : "bi-x-circle-fill"
        }`}
      ></i>
      <p
        className="m-0"
        style={{
          fontSize: "15px",
          fontWeight: "400",
          textAlign: "center",
        }}
      >
        {message}
      </p>
    </div>
  );
}

function SuccessMessage({ message }) {
  return <Message type="success" message={message} />;
}

function DangerMessage({ message }) {
  return <Message type="danger" message={message} />;
}

export { Message, SuccessMessage, DangerMessage };
