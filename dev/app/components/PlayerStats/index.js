import React, {Component} from 'react'
import {Pie as PieChart} from 'react-chartjs-2'
import { Segment, Menu } from 'semantic-ui-react'
import AutocompleteInput from '../utils/AutocompleteInput'
import Viewer from './PlayerStatsViewer'
// import PlayerCard from '../PlayerCard'
import PlayerHorizontalCard from '../PlayerHorizontalCard'
// import DynamicLoadTable from '../utils/DynamicLoadTable'
import axios from 'axios'
import style from './style.css'
// import moment from 'moment'

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

  // componentDidMount(){
  //   ::this.fetchRecord();
  // }
  //
  // fetchRecord(){
  //   axios.get(`/statistics/record/${this.props.userInfo.username}`)
  //     .then(res => {
  //       const { wins, losses} = res.data;
  //       this.setState({record:{wins, losses}});
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
  //
  // componentDidUpdate(prevProps, prevState){
  //   if (this.props.userInfo.username != prevProps.userInfo.username){
  //     ::this.fetchRecord();
  //   }
  // }

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

    // const user = this.props.userInfo;//{id:1, username:"amitush",firstName:"Amit", lastName:"Shalev",password:"123",country:"us"};
    // const { wins, losses, draws } = this.state.record;

    return <div style={{flex:'1',minHeight:'100%'}}>
            {searchPanel}
            {this.state.selectedUser && <Viewer userInfo={this.state.selectedUser}/>}
          </div>
  }
}

export default PlayerStats
