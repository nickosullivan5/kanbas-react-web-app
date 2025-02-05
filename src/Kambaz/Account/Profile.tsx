import { Link } from "react-router-dom";
import {Form} from "react-bootstrap";
export default function Profile() {
  return (
      <div id="wd-profile-screen" className="container">
          <h1 className={"mb-3"}>Profile</h1>
          <Form.Control id="wd-username"
                        defaultValue="alice"
                        placeholder="username"
                        className="mb-1"/>
          <Form.Control id="wd-password"
                        defaultValue="123"
                        placeholder="password" type="password"
                        className="mb-1"/>
          <Form.Control id="wd-firstname"
                        defaultValue="Alice"
                        placeholder="First Name"
                        className="mb-1"/>
          <Form.Control id="wd-lastname"
                        defaultValue="Wonderland"
                        placeholder="Last Name"
                        className="mb-1"/>
          <Form.Control id="wd-wd-dob"
                        defaultValue="mm/dd/yyyy"
                        className="mb-1"
                         type="date"/>
          <Form.Control id="wd-email"
                        defaultValue="alice@wonderland"
                        type="email"
                        className="mb-1"/>
          <Form.Select id="wd-role" defaultValue="USER" className="mb-3">
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="FACULTY">FACULTY</option>
                        <option value="STUDENT">STUDENT</option>
        </Form.Select>

          <Link id="wd-signup-btn"
                to="/Kambaz/Account/Signin"
                className="btn btn-danger w-100  mb-2">
              Sign out </Link>

    </div>
);}
