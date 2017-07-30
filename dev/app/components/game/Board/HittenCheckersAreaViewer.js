import React  from 'react';

import styles from '../Checker/style.css';


class HittenCheckersAreaViewer extends React.Component {

	constructor(props) {
		super(props);

        this.flicker = this.flicker.bind(this.flicker);
        this.state = {clearInteval: null};
	}

    flicker(element,bool) {
			return () => {

        let matches = element.querySelectorAll("." + styles.checkerChipClient.split(' ')[0]);

        matches.forEach(circle =>
            {
                if (bool  === true) {
                        circle.style["box-shadow"] = '0px 0px 7px 4px rgb(255, 75, 34)';
                    } else {
                        circle.style["box-shadow"] = '-1px 1px rgba(0,0,0,0.6)';
                    }
        });
        bool = !bool;
      }
    }

    render() {
    	return <div className={this.props.myClassName} ref={ e => {this.container = e;}}>
                    {this.props.children}
                </div>;
    }

    componentWillReceiveProps(nextProps){
         if (nextProps.toBlink && this.state.clearInteval == null){
            const clear = setInterval(this.flicker(this.container, true),1000);
            this.setState({clearInteval:clear});
        }else if (this.props.toBlink && !nextProps.toBlink && this.state.clearInteval != null){
            clearInterval(this.state.clearInteval);
            this.setState({clearInteval:null});
        }

    }
}

export default HittenCheckersAreaViewer
