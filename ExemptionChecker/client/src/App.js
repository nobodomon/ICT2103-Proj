import './App.css';
import Nav, {  } from './Components/nav'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './Pages/Home';
import Test from './Pages/Test';
import DefaultPage from './Pages/DefaultPage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import useToken from './Components/useToken';
import Logout from './Pages/Logout';
import appLogo from "./Assets/app-logo.png"
import SlideDrawer, { Backdrop, DrawerItem, DrawerSection } from './Components/sideNav';
import misconduct from "./Assets/nav/misconduct.png";
import accessory from "./Assets/nav/accessory.png";
import agreements from "./Assets/nav/agreements.png";
import clients from "./Assets/nav/clients.png";
import dashboard from "./Assets/nav/dashboard.png";
import exit from "./Assets/nav/exit.png";
import facility from "./Assets/nav/facility.png";
import feedback from "./Assets/nav/feedback.png";
import firstAidSign from "./Assets/nav/first-aid-sign.png";
import history from "./Assets/nav/history.png";
import notification from "./Assets/nav/notification.png";
import overview from "./Assets/nav/overview.png";
import permissions from "./Assets/nav/permissions.png";
import reports from "./Assets/nav/reports.png";
import security from "./Assets/nav/security.png";
import staff from "./Assets/nav/staff.png";
import task from "./Assets/nav/task.png";
import tenants from "./Assets/nav/tenants.png";
import transfer_v2 from "./Assets/nav/transfer_v2.png";
import visitor from "./Assets/nav/visitor.png";
import Details from './Pages/Details';
import { AnimatedBackGround, Footer } from './Components/common';

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
                <DrawerItem label="Misconduct" to={"/"} width="25%" logo={misconduct}></DrawerItem>
                <DrawerItem label="Exit Req." to={"/"} width="25%"></DrawerItem>
                <DrawerItem label="Facility" to={"/"} width="25%"></DrawerItem>
                <DrawerItem label="Feedback" to={"/"} width="25%"></DrawerItem>
                <DrawerItem label="Transfer" to={"/"} width="25%"></DrawerItem>
                <DrawerItem label="Tasks" to={"/"} width="25%"></DrawerItem>
              </DrawerSection>
              <DrawerSection label={"Modules"}>

                <DrawerItem label="Dashboard" to={"/"} width="25%"></DrawerItem>
                <DrawerItem label="Estate" to={"/"} width="25%"></DrawerItem>
                <DrawerItem label="Resident" to={"/"} width="25%"></DrawerItem>
                <DrawerItem label="Report Sick" to={"/"} width="25%"></DrawerItem>
                <DrawerItem label="Staff" to={"/"} width="25%"></DrawerItem>
                <DrawerItem label="Permission" to={"/"} width="25%"></DrawerItem>
                <DrawerItem label="Client" to={"/"} width="25%"></DrawerItem>
                <DrawerItem label="Agreement" to={"/"} width="25%"></DrawerItem>
                <DrawerItem label="Accessory" to={"/"} width="25%"></DrawerItem>
                <DrawerItem label="Misconduct" to={"/"} width="25%"></DrawerItem>
                <DrawerItem label="Exit Req." to={"/"} width="25%"></DrawerItem>
                <DrawerItem label="Facility" to={"/"} width="25%"></DrawerItem>
                <DrawerItem label="Feedback" to={"/"} width="25%"></DrawerItem>
                <DrawerItem label="Transfer" to={"/"} width="25%"></DrawerItem>
                <DrawerItem label="Tasks" to={"/"} width="25%"></DrawerItem>
                <DrawerItem label="Visitor" to={"/"} width="25%"></DrawerItem>
                <DrawerItem label="Security" to={"/"} width="25%"></DrawerItem>
                <DrawerItem label="Reports" to={"/"} width="25%"></DrawerItem>
                <DrawerItem label="Notification" to={"/"} width="25%"></DrawerItem>
                <DrawerItem label="History" to={"/"} width="25%"></DrawerItem>
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
          <Footer></Footer>
      </Router>
    )
  } else {
    return (
      <Router>
        {/* {backdrop} */}
        <div className="App">
          <LoggedInNav logout={logout} toggle={drawerToggleClickHandler} show={drawerOpen}></LoggedInNav>
          <header className="App-header">
            {backdrop}
            <SlideDrawer show={drawerOpen} toggle={drawerToggleClickHandler} direction={"top"}>
              <DrawerSection>
                <DrawerItem type={"favourite"} label="Misconduct" to={"/"} logo={misconduct}></DrawerItem>
                <DrawerItem type={"active"} label="Exit Req." to={"/"} logo={exit}></DrawerItem>
                <DrawerItem type={"favourite"} label="Facility" to={"/"} logo={facility}></DrawerItem>
                <DrawerItem type={"favourite"} label="Feedback" to={"/"} logo={feedback}></DrawerItem>
                <DrawerItem type={"favourite"} label="Transfer" to={"/"} logo={transfer_v2}></DrawerItem>
                <DrawerItem label="Tasks" to={"/"} logo={task}></DrawerItem>
                <DrawerItem label="Dashboard" to={"/"} logo={dashboard}></DrawerItem>
                <DrawerItem label="Estate" to={"/"} logo={overview}></DrawerItem>
                <DrawerItem label="Resident" to={"/"} logo={tenants}></DrawerItem>
                <DrawerItem label="Report Sick" to={"/"} logo={firstAidSign}></DrawerItem>
                <DrawerItem label="Staff" to={"/"} logo={staff}></DrawerItem>
                <DrawerItem label="Permission" to={"/"} logo={permissions}></DrawerItem>
                <DrawerItem label="Client" to={"/"} logo={clients}></DrawerItem>
                <DrawerItem label="Agreement" to={"/"} logo={agreements}></DrawerItem>
                <DrawerItem label="Accessory" to={"/"} logo={accessory}></DrawerItem>
                <DrawerItem label="Visitor" to={"/"} logo={visitor}></DrawerItem>
                <DrawerItem label="Security" to={"/"} logo={security}></DrawerItem>
                <DrawerItem label="Reports" to={"/"} logo={reports}></DrawerItem>
                <DrawerItem label="Notification" to={"/"} logo={notification}></DrawerItem>
                <DrawerItem label="History" to={"/"} logo={history}></DrawerItem>
              </DrawerSection>
            </SlideDrawer>
            <Routes>
              <Route exact path="/" element={<DefaultPage />}>
              </Route>
              <Route path="/Home" element={<Home />}>
              </Route>
              <Route path="/test" element={<Test />}>
              </Route>
              <Route path="/details" element={<Details />}>
              </Route>
              <Route path="/Logout" element={<Logout logout={logout}></Logout>}></Route>
            </Routes>
          </header>
        </div>
          <Footer></Footer>
      </Router>
    );
  }
}


class LoggedInNav extends React.Component {

  state = {
    title: <img src={appLogo} height="15px" className="d-inline-block align-items-center appLogo" alt=""></img>
  }
  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    const md = 768;
   if(window.innerWidth >= md){
        this.setState({
          title: <img src={appLogo} height="15px" className="d-inline-block align-items-center appLogo" alt=""></img>
        })
    } else{
        this.setState({
          title: <SwappingNavTitle title={document.title} secondaryTitle={<img src={appLogo} height="15px" className=" appLogo" alt=""></img>
        }></SwappingNavTitle>
        })
    }
  }
  render() {

    return (
      <Nav title={this.state.title
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
        <img src={appLogo} height="15px" className="d-inline-block align-items-center appLogo" alt=""></img>
      } toggle={this.props.toggle} >
      </Nav>
    )
  }
}