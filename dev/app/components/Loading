import React, {Component} from 'react';

class Loading extends Component{
	constructor(props){
		super(props)
		this.state = {
			loading: true
		};
	}
	render(){
		const {loading} = this.state;


		return (
			loading?
			<div>
			loading...
			</div>
			:
			this.props.children
		);
	}
}