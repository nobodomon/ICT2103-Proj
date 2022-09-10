import React from "react";
import { StdButton, StdInputDropDownOption } from "./common";
import { StdInput } from "./input";


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

    updateHandle = (field, value) =>{
        let user = this.props.values;
        user[field] = value;

        this.props.updateHandle(user);
        
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
                        <div className="d-flex col-12 col-lg-3 justify-content-center align-items-center">
                            <img src={placeHolderUser} width="128px"></img>
                        </div>

                        <div className="col-12 col-lg-9 expansionColumn">
                            {Object.keys(this.props.fieldSettings).map((field, index) => {
                                return(
                                    <StdInput 
                                        key={index}
                                        label={field} 
                                        type={this.props.fieldSettings[field].type} 
                                        enabled={this.props.fieldSettings[field].editable}
                                        hasSaveBtn={true} 
                                        showIndicator={this.props.fieldSettings[field].editable} 
                                        value={this.props.values[field]}
                                        onChange={this.updateHandle}>
                                    </StdInput>
                                )
                            })}
                        </div>
                        {this.state.editMode? 
                        <div className="expansionColumnActions">
                            <div className="row">
                                
                                <div className="col-md-6 col-12 d-flex justify-content-center">
                                    
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