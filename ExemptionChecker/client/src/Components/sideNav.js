import React from 'react'
import '../styles/SlideDrawer.scss'
import { SizedBox } from './common'
import { Link } from 'react-router-dom'



export default class SlideDrawer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      drawerClass: "", 
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.show !== this.props.show){
      this.setState({
        drawerClass: this.props.show ? 'open' : ''
      })
    }
  }

  render(){
    if(this.props.direction === "top"){
      return (
        <div className={"side-drawer-top col-md-auto col-12 mb-4" + " " + this.state.drawerClass} id="drawerTop">
          {this.props.children}
        </div>
      )
    }
    if(this.props.direction === "bot"){
      return(
        <div className={"col-12 side-drawer-bot" + " " + this.state.drawerClass} id="drawerTop" style={{"--primarySetting":this.props.settings.primaryColor}}>
          {this.props.children}
        </div>
      )
    }
  }
}

export class Backdrop extends React.Component {
  render() {
    return (
      <div className="backdrop" onClick={this.props.toggle} />
    )
  }
}

export class DrawerItem extends React.Component {
  constructor(props){
    super(props);
    if(this.props.type === "active"){
      this.state = {
        classType: "active"
      }
    }
    if(this.props.type === "favourite"){
      this.state = {
        classType : "favourite"
      }
    }
    if(this.props.type === "default"){
      this.state = {
        classType : ""
      }
    }
  }
  render() {

    return (
      <Link className={"drawerItem"} to={this.props.to} style={{ minWidth: this.props.width, maxWidth: this.props.width }} onClick={this.props.onClick}>
        {this.props.logo != undefined ?
          <img className={this.state.classType} src={this.props.logo} width={"56px"} height={"56px"}></img> : <></>}
        {this.props.label}
      </Link>
    )
  }
}
DrawerItem.defaultProps ={
  type:"default"
}


export class DrawerItemNonLink extends React.Component {

  render() {

    return (
      <div className={"drawerItemText"} style={{ minWidth: this.props.width, maxWidth: this.props.width }} onClick={this.props.onClick}>
        {this.props.logo != undefined ?
          <img src={this.props.logo} width={"56px"} height={"56px"}></img> : <></>}
        {this.props.label}
      </div>
    )
  }
}

export class BlankDrawerItem extends React.Component {
  render() {
    return (
      <SizedBox height={"56px"}></SizedBox>
    )
  }
}

export class DrawerSeperator extends React.Component {
  render() {
    return (
      <div className={"drawerSeperator text-center"}>

        <span>{this.props.label}
        </span>
      </div>
    )
  }
}

export class DrawerSection extends React.Component {
  render() {
    return (
      <div className='justify-content-center justify-items-start'>
        <div className='col-lg-12 col-12'>
          <div className="drawer-group justify-content-center">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}