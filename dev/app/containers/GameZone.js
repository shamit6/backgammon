import React from 'react';
import { connect } from 'react-redux';
import GameZoneViewer from '../components/GameZone';
import Game from '../components/game/Game';
import { searchOpponent } from '../actions';
import { PLAY_STATUS, IN_GAME_STATUS } from '../constants';

const mapStateToProps = (state, ownProps) => ({
	playStatus:state.game.playStatus,
	inGameStatus:state.game.clientStatus
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  play: () => {
    dispatch(searchOpponent());
  }
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");

	switch (stateProps.playStatus){
		case PLAY_STATUS.PLAY:{
			return {component:<Game/>};
		}

		case PLAY_STATUS.SEARCH_OPPONENT:{
			return {component:<div>{"Wait for another player."}</div>};
		}
		case PLAY_STATUS.OPPONENT_RETIRED:{
			return {component:<div>{"the player retired"}<button className="actionButtom" onClick={dispatchProps.play}>{"PLAY"}</button></div>};
		}
		case PLAY_STATUS.NOT_PLAY:{
			if (stateProps.inGameStatus == IN_GAME_STATUS.WINNER || stateProps.inGameStatus == IN_GAME_STATUS.LOSER){
				return {component:<div>{`You are the ${stateProps.inGameStatus} of the game. For play again click: `}
				<button className="actionButtom" onClick={dispatchProps.play}>{"PLAY"}</button></div>}
			}
			return {component:<div><button className="actionButtom" onClick={dispatchProps.play}>{"PLAY"}</button></div>};
		}
		default:
      		return {component:<div></div>}
	}
}


const GameZone = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(GameZoneViewer)

export default GameZone
