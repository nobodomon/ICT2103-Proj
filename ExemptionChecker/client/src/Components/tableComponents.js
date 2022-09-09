import React from "react";
import { StdButton, StdInput, StdInputDropDownOption } from "./common";


import placeHolderUser from "../Assets/placeholderUser.png";

export class ExpandableRow extends React.Component {

    constructor(props){
        super(props);
        this.state={
            expanded:false,
            rowClasses: "tableRow ",
            expandedClass: "expandedRowPane",
            editMode: true
        }
        this.expand = this.expand.bind(this);
    }


    expand(){
        if(this.state.expanded){
            this.setState({
                expanded: !this.state.expanded,
                rowClasses: "tableRow ",
            })
        }else{
            
            this.setState({
                expanded: !this.state.expanded,
                rowClasses: "tableRow expanded",
            })
        }
    }
    render() {
        return (
            <div 
            onTouchStart={this.handleButtonPress} 
            onTouchEnd={this.handleButtonRelease} 
            onMouseDown={this.handleButtonPress} 
            onMouseUp={this.handleButtonRelease} 
            onMouseLeave={this.handleButtonRelease}>
                <div className={this.state.rowClasses} onClick={this.expand}>
                    {this.props.children}
                </div>
                {this.state.expanded? 
                <div className={this.state.expandedClass}>
                    <div className="row justify-content-center align-items-start expandedRow">
                        <div className="col-12 col-lg-3 expansionColumn justify-content-center align-items-center">
                            <img src={placeHolderUser} width="128px"></img>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4 expansionColumn">
                            <StdInput label={"Name"} editable={this.state.editMode} showSaveBtn={this.state.editMode} showIndicator={this.state.editMode} onClick={this.handleClick}></StdInput>
                            <StdInput label={"NRIC/FIN"} editable={this.state.editMode} showSaveBtn={this.state.editMode} showIndicator={this.state.editMode} onClick={this.handleClick}></StdInput>
                            <StdInput label={"Work Permit"} editable={this.state.editMode} showSaveBtn={this.state.editMode} showIndicator={this.state.editMode} onClick={this.handleClick}></StdInput>
                            <StdInput label={"Permit Expiry"} type={"date"} editable={this.state.editMode} showSaveBtn={this.state.editMode} showIndicator={this.state.editMode} onClick={this.handleClick}></StdInput>
                            <StdInput label={"Check-In Date"} type={"date"} editable={this.state.editMode} showSaveBtn={this.state.editMode} showIndicator={this.state.editMode} onClick={this.handleClick}></StdInput>
                            <StdInput label={"Phone Number"} width={"75px"} type={"tel"} value={"+65"} subValue={"12345678"} editable={this.state.editMode} showSaveBtn={this.state.editMode} showIndicator={this.state.editMode} onClick={this.handleClick}></StdInput>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4 expansionColumn">
                            <StdInput label={"Gender"} value={"Male"} type={"dropdown"} options={[{value:"Male", label:"Male"},{value:"Female",label:"Female"}]} editable={this.state.editMode} showSaveBtn={this.state.editMode} showIndicator={this.state.editMode} onClick={this.handleClick}>

                            </StdInput>
                            <StdInput label={"Nationality"} editable={this.state.editMode} showSaveBtn={this.state.editMode} showIndicator={this.state.editMode} onClick={this.handleClick}></StdInput>
                            <StdInput label={"Client"} editable={this.state.editMode} showSaveBtn={this.state.editMode} showIndicator={this.state.editMode} onClick={this.handleClick}></StdInput>
                            <StdInput label={"Room/Bed"} editable={this.state.editMode} showSaveBtn={this.state.editMode} showIndicator={this.state.editMode} onClick={this.handleClick}></StdInput>
                            <StdInput label={"Location (Time)"} type={"time"}  editable={this.state.editMode} showSaveBtn={this.state.editMode} showIndicator={this.state.editMode} onClick={this.handleClick}></StdInput>
                            <StdInput label={"Remarks"} type={"textarea"} editable={this.state.editMode} showSaveBtn={this.state.editMode} showIndicator={this.state.editMode} onClick={this.handleClick}></StdInput>
                        </div>
                        {this.state.editMode? 
                        <div className="expansionColumnActions">
                            <div className="row">
                                
                                <div className="col-md-6 col-12 d-flex justify-content-center">
                                    <StdButton className="" onClick={this.exitEditMode}>Exit Edit Mode</StdButton>
                                    
                                    <StdButton className="primary">Save all changes</StdButton>
                                </div>
                            </div>
                        </div>:<div/>}
                        <StdButton className={"primary"} onClick={()=>this.props.seeMoreHandle("abc")}>See More</StdButton>
                    </div>
                </div>:""}
            </div>
        )
    }
}

export class Row extends React.Component {

    constructor(props){
        super(props);
        this.state={
            rowClasses: "tableRow ",
        }
    }
    render() {
        return (
            <div>
                <div className={this.state.rowClasses}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export class HeaderRow extends React.Component {
    render() {
        return (
            <div className="tableRow headerRow">
                {this.props.children}
            </div>
        )
    }
}

export class Cell extends React.Component {
    render() {
        return (
            <div className="cell" style={{width:this.props.width}}>
                {this.props.children}
            </div>
        )
    }
}

export class ListTable extends React.Component {
    render() {
        return (
            <div className="tableContainer">
                {this.props.children}
            </div>
        )
    }
}