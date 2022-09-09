import React from "react";
import qr from "../Assets/myQr.png";
import admin from "../Assets/admin.png";
import { DivSpacing, StdInput } from "../Components/common";
import { Link } from "react-router-dom";
import food from "../Assets/food.png";
import goToRoom from "../Assets/go-to-room.png";
import customDashboard from "../Assets/custom-dashboard.png";
import vitalsDashboard from "../Assets/vitals-dashboard.png";
import printDorm from "../Assets/print-dorm.png";
import uploadAvatar from "../Assets/upload-avatar.png";
import logout from "../Assets/logout.png";

import appLogo from "../Assets/app-logo.png";


export default class DefaultPage extends React.Component {

    componentDidMount() {
        document.title = "DASHBOARD"
    }

    render() {
        return (
            <LimitedItemBodyContainer>

                <div className="container p-0">
                    <div className="row align-items-stretch indexLayout">
                        <div className="col-lg-3 col-md-4 col-12 d-flex flex-column">
                            <QrCard></QrCard>
                            <QuickActionsPanel className="h-100">
                                <QuickActions src={food} label="Meal Type" to="/test"></QuickActions>
                                <QuickActions src={goToRoom} label="Go To Room" to="/details"></QuickActions>
                                <QuickActions src={customDashboard} label="Dashboards" to="/Logout"></QuickActions>
                                <QuickActions src={vitalsDashboard} label="Vitals" to="/Logout"></QuickActions>
                                <QuickActions src={printDorm} label="Dorm QRCode" to="/Logout"></QuickActions>
                                <QuickActions src={uploadAvatar} label="Profile Pic" to="/Logout"></QuickActions>
                                <QuickActions src={logout} label="Logout" to="/Logout"></QuickActions>
                            </QuickActionsPanel>
                        </div>
                        <div className="col-lg-9 col-md-8 col-12">
                            <ListContainer>
                                <ListTile title={"Added Staff 328 to Staff List"} subtitle={"1:40am"} singleLine={true}></ListTile>
                                <ListTile title={"Edited Staff 593 (Permissions > Staff > General) from No Access to View Only"} subtitle={"10:40am"} singleLine={true}></ListTile>
                                <ListTile title={"Added Staff 825 to Staff List"} subtitle={"7:40am"} singleLine={true}></ListTile>
                                <ListTile title={"Added Staff 676 to Staff List"} subtitle={"4:40am"} singleLine={true}></ListTile>
                                <ListTile title={"Added Staff 966 to Staff List"} subtitle={"1:40pm"} singleLine={true}></ListTile>
                                <ListTile title={"Deleted Cluster Blue from Punggol Lodge One"} subtitle={"10:40pm"} singleLine={true}></ListTile>
                                <ListTile title={"Added Staff 974 to Staff List"} subtitle={"7:40pm"} singleLine={true}></ListTile>
                                <ListTile title={"Added Staff 165 to Staff List"} subtitle={"10 May 22"} singleLine={true}></ListTile>
                                <ListTile title={"Added Staff 529 to Staff List"} subtitle={"10 May 22"} singleLine={true}></ListTile>
                                <ListTile title={"Added Staff 793 to Staff List"} subtitle={"10 May 22"} singleLine={true}></ListTile>
                                <ListTile title={"Added Staff 328 to Staff List"} subtitle={"1:40am"} singleLine={true}></ListTile>
                                <ListTile title={"Edited Staff 593 (Permissions > Staff > General) from No Access to View Only"} subtitle={"10:40am"} singleLine={true}></ListTile>
                                <ListTile title={"Added Staff 825 to Staff List"} subtitle={"7:40am"} singleLine={true}></ListTile>
                                <ListTile title={"Added Staff 676 to Staff List"} subtitle={"4:40am"} singleLine={true}></ListTile>
                                <ListTile title={"Added Staff 966 to Staff List"} subtitle={"1:40pm"} singleLine={true}></ListTile>
                                <ListTile title={"Deleted Cluster Blue from Punggol Lodge One"} subtitle={"10:40pm"} singleLine={true}></ListTile>
                            </ListContainer>
                        </div>
                    </div>
                </div>

                {/* <Card>
                    <StdInput label="Test"></StdInput>
                    <DivSpacing spacing={1}></DivSpacing>
                    <StdInput label="Test2"></StdInput>
                    <DivSpacing spacing={1}></DivSpacing>
                    <StdInput label="Test3" editable={true} showIndicator={true}></StdInput>
                </Card> */}
            </LimitedItemBodyContainer>
        )
    }
}

export class BodyContainer extends React.Component {
    render() {
        return (
            <div className="d-flex flex-column col-12 cardBg-light justify-content-center align-items-start ">
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
                            {/* <div className="col-12 col-lg-3 p-2">
                                    {leftItems}
                                </div> */}
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )


    }
}

class Card extends React.Component {
    render() {
        return (
            <div className={"mb-3 light d-flex flex-column justify-content-center align-items-center " + this.props.className}>
                {this.props.children}
            </div>
        )
    }
}
class QrCard extends React.Component {
    render() {
        return (
            <div className="flex-column d-flex justify-content-md-start justify-content-center">
                <h1 className="text-md-start text-center">Support Team</h1>
                <div className="text-center text-md-start">
                    <img alt="QR Code" className="p-2 cardBg border rounded" src={qr} width="128px"></img>
                </div>
            </div>
        )
    }
}

class QuickActionsPanel extends React.Component {
    render() {
        return (
            <div className={" " + this.props.className}>
                <h1 className="text-md-start text-center">Quick Actions</h1>
                <div className="d-flex flex-nowrap overflow-auto align-items-stretch w-100 flex-md-column flex-row">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

class QuickActions extends React.Component {
    render() {
        return (
            <Link to={this.props.to} className="actionIcon">
                <div className="d-flex flex-md-row flex-column p-2 align-items-center justify-content-start">
                    <img src={this.props.src} width="32px" height="32px" alt={this.props.label}></img>
                    <DivSpacing spacing={1}></DivSpacing>
                    {this.props.label}
                </div>
            </Link>
        )
    }
}

class ListContainer extends React.Component {
    render() {
        return (
            <Card>
                <h1 className="text-md-start text-center">
                    My Latest Events
                </h1>
                <div className="listContainer">
                    {this.props.children}
                </div>
            </Card>
        );
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

class Heading extends React.Component {
    render() {
        return (
            <div className="cardHeader d-flex align-self-start ">
                {this.props.children}
            </div>
        )
    }
}