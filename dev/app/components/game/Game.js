import React from 'react';
import Board from './Board';
import GameInfo from '../../containers/GameInfo';
class Game extends React.Component {

  componentDidMount(){

  }

  render() {

  return (
    <div style={{width:'100%', height:'100%', display:'flex'}}>
      <div style={{flex:'1'}}>>
        <GameInfo/>
      </div>
      <Board style={{flex:'6'}}/>
    </div>
  )

  }
}

export default Game