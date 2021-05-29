import { Spinner } from "react-bootstrap";

// Loader Componet

function Loader() {
  return (
    <div
      style={{
        height: "100vh",
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loader;
