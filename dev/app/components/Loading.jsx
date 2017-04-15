import React, {Component, PropTypes} from 'react';

class Loading extends Component{
	static propTypes = {
    	message: PropTypes.string.isRequired,
    	listener: PropTypes.array.isRequired
  	};

	constructor(props){
		super(props)
		this.state = {
			loading: true
		};
	}

	componentWillMount(){
	 this.props.listener.push(() => {
	 	console.log(this.state);
	    this.setState({loading: false});     
	 })
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