import { connect } from "react-redux";
import GameInfoViewer from "../components/game/GameInfoViewer";

const mapStateToProps = (state, ownProps) => {
  // Calc how many steps left for each player.
  const totalLeftSteps = state.app.game.checkersState.reduce(
    (leftSteps, point) => {
      if (point.isClient) {
        const sum = leftSteps.client + point.amount * (25 - point.pointId);
        return { ...leftSteps, client: sum };
      } else {
        const sum = leftSteps.opponent + point.amount * point.pointId;
        return { ...leftSteps, opponent: sum };
      }
    },
    { client: 0, opponent: 0 }
  );

  return {
    opponentInfo: state.app.game.opponentInfo,
    leftSteps: totalLeftSteps,
  };
};

const GameInfo = connect(mapStateToProps)(GameInfoViewer);

export default GameInfo;
