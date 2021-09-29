import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory, Link, NavLink } from "react-router-dom";
import my_avatar from "../images/avatar.jpg";
import List from "@material-ui/core/List";

const NavContainer = styled.div`
  width: 20%;
  margin-top: 15px;
  background-color: white;
  height: 100vw;
  position: fixed;
  z-index: 10;
  ${mobile({ display: "none" })}
`;

const Button = styled.button`
  background-color: rgb(73, 8, 73);
  border: 2px solid rgb(73, 8, 73);
  color: #fff;
  width: 100px;
  font-size: 15px;
  font-weight: bold;
  border-radius: 5px;
`;

const Avatar = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 80px;
`;

const NameText = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-top: -10px;
`;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    backgroundColor: "rgb(73, 8, 73)"
  },
  listContainer: {
    justifyContent: "center",
    display: "flex",
    color: "#333"
  }
}));

const SideNav = () => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  return (
    <NavContainer>
      <List className={classes.listContainer}>
        <Avatar src={my_avatar} />
      </List>
      <List className={classes.listContainer}>
        <NameText>Admin</NameText>
      </List>

      <Link to="/my_customers" style={{ textDecoration: "none" }}>
        <List className={classes.listContainer}>My Customers</List>
      </Link>
      <Link to="/my_products" style={{ textDecoration: "none" }}>
        <List className={classes.listContainer}>My Products</List>
      </Link>
      <Link to="/my_categories" style={{ textDecoration: "none" }}>
        <List className={classes.listContainer}>Categories</List>
      </Link>
      <Link to="/manage_orders" style={{ textDecoration: "none" }}>
        <List className={classes.listContainer}>Manage Orders</List>
      </Link>
      <List></List>
      <List className={classes.listContainer}>
        <Button onClick={() => history.push("/add_product")}>
          Add Product
        </Button>
      </List>
      <List className={classes.listContainer}>
        <Button onClick={() => history.push("/add_category")}>
          Add Category
        </Button>
      </List>
    </NavContainer>
  );
};
export default SideNav;
