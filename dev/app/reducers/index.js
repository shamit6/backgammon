import { combineReducers } from 'redux'
import turn from './turn'
import board from './board'

const rootReducer = combineReducers({
  turn,
  board
})

export default rootReducer