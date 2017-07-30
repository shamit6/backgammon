import React from 'react'
//import styles from './mainMenuStyle.css'
import { Redirect, Link } from 'react-router-dom'
import { Segment, Menu, Icon, Input, Checkbox, Header, Dropdown, Button, Message } from 'semantic-ui-react'
import Logo from '../Logo'

class MainMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selectedMenuItem: this.props.menuItems[0].name};

    this.handleItemChange = this.handleItemChange.bind(this);
  }

  handleItemChange(menuItem) {
    this.setState({selectedMenuItem: menuItem.name});
    this.props.history.push(menuItem.to);
  }

	render(){
    const dropDownTrigger = <span>
                                  <Icon name='user'/>
                                    {this.props.userInfo.username}
                                </span>;
    const dropDown = <Dropdown trigger={dropDownTrigger} className='icon'>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            my profile
                          </Dropdown.Item>
                          <Dropdown.Divider/>
                          <Dropdown.Item onClick={this.props.logout}>
                            logout
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>

		const menuItems = this.props.menuItems;
    const selectedMenuItem = this.state.selectedMenuItem;
    const itemsGrid = <Menu pointing secondary inverted >
                        <Menu.Item key={1} style={{padding:'0', paddingRight:'20px'}}>
                          <Logo size="small" textAlign="left"/>
                        </Menu.Item>
                        {menuItems.map((menuItem, index) =>
                          <Menu.Item
                            name={menuItem.name}
                            key={index+2}
                            active={selectedMenuItem === menuItem.name}
                            onClick={() => this.handleItemChange(menuItem)}>
                            {menuItem.name}
                          </Menu.Item>)}
                          <Menu.Menu position='right' key={2}>
                            <Menu.Item>
                              {dropDown}
                            </Menu.Item>
                          </Menu.Menu>
                      </Menu>;
		// const sliderBarWidth = 100/menuItems.length;
		// const sliderBaroffset = sliderBarWidth * this.state.selectedItem;

    // <div className={styles.slider}>
    //   <div className={styles.bar} style={{width:sliderBarWidth+'%',marginLeft:sliderBaroffset + '%'}}></div>
    // </div>

		return <Segment inverted style={{margin:'0', position:'fixed', width:'100%', zIndex:'100', borderRadius: '0'}}>
						{itemsGrid}
	  		</Segment>
	}
}

export default MainMenu;
