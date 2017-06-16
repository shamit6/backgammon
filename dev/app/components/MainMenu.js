import React from 'react';
import styles from './mainMenuStyle.css';
import { NavLink } from "react-router-dom";

class MainMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selectedOption: 'option1'};

    this.handleItemChange = this.handleItemChange.bind(this);
  }

  handleItemChange(item) {
    this.setState({selectedItem: item});
  }

	render(){

		const menuItems = this.props.menuItems;
		const itemsGrid = <div className={styles.itemsGrid}>
							{menuItems.map((menuItem, index) =>
							 	<NavLink to={menuItem.to}  activeClassName={styles.activeItem}
							 		onClick={()=>{this.handleItemChange(index);}}>
									 <div className={styles.item}>{menuItem.name}</div>
								</NavLink>)}
							</div>;
		const sliderBarWidth = 100/menuItems.length;
		const sliderBaroffset = sliderBarWidth * this.state.selectedItem;

		return <div className={styles.mainMenu}>
				<div className={styles.symbol}>
					<span className={styles.symbolText}>{"Shubapp backgammon"}</span>
					<div className={styles.symbolImage}/>
				</div>
				<nav className={styles.nav}>
					<div className={styles.slidemenu}>
						{itemsGrid}
						<div className={styles.slider}>
							<div className={styles.bar} style={{width:sliderBarWidth+'%',marginLeft:sliderBaroffset + '%'}}></div>
					  	</div>
					</div>				  	
		  		</nav>
		  		<button className={styles.logoutButton} onClick={this.props.logout}>
		            {"logout"}
		        </button>
	  		</div>
	}
}

export default MainMenu;
