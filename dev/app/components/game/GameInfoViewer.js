import React from 'react';
import { Image, Segment, Flag, Icon, Container, Header } from 'semantic-ui-react'
import '../../content/pp.jpg'

const GameInfoViewerComponent = ({opponentInfo, leftSteps}) =>
		<Container style={{width:'auto'}}>
				Your opponent:
			<Header size="medium" block>
				<Image src='/images/pp.jpg' avatar />
				<Header.Content style={{ paddingLeft:'10px',paddingRight:'10px'}}>
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

export default  GameInfoViewerComponent;
