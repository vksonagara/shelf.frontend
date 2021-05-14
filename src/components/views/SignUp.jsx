import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


function SignUp() {
  return (
    <div className = "d-flex flex-column align-items-center">
        <i className="bi bi-bootstrap-fill icon-40 mt-4"></i>
      <section  className = "d-flex flex-column align-items-center" style = {{
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",
          marginTop: "1rem",
          padding: "1rem 2rem",
          maxWidth: "400px",
          boxSizing: "border-box"
      }}>
        <h5 style = {{
            color: "rgb(94, 108, 132)",
            fontSize: "16px",
            margin: "1.25rem 0",
            fontWeight: "700"
        }}>Sign up for your account</h5>
        <Form.Control type="text" placeholder="First name" className="input" />
        <Form.Control type="text" placeholder="Last name" className="input" />
        <Form.Control
          type="email"
          placeholder="Enter email"
          className="input"
        />
        <Form.Control
          type="password"
          placeholder="Enter password"
          className="input"
        />
        <p style = {{
            color: "#5E6C84",
            fontSize: "12px",
            lineHeight: "1rem",
            marginTop: "0.5rem"
        }}>
          By signing up, I accept the
          <Link to="/terms"> Terms of Service</Link> and acknowledge the 
          <Link to="/privacy"> Privacy Policy</Link> .
        </p>
        <Button variant="primary" block className = "m-3" style = {
          {
            fontSize: "14px"
          }
        }>Sign Up</Button>{' '}
        <p>Or</p>
        <Button  block className= "d-flex flex-row align-items-center justify-content-center" variant = "light">
            <img src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.232/static/media/google-logo.c21ca9d1.svg" alt=""  width = "20" height = "20" />
            <span style = {{
                color: "#505f79",
                fontSize: "14px",
                fontWeight: "600",
                marginLeft: "0.25rem"
            }}>Continue with Google</span></Button>{' '}
             <Link to = "/signin" style = {{
                 fontSize: "0.85rem",
                 margin: "1rem 0"
             }}>
             Already have an account? Sign In
            </Link>
      </section>
    </div>
  );
}

export default SignUp;
