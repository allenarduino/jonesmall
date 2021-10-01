import React from "react";
import BackgroundImage from "../../components/BackgroundImage";
import {
  HomeBackgroundContainer,
  Title,
  ViewAll,
  TitleContainer
} from "./styles";
import { ProductContext } from "../../contexts/ProductContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { Fade } from "react-reveal";
import { Row } from "react-grid-system";
import ProductCard from "../../components/ProductCard";
import { CategoryContext } from "../../contexts/CategoryContextProvider";
import CategoryCard from "../../components/CategoryCard";

const Home = () => {
  const { category_state, category_dispatch } = React.useContext(
    CategoryContext
  );
  const { product_state, product_dispatch } = React.useContext(ProductContext);
  const { auth_state } = React.useContext(AuthContext);
  let url = auth_state.url;

  const fetch_products = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(`${url}/latest_products`, {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        product_dispatch({ type: "FETCH_PRODUCTS", payload: data });
      })
      .catch(err => console.log(err));
  };

  const fetch_categories = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(`${url}/latest_categories`, {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        category_dispatch({ type: "FETCH_CATEGORIES", payload: data });
      })
      .catch(err => console.log(err));
  };

  React.useEffect(() => {
    fetch_products();
    fetch_categories();
  }, []);
  return (
    <HomeBackgroundContainer>
      <BackgroundImage />
      <Fade bottom duration={900} distance="40px">
        <Title>Latest Products</Title>
        <Row style={{ paddingLeft: 10, paddingRight: 10 }}>
          {product_state.products.map(product => (
            <ProductCard product={product} />
          ))}
        </Row>
      </Fade>
      <Fade bottom duration={900} distance="40px">
        <Title>Latest Categories</Title>
        <Row style={{ paddingLeft: 10, paddingRight: 10 }}>
          {category_state.categories.map(category => (
            <CategoryCard category={category} />
          ))}
        </Row>
      </Fade>
    </HomeBackgroundContainer>
  );
};

export default Home;
