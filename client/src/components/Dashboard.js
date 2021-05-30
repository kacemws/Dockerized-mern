import React from "react";
import { Switch, Route } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Spaces from "./Spaces";
import Categories from "./Categories";
import Tasks from "./Tasks";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function Dashboard() {
  return (
    <div className="frame">
      <Switch>
        <Route path="/space/all">
          <Spaces />
        </Route>
        <Route path="/category/all">
          <Categories />
        </Route>
        <Route path="/task/all">
          <Tasks />
        </Route>
        <Route exact path="/">
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
        </Route>

        <Route path="" render={() => <h1>404 error</h1>} />
      </Switch>
    </div>
  );
}

export default Dashboard;
