import React from 'react';
import Board from './Board';
import GameInfo from '../../containers/GameInfo';
import { Segment } from 'semantic-ui-react'
class Game extends React.Component {

  componentDidMount(){

  }

  render() {

  return (
    <Segment style={{display:'flex', backgroundColor: 'inherit', margin:'0'}}>
      <GameInfo/>
      <Board/>
    </Segment>

  )

  }
}

export default Game
