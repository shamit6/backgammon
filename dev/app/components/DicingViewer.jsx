import React, { Component, PropTypes }  from 'react';
import {INITIAL_STORE_STATE, CLIENT_STATUS} from '../constants'

// Cancel the container and use state?
 class DicingViewer extends React.Component {
  static propTypes = {
    onDicing: PropTypes.func.isRequired,
    dice1: PropTypes.number.isRequired,
    dice2: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    clientTurn: PropTypes.bool.isRequired 
  };
  
	constructor(props) {
		super(props);
	}

  render() {

    let message = "";
    let turnMessage = this.props.clientTurn?"Your Turn. ":"Not your turn. "

    // End match statuses.
    switch (this.props.status){
      case CLIENT_STATUS.LOSER:
        message = "You are fucking Loser!!!!!!";
        turnMessage = "";
        break;
      case CLIENT_STATUS.WINNER:
        message = "WINNER!!!!";
        turnMessage = "";
        break;
      }

    // trasfer to container?
    if (this.props.clientTurn && this.props.diced)
    switch (this.props.status){
      case CLIENT_STATUS.ONGOING:
        message = "Play as you wish my friend";
        break;
      case CLIENT_STATUS.EATEN:
        message = "Insert the eaten checker first";
        break;
      case CLIENT_STATUS.DROPOUT:
        message = "You can drop out the chekcers";
        break;
      case CLIENT_STATUS.STUCK:
        message = "You don't have ligal move. The turn will be switched in a few moments";
        this.props.switchTurnTimeout();  
        break;
      default: 
        message = "default";
    }


  	return (
      <div style = {{display:'block', verticalAlign:'center'}} >
        <div style={{ display:'inline-block', textAlign:'center', width:'50px', height:'50px', border:'solid', borderRadius: '5px'}}>
    		  <font size="8">{this.props.dice1}</font>
        </div>
        <div style={{ display:'inline-block', textAlign:'center', width:'50px', height:'50px', border:'solid', borderRadius: '5px'}}>
    		  <font size="8">{this.props.dice2}</font>
        </div>
    		<button style = {{display:'inline-block', margin: '20px', height: '50px', width: '55px'}} 
          disabled={!this.props.clientTurn || this.props.diced} onClick={this.props.onDicing}>dice</button>
        <font size="6">{turnMessage}</font>
        <font size="6">{message}</font>
    	</div>
    )
  }
}

export default DicingViewer