import React, { useEffect, useState } from "react";

import { Menu } from "antd";
import { useHistory } from "react-router";

const { SubMenu } = Menu;

export default function SideMenu() {
  const history = useHistory();
  const handleClick = ({ key }) => {
    history.push(key);
  };

  const [openKeys, setOpenKeys] = useState(["spaces"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (["spaces", "categories", "tasks"].indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    history.push("/space/all");
  }, [history]);

  return (
    <Menu
      onClick={handleClick}
      className="sidemenu"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      defaultSelectedKeys={["/space/all"]}
      mode="inline"
    >
      <SubMenu key="spaces" title="Spaces">
        <Menu.Item key="/space/all">All Spaces</Menu.Item>
      </SubMenu>
      <SubMenu key="categories" title="Categories">
        <Menu.Item key="/category/all">All Categories</Menu.Item>
      </SubMenu>
      <SubMenu key="tasks" title="Tasks">
        <Menu.Item key="/task/all">All Tasks</Menu.Item>
      </SubMenu>
    </Menu>
  );
}
