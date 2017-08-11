import React, {Component} from 'react'
import {Pie as PieChart} from 'react-chartjs-2'
//import { Segment, Menu } from 'semantic-ui-react'
import AutocompleteInput from '../utils/AutocompleteInput'
import PlayerCard from '../PlayerCard'
//import PlayerHorizontalCard from '../PlayerHorizontalCard'
import DynamicLoadTable from '../utils/DynamicLoadTable'
import axios from 'axios'
import style from './style.css'
import moment from 'moment'

const headerRow = ['opponent', 'date', 'result'];

const renderBodyRow = ({id, date, opponent, isWinner}, i) => ({
  key: id,
  cells:[opponent, moment(date).format("MMM-DD-YYYY HH:mm"), isWinner?"W":"L"]
});

class PlayerStatsViewer extends Component {
  constructor(props) {
     super(props);

     this.state = {record:{wins:0, losses:0}}
   }

  componentDidMount(){
    ::this.fetchRecord();
  }

  fetchRecord(){
    axios.get(`/statistics/record/${this.props.userInfo.username}`)
      .then(res => {
        const { wins, losses} = res.data;
        this.setState({record:{wins, losses}});
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.userInfo.username != prevProps.userInfo.username){
      ::this.fetchRecord();
    }
  }

  render(){

    const user = this.props.userInfo;
    const { wins, losses, draws } = this.state.record;

    const data = {
      	labels: ['wins','losses'],
      	datasets: [{
      		data: [wins, losses],
      		backgroundColor: ['#FF6384','#36A2EB'],
      		hoverBackgroundColor: ['#FF6384','#36A2EB']
      	}]
      };

    const winsLossesChart = <PieChart data={data}
        options= {{
                legend:{  position:'left' },
                title: {
                    display: true,
                    fontSize: 17,
                    text: `${user.username}'s win/loss record`
                }
            }}/>

    const fetchGamesPromise = (username, count, offest) => {
      return axios.get(`/statistics/games/${username}`, {params:{count, offest}});
    }

    return <div className={style.playerStats}>
                <PlayerCard playerInfo={user}/>
                <div style={{display:'flex', overflow:'auto'}}>
                  <div style={{flex:'1'}}>
                      {winsLossesChart}
                    </div>
                    <div style={{flex:'1'}}>
                      {winsLossesChart}
                    </div>
                </div>
                <DynamicLoadTable
                  className={style.gamesTable}
                  fetchingMedthod={fetchGamesPromise}
                  headerRow={headerRow}
                  renderBodyRow={renderBodyRow}
                  username={user.username}
                  />
              </div>
  }
}

export default PlayerStatsViewer
