import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import img1 from "../images/home1.jpg";
import img2 from "../images/Homeimage.jpeg";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 500px;
  left: 0;
  right: 0;
  width: 100%;
  overflow: auto;
  background-image: url(${img1});
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-size: cover;
  ${mobile({ backgroundImage: `url(${img2})` })}
`;

const BackgroundText1 = styled.h1`
  color: white;
  margin-top: 100px;
  font-family: Cursive;
  font-size: 50px;
  text-align: center;
  ${mobile({ marginTop: "100px", fontSize: "40px" })}
`;

const BackgroundText2 = styled.h2`
  color: white;
  font-family: Cursive;
  margin-top: 40px;
  font-size: 40px;
  text-align: center;
  ${mobile({ color: "white", marginTop: "20px", fontSize: "25px" })}
`;

const ButtonContainer = styled.div`
  margin-top: 100px;
`;

const CategoryButton = styled.button`
  margin-left: 20px;
  background-color: transparent;
  border: 3px solid white;
  color: white;
  width: 100px;
  border-radius: 5px;
`;

const ProductButton = styled.button`
  margin-left: 20px;
  background-color: rgb(73, 8, 73);
  border: 3px solid rgb(73, 8, 73);
  color: white;
  width: 100px;
  border-radius: 5px;
`;

const BackgroundImage = () => {
  return (
    <Container>
      <BackgroundText1>
        <b>Welcome to Jones Mall</b>
      </BackgroundText1>
      <BackgroundText2>
        <Typewriter
          options={{
            strings: [
              "Your online store",
              "Easy shoppping",
              "Shop at home",
              "View categories"
            ],
            autoStart: true,
            loop: true,
            pauseFor: 600
          }}
        />
      </BackgroundText2>
    </Container>
  );
};

export default BackgroundImage;
