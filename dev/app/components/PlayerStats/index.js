import React, { Component } from 'react'
import { Pie as PieChart } from 'react-chartjs-2'
import { gql, withApollo } from 'react-apollo';
import { Segment } from 'semantic-ui-react'
import AutocompleteInput from '../utils/AutocompleteInput'
import Viewer from './PlayerStatsViewer'
import PlayerHorizontalCard from '../PlayerHorizontalCard'
import style from './style.css'
import moment from 'moment'

const playersQuery = gql`
  query playersQuery($username: String!){
    players(username: $username) {
      id
      username
      firstName
      lastName
      country
      image
  }
}
`;

class PlayerStats extends Component {
  constructor(props) {
     super(props);
     this.state = {selectedUser:null}
   }

  render(){
    const searchPromise = value => this.props.client.query({
      query: playersQuery,
      variables: { username: value },
    }).then(res => ({data:res.data.players}));

    const onItemSelect = user => this.setState({selectedUser:user})
    const renderItem = user => <PlayerHorizontalCard playerInfo={user}/>
    const defaultValue = this.props.match.params.username

    const searchPanel = <Segment raised secondary textAlign='right' style={{padding:'.5em 1em',margin:'0', height:'58px'}}>
                    <AutocompleteInput
                        autoFocus={true}
                        searchPromise={searchPromise}
                        onItemSelect={onItemSelect}
                        renderItem={renderItem}
                        searchableKey="username"
                        defaultValue={defaultValue}/>
                  </Segment>

    return <div style={{flex:'1',minHeight:'100%'}}>
            {searchPanel}
            {this.state.selectedUser && <Viewer userInfo={this.state.selectedUser}/>}
          </div>
  }
}

export default withApollo(PlayerStats)
