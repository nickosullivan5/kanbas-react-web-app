import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import {Button, FormControl} from "react-bootstrap";
import * as client from "./client";

export default function Signin()
{
    const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const signin = async () => {
    const user =  await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kambaz/Dashboard");
  };


    return (
      <div id="wd-signin-screen" className="container">
          <h1 className={"mb-3"}>Signin</h1>
          <FormControl defaultValue={credentials.username}
             onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
 id="wd-username"
                        placeholder="username"
                        className="mb-1"/>
          <FormControl defaultValue={credentials.password}
             onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
 id="wd-password"
                        placeholder="password" type="password"
                        className="mb-3"/>
             <Button onClick={signin} id="wd-signin-btn" className="w-100" > Sign in </Button>
          <Link id="wd-signup-link" to="/Kambaz/Account/Signup">Sign up</Link>
      </div>
  );
}
