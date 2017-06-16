import React from 'react';


const GameInfoViewerComponent = ({opponentInfo, leftSteps}) => <div>
	<div>
	{`You play against ${opponentInfo.username} (W:${opponentInfo.wins},L:${opponentInfo.losses})`}
	</div>
	<div>
		{`Your letf steps: ${leftSteps.client}`}
	</div>
	<div>
		{`Opponent letf steps: ${leftSteps.opponent}`}
	</div>
</div>;

export default  GameInfoViewerComponent;