import { connect } from 'react-redux'
import { dice } from '../actions'
import DicingViewer from '../components/DicingViewer'

const mapStateToProps = (state, ownProps) => ({
  isEnabled: (state.turn.clientTurn && !state.turn.diced),
  dice1: state.turn.dicesResult.dice1,
  dice2: state.turn.dicesResult.dice2
})

const randomize = () => {
	  return Math.floor(Math.random() * (6 - 1)) + 1;
	}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDicing: () => {
  	
    	const resultDice1 = randomize();
		const resultDice2 = randomize();
		dispatch(dice({dice1:resultDice1, dice2:resultDice2}))
  }
})

const Dicing = connect(
  mapStateToProps,
  mapDispatchToProps
)(DicingViewer)

export default Dicing