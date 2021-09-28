import styled from "styled-components";

export const CategoryBackground = styled.div`
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

export const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const HeaderText = styled.h1`
  color: rgb(73, 8, 73);
  font-size: 50;
  font-weight: bold;
`;

export const CenterInput = styled.div`
  display: flex;
  justify-content: center;
`;

export const NameInput = styled.input`
  width: 80%;
  max-width: 500px;
  padding-left: 20px;
  font-size: 20px;
  height: 40px;
  margin-top: 20px;
  border-radius: 5px;
  border: 1px solid #3333;
`;

export const SelectInput = styled.select`
  background: transparent;
  width: 80%;
  max-width: 500px;
  height: 40px;
  border-radius: 5px;
  margin-top: 20px;
`;

export const DescriptionInput = styled.textarea`
  width: 80%;
  max-width: 500px;
  padding-left: 20px;
  font-size: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: 20px;
  border-radius: 5px;
  border: 1px solid #3333;
`;

export const FileInput = styled.input`
  display: none;
  align-self: flex-start;
`;

export const ChooseImgBox = styled.div`
  border: 1px dotted black;
  margin-top: 30px;
  height: 80px;
  align-self: center;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const ImagePreview = styled.img`
  margin-top: 30px;
  height: 80px;
  width: 80px;
  border-radius: 10px;
  align-self: flex-start;
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
  width: 320px;
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
