import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import PlayerStats from "../PlayerStats";
import style from "./style.css";

const Leaders = () => <div>Leaders</div>;
class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedMenuItem: "player" };
    this.handleItemChange = this.handleItemChange.bind(this);
  }

  handleItemChange(menuItem) {
    this.setState({ selectedMenuItem: menuItem.name });
    this.props.history.push(menuItem.to);
  }

  render() {
    const { selectedMenuItem } = this.state;
    const currentPath = this.props.match.path;
    const playerStatsItem = { to: `${currentPath}/player`, name: "player" };
    const leadersItem = { to: `${currentPath}/leaders`, name: "leaders" };

    return (
      <div className={style.statistics}>
        <Menu vertical style={{ margin: "0", minWidth: "190px" }}>
          <Menu.Item
            name={playerStatsItem.name}
            active={selectedMenuItem === playerStatsItem.name}
            onClick={() => this.handleItemChange(playerStatsItem)}
          >
            Player Stats
          </Menu.Item>
          <Menu.Item
            name={leadersItem.name}
            active={selectedMenuItem === leadersItem.name}
            onClick={() => this.handleItemChange(leadersItem)}
          >
            Leaders
          </Menu.Item>
          <Menu.Item>Head2Head</Menu.Item>
        </Menu>

        <Route
          path={playerStatsItem.to + "/:username?"}
          component={PlayerStats}
        />
        <Route path={leadersItem.to} component={Leaders} />
        <Redirect from={currentPath} exact to={playerStatsItem.to} />
      </div>
    );
  }
}

export default Statistics;
