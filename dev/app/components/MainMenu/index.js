import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Segment, Menu, Icon, Dropdown } from 'semantic-ui-react'
import Logo from '../Logo'
import style from './style.css'

class MainMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {selectedMenuItem: ::this.clacCurrentTab()};
  }

  clacCurrentTab(){
    const currentLocation = this.props.location.pathname;
    const componentPath = this.props.match.path;
    return currentLocation.slice(componentPath.length+1).split('/')[0]
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
    const dropDown = <Dropdown trigger={dropDownTrigger} >
                        <Dropdown.Menu>
                          <Dropdown.Item className={style.dropdownOption}>
                            my profile
                          </Dropdown.Item>
                          <Dropdown.Divider className={style.dropdownDivider}/>
                          <Dropdown.Item onClick={this.props.logout} className={style.dropdownOption}>
                            logout
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>

		const menuItems = this.props.menuItems
    const selectedMenuItem = this.state.selectedMenuItem
    const itemsGrid = <Menu pointing secondary inverted >
                        <Menu.Item key={1} style={{padding:'0', paddingRight:'20px'}}>
                          <Logo size="small" textAlign="left"/>
                        </Menu.Item>
                        {menuItems.map((menuItem, index) =>
                          <Menu.Item
                            name={menuItem.name}
                            key={index+2}
                            active={selectedMenuItem === menuItem.name}
                            onClick={() => ::this.handleItemChange(menuItem)}>
                            {menuItem.name}
                          </Menu.Item>)}
                          <Menu.Menu position='right' key={2}>
                            <Menu.Item>
                              {dropDown}
                            </Menu.Item>
                          </Menu.Menu>
                      </Menu>

		return <Segment inverted style={{margin:'0', position:'fixed', width:'100%', zIndex:'100', borderRadius: '0'}}>
						{itemsGrid}
	  		</Segment>
	}
}

export default MainMenu;
