import React from "react";
import { ProductContext } from "../../contexts/ProductContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { Row } from "react-grid-system";
import ProductCard from "../../components/ProductCard";
import styled from "styled-components";
import { laptop } from "../../responsive";
import { Fade } from "react-reveal";

export const ProductBackground = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  flex: 1;
  background: #f2f2f2;
  padding-top: 100px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 70px;
  position: fixed;
  justify-content: center;
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;

  ${laptop({ width: "80%", right: 0 })}
`;

const customStyle = {
  content: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 20,
    margin: "100px auto",
    height: 200,
    width: 200
  }
};

const Products = () => {
  const { product_state, product_dispatch } = React.useContext(ProductContext);
  const { auth_state } = React.useContext(AuthContext);
  let url = auth_state.url;

  const fetch_products = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(`${url}/products`, {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        product_dispatch({ type: "FETCH_PRODUCTS", payload: data });
      })
      .catch(err => console.log(err));
  };

  React.useEffect(() => {
    fetch_products();
  }, []);

  return (
    <>
      <ProductBackground>
        <Fade bottom duration={900} distance="40px">
          <Row>
            {product_state.products.map(product => (
              <ProductCard product={product} />
            ))}
          </Row>
        </Fade>
      </ProductBackground>
    </>
  );
};

export default Products;
