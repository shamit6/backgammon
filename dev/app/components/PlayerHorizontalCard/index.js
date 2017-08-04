import React from 'react';
import { Image, Flag, Header } from 'semantic-ui-react'
import '../../content/pp.jpg'

const PlayerHorizontalCard = ({playerInfo}) =>
  <Header size="medium" block>
    <Image src='/images/pp.jpg' avatar />
    <Header.Content style={{ paddingLeft:'10px',paddingRight:'10px'}}>
        {playerInfo.username}
      <Header.Subheader>
        <Flag name={playerInfo.country}/>
      </Header.Subheader>
    </Header.Content>
  </Header>

export default PlayerHorizontalCard
