import React from 'react';
import { connect } from 'react-redux';
import GameZoneViewer from '../components/GameZone';
import { searchOpponent } from '../actions';


const mapStateToProps = (state, ownProps) => ({
	playStatus:state.game.playStatus,
	inGameStatus:state.game.clientStatus
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  play: () => {
    dispatch(searchOpponent());
  }
})

const GameZone = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameZoneViewer)

export default GameZone
