import { connect } from "react-redux";
import HittenCheckersAreaViewer from "../components/game/Board/HittenCheckersAreaViewer";

const mapStateToProps = (state, ownProps) => ({
  toBlink:
    state.app.game.checkersState.find(
      (point) => point.pointId == ownProps.pointId
    ).amount > 0 && state.app.game.clientTurn,
});

const HittenCheckersArea = connect(mapStateToProps)(HittenCheckersAreaViewer);

export default HittenCheckersArea;
