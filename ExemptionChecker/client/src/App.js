import './App.css';
import Nav, {  } from './Components/nav'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './Pages/Home';
import Users from './Pages/Users';
import Polytechnics from './Pages/Polytechnics';
import Courses from './Pages/Courses';
import DefaultPage from './Pages/DefaultPage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import useToken from './Components/useToken';
import Logout from './Pages/Logout';
import SlideDrawer, { Backdrop, DrawerItem, DrawerSection } from './Components/sideNav';

import dashboard from "./Assets/nav/dashboard.png";
import Details from './Pages/Details';
import PolytechnicModules from './Pages/PolytechnicModules';

/* function getToken() {  
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
} */

export default function App() {
  const { token, setToken, logout } = useToken();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const drawerToggleClickHandler = () => {
    setDrawerOpen(!drawerOpen)
  }


  let backdrop;
  if (drawerOpen) {
    backdrop = <Backdrop toggle={drawerToggleClickHandler} />;
  }

  if (!token) {
    return (
      <Router>
        {/* {backdrop} */}
        <div className="App">
          <LoggedOutNav toggle={drawerToggleClickHandler}></LoggedOutNav>
          <div className="App-header">
            <SlideDrawer show={drawerOpen} toggle={drawerToggleClickHandler} direction="top">

              <DrawerSection label={"Favourites"}>
                <DrawerItem label="Dashboard" to={"/"} width="25%"></DrawerItem>
              </DrawerSection>
              <DrawerSection label={"Modules"}>
                <DrawerItem label="Dashboard" to={"/"} width="25%"></DrawerItem>
              </DrawerSection>
            </SlideDrawer>
            {backdrop}
            <Routes>
              <Route path="/" element={
                <Login setToken={setToken}></Login>}></Route>
              <Route path="/Register" element={<Register />}></Route>
            </Routes>
          </div>
        </div>
      </Router>
    )
  } else {
    return (
      <Router>
        {/* {backdrop} */}
        <div className="App">
          <LoggedInNav user={token} logout={logout} toggle={drawerToggleClickHandler} show={drawerOpen}></LoggedInNav>
          <header className="App-header">
            {backdrop}
            <SlideDrawer show={drawerOpen} toggle={drawerToggleClickHandler} direction={"top"}>
              <DrawerSection label={"Modules"}>
                <DrawerItem label="Dashboard" to={"/"} logo={dashboard}></DrawerItem>
                <DrawerItem label="Users" to={"/Users"} logo={dashboard}></DrawerItem>
                <DrawerItem label="Polytechnics" to={"/Polytechnics"} logo={dashboard}></DrawerItem>
                <DrawerItem label="Courses" to={"/Courses"} logo={dashboard}></DrawerItem>
                <DrawerItem label="Modules" to={"/Modules"} logo={dashboard}></DrawerItem>
              </DrawerSection>
            </SlideDrawer>
            <Routes>
              <Route exact path="/" element={<DefaultPage />}>
              </Route>
              <Route path="/Home" element={<Home />}>
              </Route>
              <Route path="/Users" element={<Users />}>
              </Route>
              <Route path="/Polytechnics" element={<Polytechnics />}>
              </Route>
              <Route path="/Courses" element={<Courses />}>
              </Route>
              <Route path="/Modules" element={<PolytechnicModules />}>
              </Route>
              <Route path="/Logout" element={<Logout logout={logout}></Logout>}></Route>
            </Routes>
          </header>
        </div>
      </Router>
    );
  }
}


class LoggedInNav extends React.Component {

  state = {
    title: "ExemptionChecker"
  }
  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    const md = 768;
   if(window.innerWidth >= md){
        this.setState({
          title: "ExemptionChecker"
        })
    } else{
        this.setState({
          title: "ExemptionChecker"
        })
    }
  }
  render() {

    return (
      <Nav user={this.props.user} title={this.state.title
      } toggle={this.props.toggle} show={this.props.show}>
      </Nav>
    )
  }
}

class SwappingNavTitle extends React.Component{
  render(){
    return(
      <div className='SwappingNavTitleContainer'>
        <span className={"SwappingNavTitle"}>{this.props.title}</span>
        {this.props.secondaryTitle}
      </div>
    )
  }
}

class LoggedOutNav extends React.Component {
  render() {

    return (

      <Nav title={
        "ExemptionChecker"
      } toggle={this.props.toggle} >
      </Nav>
    )
  }
}