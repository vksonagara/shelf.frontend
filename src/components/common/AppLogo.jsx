import { Link } from "react-router-dom";

// App Logo
function AppLogo(prop) {
  return (
    <Link to="/" className={prop.margin}>
      <img
        src="https://storage.googleapis.com/staging_shelf/Shelf.svg"
        alt="Shelf Image"
        width={prop.width}
        height={prop.height}
      />
    </Link>
  );
}

export default AppLogo;
