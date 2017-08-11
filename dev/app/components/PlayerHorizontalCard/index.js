import React from 'react';
import { Image, Flag, Header , Icon } from 'semantic-ui-react'
import '../../content/pp.jpg'

const PlayerHorizontalCard = ({playerInfo}) =>
  <Header size="medium" block textAlign="left">
    {playerInfo.img ? <Image src={playerInfo.img} avatar style={{margin: '1', width:'40px', height:'40px'}} />
                    : <Icon name='user' size="small" circular/>}
    <Header.Content style={{ paddingLeft:'10px',paddingRight:'10px'}}>
        {playerInfo.username}
      <Header.Subheader>
        <Flag name={playerInfo.country}/>
      </Header.Subheader>
    </Header.Content>
  </Header>

export default PlayerHorizontalCard
