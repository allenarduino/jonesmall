import React from "react";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { Fade } from "react-reveal";

import {
  TextField,
  LoginBackground,
  Button,
  CenterInput,
  HeaderText,
  Form,
  ErrorMessage,
  LoadingButton,
  LinkText
} from "./styles";

const Signup = () => {
  const history = useHistory();
  const { auth_state, auth_dispatch } = React.useContext(AuthContext);
  let url = auth_state.url;

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, controlLoading] = React.useState(false);

  const handle_name_change = e => {
    setName(e.target.value);
  };

  const handle_email_change = e => {
    setEmail(e.target.value);
  };

  const handle_password_change = e => {
    setPassword(e.target.value);
  };

  const signup = e => {
    e.preventDefault();
    controlLoading(true);
    const data = {
      name: name,
      email: email,
      password: password
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch(`${url}/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        controlLoading(true);
        if (data.error == null) {
          alert(data.message);
          history.push("/login");
        } else {
          setError(data.error);
          controlLoading(false);
        }
      })
      .catch(err => {
        alert(err);
        controlLoading(false);
      });
  };

  return (
    <LoginBackground>
      <Fade bottom duration={900} distance="40px">
        <CenterInput>
          <HeaderText>Sign Up</HeaderText>
        </CenterInput>
        <Form onSubmit={signup}>
          <CenterInput>
            <TextField
              onChange={handle_name_change}
              required
              type="text"
              placeholder="Full Name"
              value={name}
              name="name"
            />
          </CenterInput>
          <CenterInput>
            <TextField
              onChange={handle_email_change}
              required
              type="email"
              placeholder="Email Address"
              value={email}
              name="email"
            />
          </CenterInput>
          <CenterInput>
            <ErrorMessage>{error}</ErrorMessage>
          </CenterInput>
          <CenterInput>
            <TextField
              onChange={handle_password_change}
              required
              type="password"
              placeholder="Password"
              value={password}
              name="password"
            />
          </CenterInput>
          <CenterInput>
            {loading ? (
              <LoadingButton>Loading...</LoadingButton>
            ) : (
              <Button value="Submit" type="submit" />
            )}
          </CenterInput>
          <CenterInput>
            <LinkText>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: " rgb(73, 8, 73)",
                  textDecoration: "none"
                }}
              >
                Log in
              </Link>
            </LinkText>
          </CenterInput>
        </Form>
      </Fade>
    </LoginBackground>
  );
};

export default Signup;
