import React, { Component } from "react";
import { Pie as PieChart } from "react-chartjs-2";
import AutocompleteInput from "../utils/AutocompleteInput";
import PlayerCard from "../PlayerCard";
import DynamicLoadTable from "../utils/DynamicLoadTable";
import axios from "axios";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import style from "./style.css";
import moment from "moment";

const headerRow = ["opponent", "date", "result"];

const renderBodyRow = ({ id, date, opponent, isWinner }, i) => ({
  key: id,
  cells: [
    opponent,
    moment(date).format("MMM-DD-YYYY HH:mm"),
    isWinner ? "W" : "L",
  ],
});

const CHART_COLORS = [
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(54, 162, 235)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)",
];

class PlayerStatsViewer extends Component {
  constructor(props) {
    super(props);
    this.state = { moreItemToLoad: true };
  }
  //
  // componentDidUpdate(prevProps, prevState){
  //   console.log("componentWillReceiveProps");
  // }

  render() {
    const {
      userInfo: user,
      playerStat,
      playerGames,
      loadMoreEntries,
    } = this.props;
    let winsLossesChart;
    if (playerStat !== undefined) {
      console.log(window.chartColors);
      //TODO
      const data = {
        labels: Object.keys(playerStat.record).filter(
          (key) => key != "__typename"
        ),
        datasets: [
          {
            data: Object.values(playerStat.record).filter(
              (value) => value != "PlayerRecord"
            ),
            backgroundColor: CHART_COLORS,
            hoverBackgroundColor: CHART_COLORS,
          },
        ],
      };

      winsLossesChart = (
        <PieChart
          data={data}
          options={{
            legend: { position: "left" },
            title: {
              display: true,
              fontSize: 17,
              text: `${user.username}'s win/loss record`,
            },
          }}
        />
      );
    }
    return (
      <div className={style.playerStats}>
        <PlayerCard playerInfo={user} />
        <div style={{ display: "flex", overflow: "auto" }}>
          <div style={{ flex: "1" }}>{winsLossesChart}</div>
          <div style={{ flex: "1" }}>{winsLossesChart}</div>
        </div>
        <DynamicLoadTable
          className={style.gamesTable}
          fetchingMedthod={loadMoreEntries(() =>
            this.setState({ moreItemToLoad: false })
          )}
          headerRow={headerRow}
          tableData={playerGames}
          moreItemToLoad={this.state.moreItemToLoad}
          renderBodyRow={renderBodyRow}
          username={user.username}
        />
      </div>
    );
  }
}

const playerStatsQuery = gql`
  query playerStatsQuery($userId: ID!, $offset: Int, $limit: Int) {
    playerStat(id: $userId) {
      record {
        turkishMarsLoss
        marsLoss
        loss
        draw
        win
        marsWin
        turkishMarsWin
      }
    }
    playerGames(id: $userId, offset: $offset, limit: $limit) {
      id
      opponent
      score
    }
  }
`;

const gamesQuery = gql`
  query playerGamesQuery($userId: ID!, $offset: Int, $limit: Int) {
    playerGames(id: $userId, offset: $offset, limit: $limit) {
      id
      opponent
      score
    }
  }
`;

const PlayerStatsViewerWithData = graphql(playerStatsQuery, {
  options: ({ userInfo }) => ({
    variables: {
      userId: userInfo.id,
      offset: 0,
      limit: 3,
    },
  }),
  props: ({
    ownProps,
    data: { loading, playerStat, playerGames, fetchMore },
  }) => ({
    ...ownProps,
    loading,
    playerStat,
    playerGames,
    loadMoreEntries: (moreItemToLoad) => () =>
      fetchMore({
        query: gamesQuery,
        variables: {
          userId: ownProps.userInfo.id,
          offset: playerGames.length,
          limit: 3,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult || fetchMoreResult.playerGames.length == 0) {
            moreItemToLoad();
            return previousResult;
          }

          return {
            ...previousResult,
            playerGames: [
              ...previousResult.playerGames,
              ...fetchMoreResult.playerGames,
            ],
          };
        },
      }),
  }),
})(PlayerStatsViewer);

export default PlayerStatsViewerWithData;
