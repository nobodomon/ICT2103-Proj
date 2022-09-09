import { TableFooter, TableQuickAction, HeaderExpansion, BottomMenu } from "./PageLayout";
import React from "react";
import { IconButton, DivSpacing, StdInput, StdButton, SearchBar, StdSearchBar, StdInputDropDownOption } from "../Components/common";
import { Helmet } from "react-helmet"

import placeHolderUser from "../Assets/placeholderUser.png";

const settings = {
    primaryColor: "#48a1da",
    accentColor: "#8fc140",
    textColor: "#ffffff",
    textColorInvert: "#606060",
}

const residentProfileFields = [
    { label: "Name", type: "text" },
    { label: "Gender", type: "dropdown", options: [{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }] },
    { label: "NRIC/FIN", type: "text" },
    { label: "Nationality", type: "text" },
    { label: "Work Permit", type: "text" },
    { label: "Client", type: "text" },
    { label: "Permit Expiry", type: "date" },
    { label: "Room/Bed", type: "text" },
    { label: "Check-In Date", type: "date" },
    { label: "Location (Time)", type: "time" },
    { label: "Phone Number", type: "tel" },
    { label: "Remarks", type: "textarea" },
]

const enrollmentDetailsFields = [
    { label: "Access Card", type: "text" },
    {
        label: "Resident Status",
        type: "dropdown",
        options: [
            { value: "No Change", label: "No Change" },
            { value: "Check Out", label: "Check Out" },
            { value: "Check Out (No Show)", label: "Check Out (No Show)" },
            { value: "Admin Bar Resident", label: "Admin Bar Resident" },
            { value: "Security Bar Resident", label: "Security Bar Resident" },
            { value: "Unbar Resident", label: "Unbar Resident" },
            { value: "Reset Biometrics", label: "Reset Biometrics" },
            { value: "Checked-In (No Biometric)", label: "Checked-In (No Biometric)" },
            { value: "Revoke Card Only Access", label: "Revoke Card Only Access" },
        ]
    },
    { label: "Date Of Arrival", type: "date" },
    { label: "Check-In Date", type: "date" },
    { label: "Check-In Time", type: "time" },
    { label: "Agreement Start", type: "date" },
    { label: "Agreement End", type: "date" },
    { label: "Check-Out Date", type: "date" },
    {
        label: "Pass Returned", type: "dropdown",
        options: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" }
        ]
    },
]

const fields = [
    {
        groupName: "Resident Profile",
        fields: residentProfileFields,
    },
    {
        groupName: "Enrollment Details",
        fields: enrollmentDetailsFields,
    }
]

export default class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            showBottomMenu: false,
        }
        this.drawerToggleClickHandler = this.drawerToggleClickHandler.bind(this);


    }

    componentDidMount() {
        document.title = "Resident"
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }
    resize() {
        if (window.innerWidth <= 760) {
            this.setState({
                showBottomMenu: true
            })
        } else {
            this.setState({
                showBottomMenu: false
            })
        }
    }
    drawerToggleClickHandler() {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        })
    }

    render() {
        return (
            <div className="justify-content-center d-flex container-fluid">
                <Helmet>
                    <title>Resident</title>
                </Helmet>
                <div className="col-12 detailsStack" style={{ "--items": 3 }}>
                    {!this.state.showBottomMenu &&
                        <DetailsTableHeader
                            headerQuickActions={
                                [
                                    { onClick: () => { }, icon: <i class="bi bi-arrow-clockwise"></i>, title: "Refresh" },
                                ]
                            }
                            actions={[
                                { label: "Access Logs" },
                                { label: "Upload Photo" },
                                { label: "Print Card" },
                                { label: "Absence Reason" },
                                { label: "Report Sick" },
                            ]}
                            showBottomMenu={this.state.showBottomMenu}
                            showSearchBar={true}
                            searchBarOptions={fields}>
                        </DetailsTableHeader>}
                    <TableFooter settings={settings} toggle={this.drawerToggleClickHandler} showBottomMenu={this.state.showBottomMenu}></TableFooter>
                    <DynamicDetailsContainer fields={residentProfileFields} title={"Resident Profile"}>
                        <div className="detailsImage">
                            <img src={placeHolderUser}></img>
                        </div>
                    </DynamicDetailsContainer>
                    <DynamicDetailsContainer fields={enrollmentDetailsFields} title={"Enrollment Details"}>
                    </DynamicDetailsContainer>
                    <DynamicDetailsContainer fields={enrollmentDetailsFields} title={"Enrollment Details"}>
                    </DynamicDetailsContainer>
                    <DynamicDetailsContainer fields={enrollmentDetailsFields} title={"Enrollment Details"}>
                    </DynamicDetailsContainer>
                    <DynamicDetailsContainer fields={enrollmentDetailsFields} title={"Enrollment Details"}>
                    </DynamicDetailsContainer>
                    <DynamicDetailsContainer fields={enrollmentDetailsFields} title={"Enrollment Details"}>
                    </DynamicDetailsContainer>
                </div>

                <BottomMenu actions={
                    [
                        { label: "Access Logs" },
                        { label: "Upload Photo" },
                        { label: "Print Card" },
                        { label: "Absence Reason" },
                        { label: "Report Sick" },
                    ]
                } settings={this.settings} show={this.state.drawerOpen} showBottomMenu={this.state.showBottomMenu} handles={this.setExpansionContent}></BottomMenu>

            </div>
        )
    }

}

export class DetailsTableHeader extends React.Component {

    constructor(props) {
        super(props);
        this.toggleSearchBar = this.toggleSearchBar.bind(this);
        this.clickCallBack = this.clickCallBack.bind(this);
        this.searchChangeCallBack = this.searchChangeCallBack.bind(this);
        this.state = {
            classList: "tableRow",
            searchBarExtended: false,
            searchQuery: "",
        }
    }

    toggleSearchBar() {
        this.setState({
            searchBarExtended: !this.state.searchBarExtended,
        })
    }

    searchChangeCallBack(query) {
        this.setState({
            searchQuery: query,
        })
    }

    clickCallBack(id) {
        var element = document.getElementById(id);
        var headerOffset = window.innerHeight / 2;
        var elementPosition = element.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({

            top: offsetPosition,
            behavior: "instant"
        })
        element.classList.add("inputFlash")
    }


    render() {
        return (
            <div className="tableHeader">
                <div className="tableHeaderActions" style={{borderRadius: (this.props.component ? "8px 8px 0px 0px" : "8px")}}>
                    <div className="d-flex justify-content-between align-items-center">
                        {this.props.showBottomMenu ?
                            <div className="tableTitleContainer">
                                <span className="tableTitle">Resident</span>
                            </div> :
                            <div className="tableTitleContainer">
                                <div className="tableTitlePulseAnimation-1" style={{ "--ScaleMultiplier": (window.innerWidth >= 768 ? 2 : 1) }}>
                                </div>
                                <div className="tableTitlePulseAnimation-2" style={{ "--ScaleMultiplier": (window.innerWidth >= 768 ? 2 : 1) }}>
                                </div>
                                <div className="tableTitlePulseAnimation-3" style={{ "--ScaleMultiplier": (window.innerWidth >= 768 ? 2 : 1) }}>
                                </div>
                                <span className="tableTitle">Resident</span>
                            </div>}
                        {this.props.showSearchBar &&
                            <StdSearchBar className={"searchHotBar"} onClick={this.toggleSearchBar} searchChangeCallBack={this.searchChangeCallBack} persist={this.props.showBottomMenu} >
                                <div className="dropdown" style={{ "--maxItems": 5, gridTemplateColumns: "1fr" }}>
                                    {this.props.searchBarOptions.map((group, index) => {
                                        return (
                                            <div className="dropdown-group" key={index}>
                                                <div className="groupHeader">{group.groupName}</div>
                                                <div className="groupOptions">{group.fields.map((field, index) => {
                                                    if (this.state.searchQuery === "" || field.label.toLowerCase().includes(this.state.searchQuery.toLowerCase())) {
                                                        return <StdInputDropDownOption key={index} value={field.label} onClick={() => { this.clickCallBack(group.groupName + "-" + field.label) }}>{field.label}</StdInputDropDownOption>

                                                    }
                                                }
                                                )}</div>
                                            </div>
                                        )
                                    })}

                                </div>

                            </StdSearchBar>}
                        <div className="d-flex align-items-center">
                            {this.props.headerQuickActions.map((actions, index) => {
                                return (
                                    <IconButton onClick={actions.onClick} key={index} title={actions.title} icon={actions.icon} size={"48px"}>{actions}</IconButton>
                                )
                            })
                            }
                            {this.props.showBottomMenu ? "" :
                                <div>
                                    <TableQuickAction handles={this.props.handles} actions={this.props.actions}>
                                    </TableQuickAction>
                                </div>
                            }
                        </div>
                    </div>
                </div>


                <HeaderExpansion expanded={this.props.expanded} component={this.props.component} handleClose={this.props.handleClose}>
                </HeaderExpansion>
            </div>
        )
    }
}

export class DynamicDetailsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            callBackColor: "",
        }
        this.dividerColorCallback = this.dividerColorCallback.bind(this);
    }

    dividerColorCallback(color) {
        this.setState({
            callBackColor: color,
        })
    }

    render() {
        return (
            <div className="detailsWrapper" style={{ "--CallBackColor": this.state.callBackColor }}>
                <div className="detailsContainer">
                    {/* <div className="title">
                    <span>
                        {this.props.title}
                    </span>
                </div> */}
                    {/* {window.innerWidth >= 768 &&

                        <div className="rotatingBorders-psuedoContainer">
                            <div className="rotatingBorders"></div>
                        </div>
                    } */}
                    <div className="fieldContainer">
                        <div className="title">
                            <span>
                                {this.props.title}
                            </span>
                        </div>
                        {this.props.children}

                        <div className="dataFieldContainer row">{
                            this.props.fields.map((field, index) => {
                                return (
                                    <StdInput editProtection={true} autoComplete={"off"} id={this.props.title + "-" + field.label} key={index} type={field.type} label={field.label} options={field.options}></StdInput>
                                )
                            })
                        }
                        </div>
                    </div>
                </div>
                <DetailsContainerDivider callback={this.dividerColorCallback}></DetailsContainerDivider>
            </div>
        )
    }
}

const colors = [
    "#48a1da", "#4858da", "#8fc140", "#8D9AE9", "#3fa0eb", "#7ac5a9"
]

export class DetailsContainerDivider extends React.Component {

    constructor(props) {
        super(props);
        const startingColor = colors[Math.floor(Math.random() * colors.length)];
        this.state = {
            originColor: startingColor,
            pathColor: startingColor,
        }
        this.reset = this.reset.bind(this);
        this.pump = this.pump.bind(this);
    }

    reset() {
        this.setState({
            originColor: colors[Math.floor(Math.random() * colors.length)],
        });
        this.props.callback(this.state.originColor);
    }

    pump = (event) => {
        event.stopPropagation();
        this.setState({
            pathColor: this.state.originColor
        })
    }

    render() {
        return (
            <div className="detailsContainerDivider" onAnimationIteration={this.reset} style={{ "--PathColor": this.state.pathColor }}>


                <svg viewBox="0 0 300 50" preserveAspectRatio={"none"}>

                    <path className="pathOrigin" style={{ "--fillColor": this.state.originColor }} d={"m 30 5 H 70 Q 75 5 75 0 H 25 M 25 0 V 0 Q 25 5 30 5"} onTransitionEnd={(e) => this.pump(e)}></path>

                    <path className="path-left" fill={"none"} d={"M 40 5 V 25 L 55 40 H 105 A 1 1 0 0 0 110 40 A 1 1 0 0 0 105 40"}></path>
                    <path className="path-middle" fill={"none"} d={"M 50 5 V 20 L 60 30 H 140 L 145 35 V 45"}></path>
                    <path className="path-right" fill={"none"} d={"M 60 5 V 15 L 65 20 H 155 L 160 25 V 30 H 160 A 1 1 0 0 0 160 35 A 1 1 0 0 0 160 30"}></path>

                    <path className="movingDots-left" d={"M 40 5 V 25 L 55 40 H 105 A 1 1 0 0 0 110 40 A 1 1 0 0 0 105 40"} stroke={this.state.originColor}> </path>
                    <path className="movingDots-middle" d={"M 50 5 V 20 L 60 30 H 140 L 145 35 V 45"} stroke={this.state.originColor}> </path>
                    <path className="movingDots-right" d={"M 60 5 V 15 L 65 20 H 155 L 160 25 V 30 H 160 A 1 1 0 0 0 160 35 A 1 1 0 0 0 160 30"} stroke={this.state.originColor}> </path>
                    <path className="pathDestination" style={{ "--fillColor": this.state.originColor }} d={"M 145 45 L 165 45 C 168 45 170 47 170 50 H 120 C 120 47 122 45 125 45 H 145"}></path>
                </svg>
            </div>
        )
    }
}