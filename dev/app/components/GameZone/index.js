import React from 'react';
import Game from '../game/Game'
import { PLAY_STATUS, IN_GAME_STATUS } from '../../constants'
import { Segment, Header } from 'semantic-ui-react'
import style from './style.css'

const GameZome = ({inGameStatus, playStatus, play, stopSearch}) => {

  let message;
  let onClickAction;
  let buttonLabel;

  switch (playStatus){
		case PLAY_STATUS.PLAY:{
			return <Game/>
		}
		case PLAY_STATUS.SEARCH_OPPONENT:{
			message = "Wait for another player"
      onClickAction = stopSearch
      buttonLabel = "stop sreach"
      break;
		}
		case PLAY_STATUS.OPPONENT_RETIRED:{
      message = "The player retired. For Search a new player:"
      onClickAction = play
      buttonLabel = "search"
      break;
		}
		case PLAY_STATUS.NOT_PLAY:{
      onClickAction = play
      buttonLabel = "play"

			if (inGameStatus == IN_GAME_STATUS.WINNER || inGameStatus == IN_GAME_STATUS.LOSER){
        message = `You are the ${inGameStatus} of the game. For play again: `
			}else{
        message = `For search opponent: `
      }
      break;
		}
	}

  return <Segment textAlign="center" style={{backgroundColor: 'inherit', height:'100%'}}>
          <Header textAlign="left" size='large'>{message}</Header>
          <button className={style.actionButtom }onClick={onClickAction}>{buttonLabel}</button>
        </Segment>
}

export default GameZome;
