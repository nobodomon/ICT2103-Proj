import React from "react";
import { InputField } from "../Components/formElements";
import { useState } from "react";
import PropTypes from 'prop-types';
import { MultiStepBox, StdButton, Step} from "../Components/common";
import { DetailsContainerDivider } from "./Details";
import { StdInput } from "../Components/input";

const loginSteps = {0: "login", 1: "register",2: "forgot"}


async function loginUser(credentials) {
  return fetch('/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(function (res) { return res.json(); })
}


async function registerUser(credentials){
  return fetch('/users/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(function (res) { return res.json(); })
}

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: "",
      transform: "translateX(0%)",
    }
    this.setPassword = this.setPassword.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.setStep = this.setStep.bind(this);
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize = () => {
    if (window.innerWidth <= 576) {
      this.setState({
        transform: 'translateX(0%)'
      })
    } else {
      this.setState({
        transform: 'translateX(0%)'
      })
    }
  }

  setStep(e) {
    if (e === "fp") {
      if (window.innerWidth <= 576) {
        this.setState({
          transform: 'translateX(-100%)'
        })
      } else {
        this.setState({
          transform: 'translateX(-50%)'
        })
      }
    } else {

      if (window.innerWidth <= 576) {
        this.setState({
          transform: 'translateX(-0%)'
        })
      } else {
        this.setState({
          transform: 'translateX(-0%)'
        })
      }
    }
  }

  setUsername(field, value) {
    this.setState({
      username: value
    })
  }

  setPassword(field,value) {
    this.setState({
      password: value
    })
  }

  handleLogin = async e => {
    console.log(e,"Submitted")
    e.preventDefault();
    const token = await loginUser({
      username: this.state.username, password: this.state.password
    });
    if(token.success){
      this.props.setToken(token);
    }else{
      this.setState({
        message: token.message
      })
    }
  }

  handleRegister = async e => {
    console.log(e,"Submitted")
    e.preventDefault();
    const token = await registerUser({
      username: this.state.username, password: this.state.password
    });

    if(token.success){
      console.log(token)
      this.props.setToken(token);
    }else{
      this.setState({
        message: token.message
      })
    }

  }

  render() {
    return (
      <div className="d-flex loginPage">
        <div className="loginContainer">
          <div className="leftPanel" style={{ transform: this.state.transform }}>
            <MultiStepBox steps={loginSteps} currentStep={0}>
              <LoginFormBox title={"Login"}
                handleSubmit={this.handleLogin}
                fields={[{
                  label: "Username",
                  onChange: this.setUsername,
                }, {
                  label: "Password",
                  onChange: this.setPassword,
                }]}
                actions={[{
                  label: "Submit",
                  type: "Submit",
                  onClick: null,
                }]}>
              </LoginFormBox>
              <RegisterFormBox title={"Register"}
                handleSubmit={this.handleRegister}
                fields={[{
                  label: "Username",
                  onChange: this.setUsername,
                }, {
                  label: "Password",
                  onChange: this.setPassword,
                }]}
                actions={[{
                  label: "Submit",
                  type: "Submit",
                  onClick: null,
                }]}>
              </RegisterFormBox>
              <ForgetPasswordFormBox title={"Forget Password"}
                handleSubmit={this.handleSubmit}
                fields={[{
                  label: "Email",
                  onChange: () => { },
                }]}
                actions={[{
                  label: "Submit",
                  type: "Submit",
                  onClick: null,
                }, {
                  label: "Submit",
                  type: "Submit",
                  onClick: null,
                }]}>
              </ForgetPasswordFormBox>
            </MultiStepBox>
          </div>
          <div className="rightPanel">
            {window.innerWidth >= 576 &&
              <ul class='circles'>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>}
              <div className="logoContainer">

              </div>
              <div className="logoCaption">
                <h1>
                  Welcome Back!
                </h1>
              </div>
          </div>
        </div>
        <div className={"modalMessage " + (this.state.message.length > 0 ? "show" : "")} onAnimationEnd={()=>this.setState({
          message: ""
        })}>
          {this.state.message}
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export class LoginFormBox extends React.Component {
  render() {
    return (

      <div className="login-form">
        <div className="leftPanel-Title">
          <span>{this.props.title}</span>
        </div>
        <form onSubmit={this.props.handleSubmit}>
          {this.props.fields.map((field, index) => {
            return (
              <StdInput key={index} enabled={true} showIndicator={false} showSaveBtn={false} label={field.label} onChange={field.onChange}></StdInput>
            )
          })}
          <div className="row-cols-md-2 row-cols-1 loginActions">
            {this.props.actions.map((action, index) => {
              return (
                <StdButton key={index} type={action.type} className="primary" onClick={action.onClick}>{action.label}</StdButton>)
            })}
          </div>
          <div onClick={()=>this.props.setStep(1)}><a className="forgetPassword">Don't have an account? Click here to register.</a></div>
          <div onClick={()=>this.props.setStep(2)}><a className="forgetPassword">Forgot Password?</a></div>
        </form>
        <div className="spacer">
        </div>
      </div>
    )
  }
}

export class RegisterFormBox extends React.Component {
  render() {
    return (

      <div className="login-form">
        <div className="leftPanel-Title">
          <span>{this.props.title}</span>
        </div>
        <form onSubmit={this.props.handleSubmit}>
          {this.props.fields.map((field, index) => {
            return (
              <StdInput key={index} enabled={true} showIndicator={false} showSaveBtn={false} label={field.label} onChange={field.onChange}></StdInput>
            )
          })}
          <div className="row-cols-md-2 row-cols-1 loginActions">
            {this.props.actions.map((action, index) => {
              return (
                <StdButton key={index} type={action.type} className="primary" onClick={action.onClick}>{action.label}</StdButton>)
            })}
          </div>
          <div onClick={()=>this.props.setStep(0)}><a className="forgetPassword">Already have an account?</a></div>
          <div onClick={()=>this.props.setStep(2)}><a className="forgetPassword">Forgot Password?</a></div>
        </form>
        <div className="spacer">
        </div>
      </div>
    )
  }
}

export class ForgetPasswordFormBox extends React.Component {
  render() {
    return (

      <div className="login-form">
        <div className="leftPanel-Title">
          <span>{this.props.title}</span>
        </div>
        <form onSubmit={this.props.handleSubmit}>
          {this.props.fields.map((field, index) => {
            return (
              <StdInput key={index} showIndicator={false} showSaveBtn={false} label={field.label} onChange={field.onChange}></StdInput>
            )
          })}
          <div className="loginActions">
            <StdButton type="button" onClick={()=>this.props.setStep(0)} className="secondary">Back</StdButton>
            <StdButton type="button" className="primary">Submit</StdButton>
          </div>
          </form>
        <div className="spacer">
        </div>
      </div>
    )
  }
}