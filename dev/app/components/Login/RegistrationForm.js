import React, {Component} from 'react'
import axios from 'axios'
import { Segment, Menu, Icon, Input, Checkbox, Header, Form, Label, Button, Message } from 'semantic-ui-react'
import {COUNTRIES} from '../../../common/constants'
import style from './style.css'
import Rx from 'rxjs/Rx'

class RegistrationForm extends Component {
  constructor(props) {
    super(props)
    this.state = { formData:{},
                  usernameFieldIcon:null,
                  usernameChecking:false,
                  isServerChecking:false,
                  actionSuccessed:false};

    this.userNameDebouncer = new Rx.Subject().debounceTime(500);
    this.userNameDebouncer.subscribe({
      next: (v) => ::this.validateUserName(v)
    });
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

  validateUserName(username){
    axios.post('/register/validation/username', {'username':username})
      .then(res => {
        this.setState({usernameChecking:false,
                       usernameFieldIcon:{name:'checkmark',color:'green',size:'large', style:{width: '1.67142857em'}}});
      })
      .catch((err) => {
        this.setState({usernameChecking:false,
                      usernameFieldIcon:{name:'remove',color:'red',size:'large', style:{width: '1.67142857em'}}});
      });
  }

  handleUsernameFieldChange(e, { name, value }){

    ::this.handleChangeField(e, { name, value });

    if (value === ""){
      this.setState({usernameChecking:false, usernameFieldIcon:'null'});
    } else {
      this.setState({usernameChecking:true});
      this.userNameDebouncer.next(value);
    }
  }

  render() {

    const {username, password} = this.state.formData;

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
            success/>
    </Form>
  }
}

export default RegistrationForm
