import React, { Component } from "react";
import "../Styles/Topnav.css";
//import logo from './mylogo.png';
import { connect } from "react-redux";
import propTypes from "prop-types";
import { addToCart } from "../Actions/CartActions";
import { getCartItems } from "./Cart";

import { Route, BrowseRouter as Router, Link, NavLink } from "react-router-dom";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draweropen: false
    };
  }

  opendrawer = () => {
    this.setState({
      draweropen: true
    });
  };

  closedrawer = () => {
    this.setState({
      draweropen: false
    });
  };

  render() {
    return (
      <div>
        {/*************************Phonenav ******************************************* */}

        <div>
          <div className="phonenav">
            <button
              onClick={() => this.opendrawer()}
              className="float-left toggle-butn"
            >
              <div className="butn-line"></div>
              <div className="butn-line"></div>
              <div className="butn-line"></div>
            </button>
            <li className="nav-items float-right">
              <NavLink className="nav-links" to="/cart">
                <i
                  style={{ color: "white", fontSize: 20, marginTop: -50 }}
                  className="fa fa-shopping-cart"
                  aria-hidden="true"
                ></i>
                <i
                  className={
                    localStorage["mycart"] ? "batch-count" : "empty-batch"
                  }
                >
                  {localStorage["mycart"]
                    ? JSON.parse(localStorage.getItem("mycart")).reduce(
                        (acc, curr) => acc + curr.quantity,
                        0
                      )
                    : null}
                </i>
              </NavLink>
            </li>
          </div>

          {this.state.draweropen == true ? (
            <div className="sidedrawer">
              <button className="closebtn" onClick={() => this.closedrawer()}>
                &times;
              </button>
              <ul className="col text-center drawer-items">
                <NavLink
                  onClick={() => this.closedrawer()}
                  className="nav-links"
                  to="/"
                >
                  <li>Home</li>
                </NavLink>
                <NavLink
                  onClick={() => this.closedrawer()}
                  className="nav-links"
                  to="/products"
                >
                  <li>Products</li>
                </NavLink>
                <NavLink
                  onClick={() => this.closedrawer()}
                  className="nav-links"
                  to="/categories"
                >
                  <li>Categories</li>
                </NavLink>
                {!localStorage.getItem("customer_token") ? (
                  <NavLink
                    onClick={() => this.closedrawer()}
                    className="nav-links"
                    to="/signup"
                  >
                    <li>Sign up</li>
                  </NavLink>
                ) : null}
                {!localStorage.getItem("customer_token") ? (
                  <NavLink
                    onClick={() => this.closedrawer()}
                    className="nav-links"
                    to="/login"
                  >
                    <li>Log in</li>
                  </NavLink>
                ) : null}
              </ul>

              {localStorage.getItem("customer_token") ? (
                <div
                  style={{ flexDirection: "row" }}
                  className="col text-center"
                >
                  <Link onClick={() => this.closedrawer()} to="/login">
                    <button
                      className="nav-logoutbutn"
                      onClick={() => localStorage.removeItem("customer_token")}
                    >
                      Logout Account
                    </button>
                  </Link>
                </div>
              ) : null}
            </div>
          ) : null}

          {/**********************************Desktop nav******************************************/}

          <div className="mynav">
            {/*<Link to="/"> <img   className="float-left logo" /></Link>*/}
            <ul className="nav-closer float-right ">
              <li className="nav-items">
                <NavLink className="nav-links" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-items">
                <NavLink className="nav-links" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-items">
                <NavLink className="nav-links" to="/categories">
                  Categories
                </NavLink>
              </li>
              <li className="nav-items">
                <NavLink className="nav-links" to="/contact">
                  Contact us
                </NavLink>
              </li>
              {localStorage.getItem("customer_token") ? (
                <li
                  onClick={() => localStorage.removeItem("customer_token")}
                  className="nav-items"
                >
                  <NavLink className="nav-links" to="/login">
                    Logout
                  </NavLink>
                </li>
              ) : null}
              {!localStorage.getItem("customer_token") ? (
                <li className="nav-items">
                  <NavLink className="nav-links" to="/signup">
                    Sign up
                  </NavLink>
                </li>
              ) : null}
              {!localStorage.getItem("customer_token") ? (
                <li className="nav-items">
                  <NavLink className="nav-links" to="/login">
                    Login
                  </NavLink>
                </li>
              ) : null}
              <li className="nav-items">
                <NavLink className="nav-links" to="/cart">
                  <i
                    style={{ color: "white" }}
                    className="fa fa-shopping-cart"
                    aria-hidden="true"
                  ></i>
                  <i
                    className={
                      localStorage["mycart"] ? "batch-count" : "empty-batch"
                    }
                  >
                    {localStorage["mycart"]
                      ? JSON.parse(localStorage.getItem("mycart")).reduce(
                          (acc, curr) => acc + curr.quantity,
                          0
                        )
                      : null}
                  </i>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    cart: state.cart
  }),
  {
    //fetchProducts,
    addToCart
  }
)(Nav);
