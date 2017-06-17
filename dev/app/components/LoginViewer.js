//import styled from "styled-components";
import React, { Component, PropTypes }  from 'react';
import styles from './loginStyle.css';
import { Redirect } from 'react-router-dom'
import { rules, Form, Input, Select, Textarea, Button } from 'react-validation/lib/build/validation.rc'


Object.assign(rules, {
    // Key name maps the rule 
    required: {
        // Function to validate value 
        // NOTE: value might be a number -> force to string 
        rule: value => {
            return value.toString().trim();
        },
        // Function to return hint 
        // You may use current value to inject it in some way to the hint 
        hint: value => {
            return <span className={styles.loginErrorFieldMessage}>Required</span>
        }
    }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({username: event.target.value});
  }

  handleSubmit(event) {
    this.props.login(this.state.username, this.refs.remembr_me.checked);
  }

  render() {

    const {from } = this.props.location.state || { from: { pathname: '/main/game' } }

    return this.props.isLoggedIn ? 
      <Redirect to={from}/> :
      <div className={styles.loginPanel}>
        <h3 className={styles.loginTitle}>{"Shubapp backgammon"}</h3>
        <div className={styles.loginImage}/>
        <Form className={styles.loginForm} onSubmit={this.handleSubmit}> 
            <div className={styles.fieldContainer}>
                <label>UserName*</label>
                <Input className={styles.loginInputUsername} errorClassName={styles.loginInpitError} 
                  value="" validations={['required']} onChange={this.handleChange}/>          
            </div>
            <div className={styles.remembrMe}> 
                <input type="checkbox" id="checkbox_id" ref="remembr_me"/>
                <label for="checkbox_id">Remembr me</label>       
            </div>
            <div>
                <Button className={styles.loginButton}>Submit</Button>
            </div>
        </Form>
      </div>
  }
}

export default Login