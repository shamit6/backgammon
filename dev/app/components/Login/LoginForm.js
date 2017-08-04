import React, {Component} from 'react'
import axios from 'axios'
import { Form, Message } from 'semantic-ui-react'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = { formData:{playAsGuest:false},
                  isServerChecking:false,
                  actionFailed:false};
  }

  handleChangeField = (e, { name, value }) => this.setState({formData:{ ...this.state.formData, [name]: value }})

  handleLogin(e){
    e.preventDefault();
    this.setState({isServerChecking:true});
    
    axios.post('/login', this.state.formData)
      .then(res => {
        this.props.login(res.data.user);
        history.push('/');
      })
      .catch(err => {
        this.setState({isServerChecking:false,actionFailed:true,message:err.message});
      });

  }

  toggle = (name) => () => this.setState({formData:{ ...this.state.formData, [name]: !this.state.formData[name] }})


  render() {

    const {username, password, playAsGuest} = this.state.formData;

    return <Form onSubmit={::this.handleLogin} inverted
                  error={this.state.actionFailed}>
              <Form.Checkbox
                    name="playAsGuest"
                    label='play as guest'
                    checked={playAsGuest}
                    onChange={::this.toggle("playAsGuest")}/>
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
                disabled={playAsGuest}
                required={!playAsGuest}/>
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
