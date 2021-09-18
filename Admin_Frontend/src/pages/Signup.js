import React from "react";
import { useHistory, Link } from "react-router-dom";

import {
  FormContainer,
  LoginInput,
  LoginBackground,
  Button,
  CenterInput,
  HeaderText,
  LoginFooter,
  LinkText
} from "../components/LoginStyle";

const [name, setName] = React.useState("");
const [email, setEmail] = React.useState("");
const [password, setPassword] = React.useState("");
const [error, setError] = React.useState("");
const [loading, controlLoading] = React.useState(false);

const Signup = () => {
  const history = useHistory();

  const signup = e => {
    e.preventDefault();
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
      <HeaderText>Register for Merllon</HeaderText>
      <FormContainer>
        <CenterInput>
          <LoginInput required type="text" placeholder="Full Name" />
        </CenterInput>
        <CenterInput>
          <LoginInput required type="email" placeholder="Email Address" />
        </CenterInput>
        <CenterInput>
          <LoginInput required type="password" placeholder="Password" />
        </CenterInput>
        <CenterInput>
          <Button>Login</Button>
        </CenterInput>
        <CenterInput>
          <LoginFooter>
            Already have an account?{" "}
            <LinkText onClick={() => history.push("/login")}>Login</LinkText>
          </LoginFooter>
        </CenterInput>
      </FormContainer>
    </LoginBackground>
  );
};

export default Signup;
