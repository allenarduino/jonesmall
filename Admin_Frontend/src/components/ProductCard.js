import React from "react";
import { Col } from "react-grid-system";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContextProvider";
import { ProductContext } from "../contexts/ProductContextProvider";
import { laptop, mobile } from "../responsive";
import * as Icon from "react-feather";
import Modal from "react-modal";

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
  ${mobile({ height: 60 })}
`;

const NameLabel = styled.div`
  font-weight: bold;
`;

const PriceLabel = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #e3405f;
`;

/***********************Style for modal******************** */

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

const HeaderText = styled.b`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 100px;
`;

const CancelButton = styled.button`
  width: 100px;
  background: #f2f2f2;
  border: 2px solid #f2f2f2;
  font-weight: bold;
  height: 30px;
  border-radius: 40px;
`;

const DeleteButton = styled.button`
  width: 100px;
  background: #e3405f;
  border: 2px solid #e3405f;
  color: #fff;
  margin-left: 10px;
  font-weight: bold;
  height: 30px;
  border-radius: 40px;
`;

const ProductCard = ({ product }) => {
  const { product_state, product_dispatch } = React.useContext(ProductContext);
  const { auth_state } = React.useContext(AuthContext);
  let url = auth_state.url;

  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(0);

  const openModal = id => {
    setOpen(true);
    setSelectedId(id);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const deleteProduct = id => {
    product_dispatch({ type: "DELETE_PRODUCT", payload: id });
    closeModal();
    //Sending http DELETE request to server
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(`${url}/product/${id}`, {
      method: "DELETE",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        // alert(data.message);
      })
      .catch(err => console.log(err));
  };
  return (
    <>
      <Col xs={6} sm={4} md={4} lg={3} xl={4} style={{ marginTop: 10 }}>
        <ProductHeader>
          <Icon.Trash
            style={{ position: "absolute", color: "#e3405f", margin: 10 }}
            onClick={() => openModal(product._id)}
          />
          <ProductImage src={`${url}/${product.image}`} />
        </ProductHeader>
        <ProductFooter>
          <NameLabel>{product.name}</NameLabel>
          <PriceLabel>GHC {product.price}</PriceLabel>
        </ProductFooter>
      </Col>

      <Modal isOpen={open} style={customStyle} onRequestClose={closeModal}>
        <HeaderText>Delete Product?</HeaderText>
        <ModalFooter>
          <CancelButton onClick={closeModal}>Cancel</CancelButton>
          <DeleteButton onClick={() => deleteProduct(selectedId)}>
            Delete
          </DeleteButton>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ProductCard;
