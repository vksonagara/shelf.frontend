import { Link } from "react-router-dom";

// App Logo
function AppLogo() {
  return (
    <h2
      className=""
      // style={{
      //   margin: "2rem",
      //   fontWeight: "bold",
      // }}
    >
      <Link to="/">Shelf</Link>
    </h2>
  );
}

export default AppLogo;
