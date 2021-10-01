import styled from "styled-components";

export const LoginBackground = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  flex: 1;
  background: #f2f2f2;
  overflow: auto;
  padding-bottom: 70px;
  position: fixed;
  justify-content: center;
  overflow: auto;
`;

export const HeaderText = styled.h1`
  color: rgb(73, 8, 73);
  font-size: 30px;
  margin-top: 60px;
  margifont-weight: bold;
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const CenterInput = styled.div`
  display: flex;
  justify-content: center;
`;

export const TextField = styled.input`
  width: 80%;
  max-width: 500px;
  padding-left: 20px;
  font-size: 20px;
  height: 40px;
  margin-top: 20px;
  border-radius: 5px;
  border: 1px solid #3333;
`;

export const ErrorMessage = styled.b`
  color: red;
  font-size: 18px;
`;

export const Button = styled.input`
  width: 80%;
  max-width: 500px;
  padding-left: 20px;
  font-size: 15px;
  font-weight: bold;
  height: 40px;
  margin-top: 20px;
  border-radius: 5px;
  background-color: rgb(73, 8, 73);
  color: #fff;
  border: 2px solid rgb(73, 8, 73);
`;

export const LoadingButton = styled.button`
  width: 80%;
  max-width: 500px;
  padding-left: 20px;
  font-size: 15px;
  font-weight: bold;
  height: 40px;
  margin-top: 20px;
  border-radius: 5px;
  background-color: rgb(73, 8, 73);
  color: #fff;
  border: 2px solid rgb(73, 8, 73);
`;

export const LinkText = styled.a`
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  margin-top: 10px;
`;
