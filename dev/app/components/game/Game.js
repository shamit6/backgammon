import React from 'react';
import Board from './Board';
import Chat from './Chat';
import GameInfo from '../../containers/GameInfo';
import { Segment } from 'semantic-ui-react'

const Game = () => <Segment style={{display:'flex', backgroundColor: 'inherit', margin:'0',height:'100%'}}>
                	<div style={{width:'220px',paddingRight: '1em', display:'flex', flexDirection: 'column'}}>
                    <GameInfo/>
                    <Chat/>
                  </div>
                <Board/>
              </Segment>

export default Game
