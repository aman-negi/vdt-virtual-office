import { Button } from "react-bootstrap";
import "../../css/login.css";
import { auth } from "../../initfirebase";
import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "./Auth.js";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;

      try {
        await auth.signInWithEmailAndPassword(email.value, password.value);
        history.push("/dashboard");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="Complete-Body">
      <div className="login-box">
        <form className="login-form" onSubmit={handleLogin}>
          <center>
            <h2>Login</h2>
          </center>
          <div className="form-input">
            <label>Email-ID : </label>
            <input
            style={{borderRadius:5}}
              name="email"
              type="email"
              placeholder=" "
              className="form-control-material"
            ></input>
          </div>
          <div className="form-input">
            <label>Password : </label>
            <input
            style={{borderRadius:5}}
              name="password"
              type="password"
              placeholder=" "
              className="form-control-material"
            ></input>
          </div>
          <div>
          <Button type="submit">submit</Button>
          </div>
          <div>
          Don't have a account ?<a href="/signup"> Sign Up here</a>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
