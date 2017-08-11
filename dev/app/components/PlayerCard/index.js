import React from 'react';
import { Icon, Card, Image, Flag, Header } from 'semantic-ui-react'
import '../../content/pp.jpg'

const PlayerCard = ({playerInfo}) => <Card style={{margin: '0', overflowY:'auto'}}>
      {playerInfo.img ? <Image src={playerInfo.img} style={{margin: 'auto', width:'224px', height:'224px'}} />
                      : <Icon name='user' style={{margin: 'auto'}} fitted circular size="massive"/>}
      <Card.Content>
        <Card.Header>
          {`${playerInfo.firstName} ${playerInfo.lastName}`}
        </Card.Header>
        <Card.Meta>
          {playerInfo.username}
        </Card.Meta>
        <Card.Description>
          <Flag name={playerInfo.country}/>
        </Card.Description>
      </Card.Content>
    </Card>

export default PlayerCard
