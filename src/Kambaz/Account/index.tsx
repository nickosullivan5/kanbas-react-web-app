import { Routes, Route, Navigate } from "react-router";

import Signin from "./Signin.tsx";
import Profile from "./Profile.tsx";
import Signup from "./Signup.tsx";
import AccountNavigation from "./Navigation.tsx";
export default function Account() {
  return (
      <div id="wd-account-screen" className="ps-4e">
        <div className="d-flex">
          <div className="d-none d-md-block">
            <AccountNavigation/>
          </div>
          <div className={"w-50"}>
          <Routes>
            <Route path="/" element={<Navigate to="/Kambaz/Account/Signin"/>}/>
            <Route path="/Signin" element={<Signin/>}/>
            <Route path="/Profile" element={<Profile/>}/>
            <Route path="/Signup" element={<Signup/>}/>
          </Routes>
          </div>
        </div>
      </div>
        );}
