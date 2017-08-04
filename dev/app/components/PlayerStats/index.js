import React, {Component} from 'react'
//import {Pie as PieChart} from 'react-chartjs-2'
import PlayerCard from '../PlayerCard'
import axios from 'axios'
import { Table } from 'semantic-ui-react'

const headerRow = ['opponent', 'date', 'result'];

const renderBodyRow = ({id, date, opponent, isWinner}, i) => ({
  key: id,
  cells:[opponent, date, isWinner?"W":"L"]
});

class PlayerStats extends Component {
  constructor(props) {
     super(props);
     this.state = {offsetGamesPaging:0, games:[]};
   }

  componentDidMount(){
    ::this.fetchGames("amitush");
  }

  fetchGames(username){
    axios.get(`/statistics/games/${username}`, {params:{count:2, offsetGamesPaging:this.state.offsetGamesPaging}})
      .then(res => {
        console.log("ssss");
        console.log(res);

        const updatedGames = [...this.state.games, ...res.data];
        this.setState({games:updatedGames});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render(){
    const user = {id:1, username:"amitush",firstName:"Amit", lastName:"Shalev",password:"123",country:"us"};
    return <div>
            <PlayerCard playerInfo={user}/>
            <Table celled
              headerRow={headerRow}
              tableData={this.state.games}
              renderBodyRow={renderBodyRow}/>
            </div>
  }
}

export default PlayerStats
