import React from 'react';
import { Container } from 'semantic-ui-react'
import PlayerCard from '../PlayerHorizontalCard'

const GameInfoViewerComponent = ({opponentInfo, leftSteps}) =>
		<Container style={{width:'100%'}}>
				Your opponent:
				<PlayerCard playerInfo={opponentInfo}/>
			<p>
				{`Your remaining steps: ${leftSteps.client}`}
			<br/>
				{`${opponentInfo.username} remaining steps: ${leftSteps.opponent}`}
			</p>
		</Container>

export default  GameInfoViewerComponent;
