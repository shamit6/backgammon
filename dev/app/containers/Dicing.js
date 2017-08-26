import { connect } from 'react-redux'
import { dice, switchTurn } from '../actions'
import DicingViewer from '../components/game/Dicing'

const mapStateToProps = (state, ownProps) => ({
  //isEnabled: (state.clientTurn && !state.diced),
  dice1: state.app.game.dicesResult.dice1,
  dice2: state.app.game.dicesResult.dice2,
  status: state.app.game.clientStatus,
  clientTurn: state.app.game.clientTurn,
  diced: state.app.game.diced,
  doCubeAnimate: !ownProps.diced && state.app.game.diced
})

const randomize = () => {
	  return Math.floor(Math.random() * 6) + 1;
	}

const mapDispatchToProps = (dispatch, ownProps) => ({
  sendDicingResult: (resultDice1, resultDice2) => {
		dispatch(dice({dice1:resultDice1, dice2:resultDice2}))
  },
  switchTurnTimeout: () => {
    setTimeout(() => dispatch(switchTurn()), 4000);
  }
})

const Dicing = connect(
  mapStateToProps,
  mapDispatchToProps
)(DicingViewer)

export default Dicing
