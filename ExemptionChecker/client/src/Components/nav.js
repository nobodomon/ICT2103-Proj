import React from "react";
import { NavLink } from "react-router-dom";
import { Link , useNavigate} from 'react-router-dom'
import { Hamburger, IconButton,IconButtonAsLink } from "./common";
import placeholderUser from "../Assets/placeholderUser.png"
import { ListTile } from "../Pages/DefaultPage";

export default class Nav extends React.Component {
    render() {
        const baseNavClasses = "navbar navbar-expand-lg sticky-top d-flex justify-content-center container-fluid" + this.props.classes;
        return (
            <nav className={baseNavClasses} style={{ height: "56px" }}>
                <div className="d-flex align-items-center justify-content-between row-cols-md-3 col-12">
                    <Hamburger onClick={this.props.toggle} show={this.props.show}></Hamburger>
                    <Link className={"navbar-brand row "} to="/">
                        {this.props.title}
                    </Link>

                    <UserPanel user={this.props.user}></UserPanel>
                </div>
            </nav>
        )
    }
}
Nav.defaultProps = {
    classes : ""
}

export class UserPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showUserDetail: true,
        }
        this.routeChange = this.routeChange.bind(this);
    }
    componentDidMount() {

        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    routeChange=(e)=> {
        let path = e;
      }
    

    resize() {
        if (window.innerWidth <= 760) {
            this.setState({
                showUserDetail: false
            })
        } else {
            this.setState({
                showUserDetail: true
            })
        }
    }

    render() {
        return (
            <div className={"userPanel align-items-center"}>
                {this.state.showUserDetail &&
                <IconButtonAsLink to={"/"} className={"invert"} icon={<i class="bi bi-house"></i>}></IconButtonAsLink>
                }
                {this.state.showUserDetail && 
                <IconButtonAsLink to={"/Logout"} className={"invert"} onClick={this.routeChange("/Logout")} icon={<i class="bi bi-box-arrow-left"></i>}></IconButtonAsLink>
                }
                {this.state.showUserDetail ? <ListTile leading={<img src={placeholderUser} width={"32px"}></img>} title={<span className="m-0">{this.props.user? this.props.user.data[0].username : ""}</span>}>

                </ListTile> : <ListTile leading={<img src={placeholderUser} width={"32px"}></img>}>

                </ListTile>}
            </div>
        )
    }
}

export class NaviLink extends React.Component {
    render() {
        return (
            <li className="nav-item">
                <NavLink className={(navData) => (navData.isActive ? "active nav-link" : "nav-link")} to={this.props.to}>{this.props.title}</NavLink>
            </li>
        )
    }
}

export class DisabledLink extends React.Component {
    render() {
        return (

            <li className="nav-item">
                <Link className={"nav-link disabled"} to="/" tabindex="-1" aria-disabled="true">Disabled</Link>
            </li>
        )
    }
}

export class DropDownLink extends React.Component {
    render() {
        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" onClick={this.props.onClick} href={this.props.to} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {this.props.title}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {this.props.children}
                </ul>
            </li>
        )
    }
}

export class DropDownItem extends React.Component {
    render() {
        return (
            <li><NavLink className={(navData) => (navData.isActive ? "active dropdown-item" : "dropdown-item")} to={this.props.to}>{this.props.title}</NavLink></li>
        )
    }
}

export class DarkModeToggle extends React.Component {
    state = {
        isChecked: false
    }

    toggleChange = e => {
        if (this.state.isChecked) {
            sessionStorage.setItem("DarkMode", false)
            this.setState({
                isChecked: false
            })
        } else {

            sessionStorage.setItem("DarkMode", true)
            this.setState({
                isChecked: true
            })
        }
    }
    render() {
        return (
            <input type="checkbox" checked={this.state.isChecked} onChange={this.toggleChange
            }>
            </input >
        )
    }
}