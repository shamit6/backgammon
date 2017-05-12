import { connect } from 'react-redux'
import { dice, switchTurn } from '../actions'
import DicingViewer from '../components/DicingViewer'

const mapStateToProps = (state, ownProps) => ({
  //isEnabled: (state.clientTurn && !state.diced),
  dice1: state.dicesResult.dice1,
  dice2: state.dicesResult.dice2,
  status: state.clientStatus,
  clientTurn: state.clientTurn,
  diced: state.diced
})

const randomize = () => {
	  return Math.floor(Math.random() * 6) + 1;
	}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDicing: () => {
  	
    const resultDice1 = randomize();
		const resultDice2 = randomize();
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