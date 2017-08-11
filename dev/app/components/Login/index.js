import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Segment, Menu, Icon, Grid } from 'semantic-ui-react'
import Logo from '../Logo'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {menuActiveItem:"login"};
  }


  handleRegister(e, { data }) {
    this.setState({username: e.target.value});
  }

  handleItemClick (e, { name }) {
    this.setState({ menuActiveItem: name })
  }

  render() {

    const {from } = this.props.location.state || { from: { pathname: '/main/game' } }

    return this.props.isLoggedIn ?
      <Redirect to={from}/> :
        <Segment inverted style={{width:'404px',margin:'auto',position:'relative',top:'30px',margin: 'auto'}} >
          <Grid stretched={true} inverted>
            <Grid.Row style={{paddingTop:'20px'}}>
              <Grid.Column>
                <Logo size="large" textAlign="center"/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{height:'350px'}}>
              <Grid.Column widths={2}>
                {(this.state.menuActiveItem === 'login')?
                  <LoginForm login={this.props.login}/>
                :
                  <RegistrationForm/>
                }
              </Grid.Column>
            </Grid.Row>
            <Grid.Row verticalAlign="bottom">
              <Grid.Column>
                <Menu widths={2}>
                  <Menu.Item
                    name='login'
                    active={this.state.menuActiveItem === 'login'}
                    onClick={::this.handleItemClick}>
                      login
                  </Menu.Item>
                  <Menu.Item
                    name='register'
                    active={this.state.menuActiveItem === 'register'}
                    onClick={::this.handleItemClick}>
                  register
                  </Menu.Item>
                </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
  }
}

export default Login
