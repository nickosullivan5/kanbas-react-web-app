import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Signin() {
  return (
      <div id="wd-signin-screen" className="container">
          <h1 className={"mb-3"}>Signin</h1>
          <Form.Control id="wd-username"
                        placeholder="username"
                        className="mb-1"/>
          <Form.Control id="wd-password"
                        placeholder="password" type="password"
                        className="mb-3"/>
          <Link id="wd-signin-btn"
                to="/Kambaz/Account/Profile"
                className="btn btn-primary w-100  mb-2">
              Sign in </Link><br/>
          <Link id="wd-signup-link" to="/Kambaz/Account/Signup">Sign up</Link>
      </div>
  );
}
