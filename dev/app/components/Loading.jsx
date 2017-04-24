import React, {Component, PropTypes} from 'react';

class Loading extends Component{
	static propTypes = {
    	message: PropTypes.string.isRequired,
    	listeners: PropTypes.array.isRequired
  	};

	constructor(props){
		super(props)
		this.state = {
			loading: true,
			message: this.props.message
		};
	}

	componentWillMount(){
		// TODO unmount
		this.props.listeners.forEach(listener => {
		 	listener.callbacks.push(() => {
		 		console.log("set loading to " + !listener.toActive);
			    this.setState({loading: !listener.toActive, message:listener.message});     
		 	})
		});
	}

	render(){
		const {loading} = this.state;

		return (this.state.loading?
			<div> <font size={24}>
				{this.state.message}
			</font>
			</div>
			:this.props.children
		)
	}
}

export default Loading