import React from "react";
import { Col } from "react-grid-system";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContextProvider";
import { laptop, mobile } from "../responsive";
import * as Icon from "react-feather";
import Modal from "react-modal";
import { CategoryContext } from "../contexts/CategoryContextProvider";
import { Link, useHistory } from "react-router-dom";

const ProductHeader = styled.div`
  overflow: hidden;
  position: relative;
  ${laptop({ height: 300 })}
  ${mobile({ height: 150 })}
`;

const ProductImage = styled.img`
  height: 100%;
  overflow: auto;
  filter: brightness(55%);
  width: 100%;
  bottom: 0;
  border-radius: 10px;
`;

const DeleteIconContainer = styled.div`
  font-weight: bold;
  position: absolute;
  z-index: 20;
`;

const NameLabel = styled.div`
  font-weight: bold;
  font-size: 30px;
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  font-size: 19px;
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

const CategoryCard = ({ category }) => {
  const history = useHistory();
  const { category_dispatch } = React.useContext(CategoryContext);
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

  return (
    <>
      <Col xs={6} sm={4} md={4} lg={3} xl={4} style={{ marginTop: 10 }}>
        <ProductHeader
          onClick={() =>
            history.push("/single_category", {
              category_id: category._id
            })
          }
        >
          <ProductImage src={`${url}/${category.image}`} />
          <NameLabel>{category.name}</NameLabel>
        </ProductHeader>
      </Col>
    </>
  );
};

export default CategoryCard;
