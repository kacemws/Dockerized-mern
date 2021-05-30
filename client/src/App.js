import { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideMenu from "./components/SideMenu";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";

import Cookies from "js-cookie";
import { refreshExpiredToken, setAuthToken } from "./api/axios";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loader = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin indicator={antIcon} />
    </div>
  );
};

function App() {
  /*Token*/
  const [token, setToken] = useState(Cookies.get("accessToken") ?? ""); // the actual token;
  /*Token*/

  const [interval, setIntervalHandler] = useState(0);

  const [fetchingToken, setFetchingToken] = useState(token === ""); // a variable that checks wheter we are refreshing the token or not

  useEffect(() => {
    window.clearInterval(interval); // to clear all sets interval for the check cookie function

    let cookieToken = Cookies.get("accessToken");
    let refreshToken = localStorage.getItem("refreshToken");

    /*to know wheter to ask for a new token or not*/
    if (
      cookieToken == undefined &&
      refreshToken != undefined &&
      refreshToken.length > 0
    ) {
      // if cookie expired
      setFetchingToken(true);
      refreshExpiredToken(refreshToken).then((res) => {
        var in15minutes = new Date(new Date().getTime() + 900000);

        Cookies.set("accessToken", res.data.accessToken, {
          expires: in15minutes,
        });
        localStorage.setItem("refreshToken", res.data.refreshToken);

        setAuthToken(res.data.accessToken);
        setToken(res.data.accessToken);
        //set the fetched credentials where needed : the cookie, local storage , the axios instance and finally the token variable that is local to the app file

        setFetchingToken(false);
        //refreshing done!!!

        let handler = window.setInterval(checkCookie, 100); // setting an interval each 100ms (0.1 seconds) to execute the check cookie function ( check line 58)
        setIntervalHandler(handler);
      });
    } else {
      // if both undefined of both defined ( refresh_token && access_token)
      setFetchingToken(false);
      console.log({
        cookieToken,
        refreshToken,
      });
      let handler = window.setInterval(checkCookie, 100); // setting an interval each 100ms (0.1 seconds) to execute the check cookie function ( check line 58)
      setIntervalHandler(handler);
    }
  }, []);

  const checkCookie = (function () {
    // function to check wheter cookie changed or not

    var lastCookie = document.cookie; // 'static' memory between function calls (old cookie)

    return function () {
      var currentCookie = document.cookie; // current cookie;

      if (currentCookie != lastCookie) {
        // if cookie changed
        lastCookie = currentCookie;
        console.log("changed a cookie!");
        let token =
          Cookies.get("accessToken") != undefined
            ? Cookies.get("accessToken")
            : "no token";
        if (token == "no token") {
          console.log("token expired...");
        }
        setToken(token ?? ""); //set token stored inside the new cookie
      }
    };
  })();

  if (token != "") {
    setAuthToken(token);
  }

  let routes; // declaring the routes

  if (token === "") {
    routes = (
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
        {/*done*/}
        <Route path="*">
          <h1>404 error</h1>
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <>
        <SideMenu />
        <Dashboard />
      </>
    );
  }

  return (
    <Router>
      <div className="container">{fetchingToken ? <Loader /> : routes}</div>
    </Router>
  );
}

export default App;
