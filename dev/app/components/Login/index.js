import React, {Component} from 'react'
//import styles from './loginStyle.css'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Segment, Menu, Icon, Input, Checkbox, Header, Form, Grid, Button, Message } from 'semantic-ui-react'
import Logo from '../Logo';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {menuActiveItem:"login",
                  formData:{username:"amitush",password:"123"},
                  isServerChecking:false,
                  actionFailed:false};
  }

  handleChangeField = (e, { name, value }) => this.setState({formData:{ ...this.state.formData, [name]: value }})

  handleLogin(e){
    e.preventDefault();
    this.setState({isServerChecking:true});
    const { username, password } = this.state.formData;

    axios.post('/login', {username, password})
      .then(res => {
        this.props.login(res.data.user);
        history.push('/');
      })
      .catch(err => {
        this.setState({isServerChecking:false,actionFailed:true,message:err.message});
      });

  }

  //toggle = (name) => () =>  this.setState({formData:{ ...this.state.formData, [name]: !this.state.formData.keep }})
  // <Form.Checkbox
  //   name="keep"
  //   label='Keep me logged in'
  //   checked={keep}
  //   onChange={::this.toggle("keep")}/>

  handleRegister(e, { data }) {
    this.setState({username: e.target.value});
  }

  handleItemClick (e, { name }) {
    this.setState({ menuActiveItem: name })
  }

  render() {

    const {from } = this.props.location.state || { from: { pathname: '/main/game' } }
    const { keep, username, password} = this.state.formData;

    return this.props.isLoggedIn ?
      <Redirect to={from}/> :
        <Segment inverted style={{width:'400px',margin:'auto',position:'relative',top: '30px'}} >
          <Grid stretched={true} inverted>
            <Grid.Row style={{paddingTop:'20px'}}>
              <Grid.Column>
                <Logo size="large" textAlign="center"/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{height:'300px'}}>
              <Grid.Column>
                {(this.state.menuActiveItem === 'login')?
                  <Form onSubmit={::this.handleLogin} inverted
                  error={this.state.actionFailed}>
                    <Form.Input
                      name="username"
                      label="Username"
                      icon='user'
                      iconPosition='left'
                      placeholder='Username'
                      value={username}
                      onChange={::this.handleChangeField}
                      required />
                    <Form.Input
                      name="password"
                      label="Password"
                      icon='lock'
                      type="password"
                      iconPosition='left'
                      placeholder='Password'
                      value={password}
                      onChange={::this.handleChangeField}
                      required/>
                    <Form.Button type='submit' color='green'
                    loading={this.state.isServerChecking}>Login</Form.Button>
                    <Message
                       error
                       header='Logging was failed'
                       content={this.state.message}
                     />
                  </Form>
                :
                  <Form inverted onSubmit={this.handleLogin}>
                    <Form.Group widths={2}>
                      <Form.Input
                        required
                        name="username"
                        label="Username"
                        icon='user'
                        iconPosition='left'
                        placeholder='Username' />
                      <Form.Input
                        required
                        name="firstName"
                        label="First Name"
                        placeholder='First Name'/>
                    </Form.Group>
                    <Form.Group widths={2} >
                      <Form.Input
                        required
                        name="password"
                        label="Password"
                        icon='lock'
                        type="password"
                        iconPosition='left'
                        placeholder='Password'/>
                      <Form.Input
                        required
                        name="lastName"
                        label="Last Name"
                        placeholder='Last Name'/>
                    </Form.Group>
                    <Form.Button type='submit' color='green'>Register</Form.Button>
                  </Form>
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
