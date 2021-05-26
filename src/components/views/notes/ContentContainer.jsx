import { Form } from "react-bootstrap";

function ContentContainer() {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <header
        style={{
          height: "80px",
          color: "white",
        }}
        className="bg-primary"
      >
        Header
      </header>
      <div
        style={{
          padding: "30px 100px",
          color: "white",
        }}
        className="bg-secondary"
      >
        <span
          style={{
            fontSize: "18px",
            fontWeight: "700",
          }}
        >
          New Note
        </span>
        <i
          class="bi bi-pencil ml-5"
          style={{
            cursor: "pointer",
          }}
          onClick={() => {}}
        ></i>
        <div
          style={{
            width: "200px",
          }}
        >
          <Form.Control
            type="text"
            style={{
              width: "100%",
            }}
          />
          <i
            class="bi bi-save"
          ></i>
        </div>
      </div>
    </div>
  );
}
export default ContentContainer;
