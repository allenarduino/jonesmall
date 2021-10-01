import styled from "styled-components";
import { laptop } from "../../responsive";

export const HomeBackgroundContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  flex: 1;
  background: #f2f2f2;
  justify-content: center;
  padding-bottom: 100px;
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;
  ${laptop({ width: "80%", right: 0 })}
`;

export const Title = styled.div`
  font-weight: bold;
  font-family: Cursive;
  font-size: 20px;
  margin-top: 50px;
`;

export const ViewAll = styled.div`
  font-weight: bold;
  align-self: flex-end;
  display: flex;
  margin-left: 10px;
  font-size: 15px;
`;
