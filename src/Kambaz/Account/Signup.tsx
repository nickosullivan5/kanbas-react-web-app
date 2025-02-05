// import React from "react";
import { Link } from "react-router-dom";
import {Form} from "react-bootstrap";
export default function Signup() {
return (
    <div id="wd-signin-signup" className="container">
          <h1 className={"mb-3"}>Sign up</h1>
          <Form.Control id="wd-username"
                        placeholder="username"
                        className="mb-1"/>
          <Form.Control id="wd-password"
                        placeholder="password" type="password"
                        className="mb-1"/>
          <Form.Control id="wd-password-verify"
                        placeholder="verify password" type="password"
                        className="mb-1"/>
          <Link id="wd-signup-btn"
                to="/Kambaz/Account/Profile"
                className="btn btn-primary w-100  mb-2">
                Sign up </Link><br/>
          <Link id="wd-signin-link" to="/Kambaz/Account/Signin">Sign in</Link>
    </div>

)
      ;
}
