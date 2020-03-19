import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core";
import { Route, Switch, Redirect } from "react-router-dom";
import clsx from "clsx";
import Routes from "../routes/routes";
import Header from "./header";
import SideBar from "./sidebar";
import Footer from "./footer";
import Alert from "../views/utils/Alert";
const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 50
    }
  },
  shiftContent: {
    paddingLeft: 200
  },
  content: {
    height: "calc(100% - 58px)",
    overflowY: "auto",
    overflowX: "hidden"
  }
}));

const MainLayout = props => {
  const { children } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Header onSidebarOpen={handleSidebarOpen} />
      <SideBar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? "persistent" : "temporary"}
      />
      <main className={classes.content}>
        <Alert />
        {children}
        {Routes.map((route, index) => (
          <Route
            key={index}
            exact={route.exact}
            path={route.path}
            name={route.name}
            component={route.component}
          />
        ))}
        {/* <Redirect to="/dashboard" /> */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
