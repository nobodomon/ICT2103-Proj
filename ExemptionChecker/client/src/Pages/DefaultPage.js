import React from "react";
import qr from "../Assets/myQr.png";
import admin from "../Assets/admin.png";
import { StdInput } from "../Components/input";
import { Link } from "react-router-dom";
import food from "../Assets/food.png";
import goToRoom from "../Assets/go-to-room.png";
import customDashboard from "../Assets/custom-dashboard.png";
import vitalsDashboard from "../Assets/vitals-dashboard.png";
import printDorm from "../Assets/print-dorm.png";
import uploadAvatar from "../Assets/upload-avatar.png";
import logout from "../Assets/logout.png";

import appLogo from "../Assets/app-logo.png";

const testOptions = [
    {label: "Option 1", value: 1}, 
    {label: "Option 2", value: 2},
    {label: "Option 3", value: 3},
    {label: "Option 4", value: 4},
    {label: "Option 5", value: 5},
    {label: "Option 6", value: 6},
]

export default class DefaultPage extends React.Component {

    componentDidMount() {
        document.title = "DASHBOARD"
    }

    render() {
        return (
            <BodyContainer>
                <div className="col-4">
                    <StdInput type={"text"} label={"Text Box"} onChange={()=>{}}></StdInput> 
                    <StdInput type={"password"} label={"Password Box"} onChange={()=>{}}></StdInput>
                    <StdInput type={"number"} label={"Number Box"} onChange={()=>{}}></StdInput>
                    <StdInput type={"time"} label={"Time Box"} onChange={()=>{}}></StdInput> 
                    <StdInput type={"date"} label={"Date Box"} onChange={()=>{}}></StdInput>   
                    <StdInput type={"datetime"} label={"Date Time Box"} onChange={()=>{}}></StdInput> 
                    <StdInput type={"dropdown"} options={testOptions} label={"Dropdown Box"}></StdInput>   
                </div>
                <div className="col-4">  
                    <StdInput enabled={true} type={"text"} label={"Text Box"} onChange={()=>{}}></StdInput>
                    <StdInput enabled={true} type={"password"} label={"Password Box"} onChange={()=>{}}></StdInput> 
                    <StdInput enabled={true} type={"number"} label={"Number Box"} onChange={()=>{}}></StdInput>
                    <StdInput enabled={true} type={"time"} label={"Time Box"} onChange={()=>{}}></StdInput> 
                    <StdInput enabled={true} type={"date"} label={"Date Box"} onChange={()=>{}}></StdInput>   
                    <StdInput enabled={true} type={"datetime"} label={"Date Time Box"} onChange={()=>{}}></StdInput>   
                    <StdInput enabled={true} options={testOptions} type={"dropdown"} label={"Dropdown Box"} onChange={()=>{}}></StdInput>   
                </div>
                <div className="col-4">  
                    <StdInput hasSaveBtn={true} enabled={true} type={"text"} label={"Text Box"} onChange={()=>{}}></StdInput>
                    <StdInput hasSaveBtn={true} enabled={true} type={"password"} label={"Password Box"} onChange={()=>{}}></StdInput> 
                    <StdInput hasSaveBtn={true} enabled={true} type={"number"} label={"Number Box"} onChange={()=>{}}></StdInput>
                    <StdInput hasSaveBtn={true} enabled={true} type={"time"} label={"Time Box"} onChange={()=>{}}></StdInput> 
                    <StdInput hasSaveBtn={true} enabled={true} type={"date"} label={"Date Box"} onChange={()=>{}}></StdInput>   
                    <StdInput hasSaveBtn={true} enabled={true} type={"datetime"} label={"Date Time Box"} onChange={()=>{}}></StdInput>   
                    <StdInput hasSaveBtn={true} enabled={true} options={testOptions} type={"dropdown"} label={"Dropdown Box"} onChange={()=>{}}></StdInput>   
                </div>
            </BodyContainer>
        )
    }
}

export class BodyContainer extends React.Component {
    render() {
        return (
            <div className="row col-12 cardBg-light justify-content-center align-items-start ">
                {this.props.children}
            </div>
        )
    }
}

export class LimitedItemBodyContainer extends React.Component {
    render() {
        var itemCount = React.Children.count(this.props.children);

        return (
            <div className="d-flex col-12 col-lg-10 cardBg justify-content-center m-4">
                <div className="d-flex col-12 col-lg-8  justify-content-center align-items-stretch flex-wrap">
                    <div className="container">
                        <div className="row align-items-stretch p-4">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )


    }
}


export class ListTile extends React.Component {
    state = {
        title: <div />,
        subtitle: <div />,
        leading: <div />
    }
    render() {
        var commonClassName = "d-flex p-2"
        return (
            <div className=" d-flex justify-content-start align-items-center">
                {this.props.leading}
                <div className={this.props.singleLine ? commonClassName + " justify-content-between align-items-center" : commonClassName + " align-items-start justify-content-start flex-column"}>
                    <div className="mb-0">{this.props.title}</div>
                    <p className="mb-0">{this.props.subtitle}</p>
                </div>
            </div>
        )
    }
}