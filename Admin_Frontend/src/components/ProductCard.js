import React from "react";
import { Col } from "react-grid-system";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContextProvider";
import { laptop, mobile } from "../responsive";
import * as Icon from "react-feather";

const ProductHeader = styled.div`
  overflow: hidden;
  position: relative;
  ${laptop({ height: 300 })}
  ${mobile({ height: 150 })}
`;

const ProductImage = styled.img`
  height: 100%;
  overflow: auto;
  width: 100%;
  bottom: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const ProductFooter = styled.div`
  height: 100px;
  background-color: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  -ms-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  ${mobile({ height: 60, borderRadius: 2 })}
`;

const NameLabel = styled.div`
  font-weight: bold;
`;

const PriceLabel = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #e3405f;
`;

const ProductCard = ({ product }) => {
  const { auth_state } = React.useContext(AuthContext);
  let url = auth_state.url;
  return (
    <Col xs={6} sm={4} md={4} lg={3} xl={4} style={{ marginTop: 10 }}>
      <ProductHeader>
        <Icon.Trash
          style={{ position: "absolute", color: "#e3405f", margin: 10 }}
        />
        <ProductImage src={`${url}/${product.image}`} />
      </ProductHeader>
      <ProductFooter>
        <NameLabel>{product.name}</NameLabel>
        <PriceLabel>GHC {product.price}</PriceLabel>
      </ProductFooter>
    </Col>
  );
};

export default ProductCard;
