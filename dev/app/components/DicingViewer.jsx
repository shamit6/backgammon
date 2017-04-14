import React, { Component, PropTypes }  from 'react';


 class DicingViewer extends React.Component {
	constructor(props) {
		super(props);
		//this.onDicing = this.onDicing.bind(this);
	}

  render() {
  	return (
      <div>
    		<font size="8">{this.props.dice1}</font>
    		<font size="8">{this.props.dice2}</font>
    		<button disabled={!this.props.isEnabled} onClick={this.props.onDicing}>dice</button>
    	</div>
    )
  }
}

DicingViewer.propTypes = {
  onDicing: PropTypes.func.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  dice1: PropTypes.number.isRequired,
  dice2: PropTypes.number.isRequired
};


export default DicingViewer