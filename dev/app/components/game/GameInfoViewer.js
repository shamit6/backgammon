import React from 'react';
import { Image, Segment, Flag, Icon, Container, Header } from 'semantic-ui-react'
import '../../content/pp.jpg'

const GameInfoViewerComponent = ({opponentInfo, leftSteps}) =>

	<div style={{width:'190px'}}>
		<Container>
				Your opponent:
			<Header size="medium" >
				<Image src='/images/pp.jpg' avatar />
				<Header.Content style={{paddingLeft:"10px",paddingRight:"10px"}}>
						{opponentInfo.username}
					<Header.Subheader>
						<Flag name={opponentInfo.country}/>
					</Header.Subheader>
				</Header.Content>
			</Header>

			<p>
				{`Your remaining steps: ${leftSteps.client}`}
			<br/>
				{`${opponentInfo.username} remaining steps: ${leftSteps.opponent}`}
			</p>
		</Container>
	</div>
// <div>
// {`You2 play against ${opponentInfo.username} (W:${opponentInfo.wins},L:${opponentInfo.losses})`}
// </div>
// <div>
// 	{`Your letf steps: ${leftSteps.client}`}
// </div>
// <div>
// 	{`Opponent letf steps: ${leftSteps.opponent}`}
// </div>
export default  GameInfoViewerComponent;
