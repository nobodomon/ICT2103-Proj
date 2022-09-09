import React from "react";
import { InputField } from "../Components/formElements";
import { useState } from "react";
import PropTypes from 'prop-types';
import { MultiStepBox, StdButton, StdInput } from "../Components/common";
import { DetailsContainerDivider } from "./Details";

async function loginUser(credentials) {
  return fetch('/attemptLogin', {
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
      transform: "translateX(0%)",
    }
    this.setPassword = this.setPassword.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setStep = this.setStep.bind(this);
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
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

  setUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  setPassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit = async e => {
    console.log("Submitted")
    e.preventDefault();
    const token = await loginUser({
      username: this.state.username, password: this.state.password
    });
    this.props.setToken(token);
  }

  render() {
    return (
      <div className="d-flex loginPage">
        <div className="loginContainer">
          <div className="leftPanel" style={{ transform: this.state.transform }}>
            <MultiStepBox currentStep={0}>
              {/* <div className="login-form">
                <div className="leftPanel-Title">
                  <span>Login</span>
                </div>
                <form onSubmit={this.handleSubmit}>
                  <StdInput showIndicator={false} showSaveBtn={false} label={"Username"} id="Username" title="Username" onChange={this.setUsername}></StdInput>
                  <StdInput showIndicator={false} showSaveBtn={false} label={"Password"} id="Password" title="Password" onChange={this.setPassword}></StdInput>
                  <button type="submit" className="btn btn-success">Submit</button>
                  <div onClick={this.props.nextstep}><a className="forgetPassword">Forgot Password?</a></div>
                </form>
                <div className="spacer">

                </div>
              </div> */}
              <LoginFormBox title={"Login"}
                handleSubmit={this.handleSubmit}
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
              <StdInput key={index} showIndicator={false} showSaveBtn={false} label={field.label} onChange={field.onChange}></StdInput>
            )
          })}
          <div className="row-cols-md-2 row-cols-1 loginActions">
            {this.props.actions.map((action, index) => {
              return (
                <StdButton key={index} type={action.type} className="primary" onClick={action.onClick}>{action.label}</StdButton>)
            })}
          </div>
          <div onClick={this.props.nextStep}><a className="forgetPassword">Forgot Password?</a></div>
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
            <StdButton type="button" onClick={this.props.prevStep} className="secondary">Back</StdButton>
            <StdButton type="button" className="primary">Submit</StdButton>
          </div>
          </form>
        <div className="spacer">
        </div>
      </div>
    )
  }
}



{/* <div className="login-form">
              <div className="leftPanel-Title">
                <span>Login</span>
              </div>
              <form onSubmit={this.handleSubmit}>
                <StdInput showIndicator={false} showSaveBtn={false} label={"Username"} id="Username" title="Username" onChange={this.setUsername}></StdInput>
                <StdInput showIndicator={false} showSaveBtn={false} label={"Password"} id="Password" title="Password" onChange={this.setPassword}></StdInput>
                <button type="submit" className="btn btn-success">Submit</button>
                <div onClick={() => this.setStep("fp")}><a className="forgetPassword">Forgot Password?</a></div>
              </form>
              <div className="spacer">
              
              </div>
            </div>
            <div className="login-form">
              <div className="leftPanel-Title">
                <span>Forget Password</span>
              </div>
              <form onSubmit={this.handleSubmit}>
                <StdInput showIndicator={false} showSaveBtn={false} label={"Username"} id="Username" title="Username" onChange={this.setUsername}></StdInput>
                <StdInput showIndicator={false} showSaveBtn={false} label={"Password"} id="Password" title="Password" onChange={this.setPassword}></StdInput>
                <div className="row-cols-md-2 row-cols-1 loginActions">
                  <StdButton type="button" onClick={() => this.setStep("")} className="secondary">Back</StdButton>
                  <StdButton type="button" className="primary">Submit</StdButton>
                </div>
              </form>
              <div className="spacer">

              </div>
            </div> */}