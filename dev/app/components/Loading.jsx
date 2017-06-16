import React from 'react';

class Loading extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			loading: true
		};
	}

	render(){
		const {loading} = this.state;

		return (this.state.loading?
			<div> <font size={24}>
				{this.props.message}
			</font>
			</div>
			:this.props.children
		)
	}
}

export default Loading