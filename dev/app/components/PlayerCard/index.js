import React from 'react';
import { Icon, Card, Image, Flag, Header } from 'semantic-ui-react'
import '../../content/pp.jpg'

const PlayerCard = ({playerInfo}) => <Card>
      <Image src='/images/pp.jpg' />
      <Card.Content>
        <Card.Header>
          {`${playerInfo.firstName} ${playerInfo.lastName}`}
        </Card.Header>
        <Card.Meta>
          {playerInfo.username}
        </Card.Meta>
        <Card.Description>

        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      </Card.Content>
    </Card>

export default PlayerCard
