import React from "react";
import clsx from "clsx";
import styled from "styled-components";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useHistory, Link, NavLink } from "react-router-dom";
import my_avatar from "../images/avatar.jpg";
import { AuthContext } from "../contexts/AuthContextProvider";
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

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    backgroundColor: "rgb(73, 8, 73)"
  },
  listContainer: {
    justifyContent: "center",
    display: "flex",
    color: "#333"
  },

  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  textlogo: {
    fontFamily: "Cursive"
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

const DrawerNav = () => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const { auth_state } = React.useContext(AuthContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        /* className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}*/
        className={classes.root}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.textlogo}>
            Jones Mall
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {auth_state.isLoggedIn ? (
          <List className={classes.listContainer}>
            <Avatar src={my_avatar} />
          </List>
        ) : null}
        {auth_state.isLoggedIn ? (
          <List className={classes.listContainer}>
            {auth_state.user.map(user => (
              <NameText>{user.name}</NameText>
            ))}
          </List>
        ) : null}

        <Link
          onClick={handleDrawerClose}
          to="/"
          style={{ textDecoration: "none" }}
        >
          <List onClick={handleDrawerClose} className={classes.listContainer}>
            Home
          </List>
        </Link>
        <Link
          onClick={handleDrawerClose}
          to="/products"
          style={{ textDecoration: "none" }}
        >
          <List onClick={handleDrawerClose} className={classes.listContainer}>
            Products
          </List>
        </Link>
        <Link
          to="/categories"
          onClick={handleDrawerClose}
          style={{ textDecoration: "none" }}
        >
          <List onClick={handleDrawerClose} className={classes.listContainer}>
            Categories
          </List>
        </Link>

        <Link
          onClick={handleDrawerClose}
          to="/my_cart"
          style={{ textDecoration: "none" }}
        >
          <List className={classes.listContainer}>My Cart</List>
        </Link>
        <List></List>
        {!auth_state.isLoggedIn ? (
          <List className={classes.listContainer}>
            <Button
              onClick={() => {
                history.push("/signup");
                handleDrawerClose();
              }}
            >
              Sign up
            </Button>
          </List>
        ) : null}
        {!auth_state.isLoggedIn ? (
          <List className={classes.listContainer}>
            <Button
              onClick={() => {
                history.push("/login");
                handleDrawerClose();
              }}
            >
              Log in
            </Button>
          </List>
        ) : null}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      ></main>
    </div>
  );
};
export default DrawerNav;
