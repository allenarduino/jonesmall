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
export const FormContainer = styled.div`
  @media (max-width: ${400}px) {
    width: 250px;
    padding: 22px 35px 22px 35px;
  }
  width: 400px;
  /*background: #fff;*/
  border-radius: 2px;
  padding: 30px 55px 33px 55px;
  margin: 0 auto;
  /* box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  -ms-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);*/
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

export const FileInput = styled.input`
  display: none;
  width: 80%;
  max-width: 500px;
`;

export const FileLabel = styled.label`
  width: 80%;
  max-width: 500px;
`;

export const ChooseImgBox = styled.div`
  border: 1px dotted rgb(73, 8, 73);
  height: 80px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const ImageBox = styled.div`
  height: 80px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const ImagePreview = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 10px;
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
