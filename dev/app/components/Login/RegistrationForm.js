import React, {Component} from 'react'
import axios from 'axios'
import { Segment, Menu, Icon, Input, Checkbox, Header, Form, Label, Button, Message } from 'semantic-ui-react'
import {COUNTRIES} from '../../../common/constants'
import style from './style.css'

class RegistrationForm extends Component {
  constructor(props) {
    super(props)
    this.state = { formData:{},
                  usernameFieldIcon:null,
                  usernameChecking:false,
                  isServerChecking:false,
                  actionSuccessed:false};
  }

  handleChangeField(e, { name, value }){
    this.setState({formData:{ ...this.state.formData, [name]: value }})
  }

  handleRegistration(e){
    e.preventDefault();
    this.setState({isServerChecking:true});

    axios.post('/register', this.state.formData)
      .then(res => {
          this.setState({isServerChecking:false, actionSuccessed:true});
      })
      .catch(err => {
        this.setState({isServerChecking:false, message:err.message});
      });
  }

  handleUsernameFieldChange(e, { name, value }){

    ::this.handleChangeField(e, { name, value });
    this.setState({usernameChecking:true});
    axios.post('/register/validation/username', {[name]:value})
      .then(res => {
        console.log(res);
        this.setState({usernameChecking:false,usernameFieldIcon:{name:'checkmark',color:'green'}});
      })
      .catch((err) => {
        this.setState({usernameChecking:false,usernameFieldIcon:{name:'remove',color:'red'}});
      });


  }

  render() {

    const {username, password} = this.state.formData;
//<Label style={{position:'absolute',zIndex:'1'}} basic color='red' pointing={true}>Please enter a value</Label>
    return <Form inverted onSubmit={::this.handleRegistration} success={this.state.actionSuccessed}>
      <Form.Group width={2}>
          <Form.Input className={style.field}
            name="username"
            label="Username"
            icon={this.state.usernameFieldIcon}
            placeholder='Username'
            value={username}
            loading={this.state.usernameChecking}
            onChange={::this.handleUsernameFieldChange}
            required />

        <Form.Input
          required
          name="firstName"
          label="First Name"
          placeholder='First Name'
          onChange={::this.handleChangeField}/>
      </Form.Group>

      <Form.Group  width={2}>
        <Form.Input
          required
          name="password"
          label="Password"
          type="password"
          placeholder='Password'
          onChange={::this.handleChangeField}/>
        <Form.Input
          required
          name="lastName"
          label="Last Name"
          placeholder='Last Name'
          onChange={::this.handleChangeField}/>
      </Form.Group>
      <Form.Select
        required
        name="country"
        label="County"
        placeholder='Select your country'
        options={COUNTRIES}
        onChange={::this.handleChangeField}/>

      <Form.Button loading={this.state.isServerChecking} type='submit' color='green'>Register</Form.Button>
      <Message
            content="You can login now"
            header="Welcome"
            success
        />
    </Form>
  }
}

export default RegistrationForm
