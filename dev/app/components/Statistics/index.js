import React from 'react'
import Loading from '../Loading'
import { Route } from 'react-router-dom'
import { Segment, Menu, Search } from 'semantic-ui-react'
//import style from './style.css'

class Statistics extends React.Component{

	constructor(props){
		super(props);
	}

	render() {

    const menu = <Menu vertical>
      <Menu.Item>
        {"Player\'s Recored"}
      </Menu.Item>
      <Menu.Item>
        Leaders
      </Menu.Item>
      <Menu.Item>
        Head2Head
      </Menu.Item>
    </Menu>

    const search = <Segment stacked secondary textAlign="right">
                      <Search  placeholder='Search...' aligned='right'/>
                  </Segment>
		return <Segment style={{display:'flex', backgroundColor: 'inherit', height:'100%'}}>
					{menu}
          <div style={{flex:'1'}}>
            {search}
          </div>
				</Segment>;
	}
}

export default Statistics
