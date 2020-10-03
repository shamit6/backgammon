import React from "react";
import { Route } from "react-router-dom";
import MainMenu from "../MainMenu";
import Statistics from "../Statistics";
//import PrivateRoute from '../../containers/PrivateRoute'
import GameZone from "../../containers/GameZone";
import style from "./style.css";

const MainPage = (props) => {
  const currentPath = props.match.path;
  const gamePath = `${currentPath}/game`;
  const statisticsPath = `${currentPath}/statistics`;

  const menuItems = [
    { to: gamePath, name: "game" },
    { to: statisticsPath, name: "statistics" },
  ];
  return (
    <div>
      <MainMenu logout={props.logout} {...props} menuItems={menuItems} />
      <div className={style.mainContent}>
        <Route path={gamePath} component={GameZone} />
        <Route path={statisticsPath} component={Statistics} />
      </div>
    </div>
  );
};

export default MainPage;
