import React, {Component} from 'react'
import axios from 'axios'
import { Segment, Menu, Icon, Input, Checkbox, Header, Form, Grid, Button, Message } from 'semantic-ui-react'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = { formData:{username:"amitush",password:"123"},
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

  render() {

    const {username, password} = this.state.formData;

    return <Form onSubmit={::this.handleLogin} inverted
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
  }
}

export default LoginForm
