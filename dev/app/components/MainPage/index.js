import React from 'react';
import MainMenu from '../MainMenu';
import Loading from '../Loading';
import { Route } from 'react-router-dom';
import GameZone from '../../containers/GameZone';
import style from './style.css';

class MainPage extends React.Component{

	constructor(props){
		super(props);
	}

	render() {
		const statistics = () => <Loading message={"Loading statistics"}>
									{"under construction"}
								</Loading>;
		return <div>
					<MainMenu logout={this.props.logout} {...this.props} menuItems={[{to:"/main/game" ,name:"game"},{to:"/main/statistics" ,name:"statistics"}]} />
					<div className={style.mainContent}>
						<Route path="/main/game" component={GameZone}/>
						<Route path="/main/statistics" component={statistics}/>
					</div>
				</div>;
	}
}

export default MainPage
