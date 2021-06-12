// Message Componet using Bootstrap

function Message({ type, message }) {
  return (
    <div
      className={`flex flex-col items-center p-3 w-full break-all ${
        type == "success" ? "bg-green-300" : "bg-red-300"
      }`}
    >
      <i
        className={`bi icon-40 ${
          type === "success"
            ? "bi-check-circle-fill"
            : "bi-x-circle-fill text-red-700"
        }`}
      ></i>
      <p
        className={`text-base font-normal text-center  ${
          type == "success" ? "text-green-700" : "text-red-700"
        }`}
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
