import React, { Component } from 'react'
import { Pie as PieChart } from 'react-chartjs-2'
import { Segment } from 'semantic-ui-react'
import AutocompleteInput from '../utils/AutocompleteInput'
import Viewer from './PlayerStatsViewer'
import PlayerHorizontalCard from '../PlayerHorizontalCard'
import axios from 'axios'
import style from './style.css'
import moment from 'moment'

const headerRow = ['opponent', 'date', 'result'];

const renderBodyRow = ({id, date, opponent, isWinner}, i) => ({
  key: id,
  cells:[opponent, moment(date).format("MMM-DD-YYYY HH:mm"), isWinner?"W":"L"]
});

class PlayerStats extends Component {
  constructor(props) {
     super(props);

     this.state = {selectedUser:null}
   }
  render(){

    const searchPromise = value => axios.get(`/statistics/serach`, {params:{username: value}})
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

export default PlayerStats
