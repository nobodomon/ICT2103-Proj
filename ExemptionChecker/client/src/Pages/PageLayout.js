import e from "cors";
import React from "react";
import { ActionsButton, DivSpacing, Hamburger, IconButton, IconButtonWithText, SearchBar, SearchTags, SizedBox, StdButton, TagsBox } from "../Components/common";
import { StdInput } from "../Components/input";
import SlideDrawer, { BlankDrawerItem, DrawerItemNonLink } from "../Components/sideNav";
import { Cell, ListTable, HeaderRow, ExpandableRow } from "../Components/tableComponents";
import { DetailsTableHeader } from "./Details";

export const searchSuggestions = [
]

const CurrentTags = [
]

const settings = {
}

export default class DatapageLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            drawerOpen: false,
            expanded: false,
            showBottomMenu: false,
            expansionContent: "",
            expansionComponent: "",
            popUpContent: "",
        }

        this.drawerToggleClickHandler = this.drawerToggleClickHandler.bind(this);
        this.setExpansionContent = this.setExpansionContent.bind(this);
        this.handleSeeMore = this.handleSeeMore.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.expand = this.expand.bind(this);
    }
    componentDidMount() {
        document.title = this.props.settings.title;
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    expand() {
        if(this.state.expanded){
            this.setState({
                expanded: !this.state.expanded,
                expansionContent:"",
            })
        }else{
            this.setState({
                expanded: !this.state.expanded,
            })

        }
    }

    setExpansionContent = content => {
        if (this.state.expanded && this.state.expansionContent === content) {
            this.setState({
                expanded: false,
            })
        } else {

            this.setState({
                expansionContent: content,
                expanded: true,
            })
        }
    }
    drawerToggleClickHandler() {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        })
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

    handleSeeMore(content) {
        this.setState({
            popUpContent: content
        })
    }

    handleClose() {
        this.setState({
            popUpContent: ""
        })
    }

    render() {
        if(this.state.content == ""){
            return <div></div>
        }
        return (
            <div className="justify-content-center d-flex container-fluid listPageContainer">
                <div className="col-12">
                    <TableHeader actions={
                        [
                            { label: "Add " + this.props.settings.title, onClick: () => { this.setExpansionContent("add") } },
                            { label: "Delete " + this.props.settings.title, onClick: () => { this.setExpansionContent("del") } },
                            { label: "Generate Spreadsheet", onClick: () => { this.setExpansionContent("cs") } },
                        ]
                    } requestRefresh={this.props.requestRefresh} fieldSettings={this.props.fieldSettings} settings={this.props.settings} showBottomMenu={this.state.showBottomMenu} handles={this.setExpansionContent} persist={this.state.showBottomMenu} expanded={this.state.expanded} component={this.state.expansionContent} handleClose={this.expand}></TableHeader>
                    <TableFooter settings={this.props.settings} toggle={this.drawerToggleClickHandler} showBottomMenu={this.state.showBottomMenu}></TableFooter>
                    <DivSpacing spacing={1}></DivSpacing>
                    <div className="d-flex justify-content-center align-items-center">
                        <ListTable settings={this.settings}>
                            <HeaderRow>
                                {this.props.headers.map((key, index) => {
                                    return <Cell width={"100%"} key={index}>{key}</Cell>
                                })}
                            </HeaderRow>
                            {this.props.data && 
                            
                            this.props.data.map((row, index) => {      
                                return <ExpandableRow updateHandle={this.props.updateHandle} values={row} fieldSettings={this.props.fieldSettings} key={index} settings={settings} headers={this.props.headers} setExpansionContent={this.setExpansionContent} handleSeeMore={this.handleSeeMore} handleClose={this.handleClose} popUpContent={this.state.popUpContent}>
                                    {this.props.headers.map((cell, secIndex) => {
                                        
                                        return <Cell width={"100%"} key={secIndex}>{row[cell]}</Cell>
                                    })}
                                </ExpandableRow>
                            })}
                        </ListTable>
                    </div>
                    <SizedBox height={"56px"}></SizedBox>
                </div>
                <BottomMenu actions={
                    [
                        { label: "Add " + this.props.settings.title, onClick: () => { this.setExpansionContent("add") } },
                        { label: "Delete " + this.props.settings.title, onClick: () => { this.setExpansionContent("cs") } },
                        { label: "Generate Spreadsheet", onClick: () => { this.setExpansionContent("cs") } },
                    ]
                } settings={this.settings} show={this.state.drawerOpen} showBottomMenu={this.state.showBottomMenu} handles={this.setExpansionContent}></BottomMenu>
            </div>
        )
    }
}

export class TableHeader extends React.Component {
    constructor(props) {
        super(props);
        this.toggleSearchBar = this.toggleSearchBar.bind(this);
        this.searchCallBack = this.searchCallBack.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.deleteAllTags = this.deleteAllTags.bind(this);
        this.state = {
            classList: "tableRow",
            searchBarExtended: false,
            currentTags: CurrentTags

        }
    }


    onCancelClick(tagToRemove) {
        this.setState({
            currentTags: this.state.currentTags.filter((tag) => tag !== tagToRemove),
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.persist !== prevProps.persist) {
            this.setState({
                searchBarExtended: true,
            })
        }
    }

    deleteAllTags = () => {
        this.setState({
            currentTags: [],
        })
        console.log(this.state.currentTags)
    }

    toggleSearchBar() {
        this.setState({
            searchBarExtended: !this.state.searchBarExtended,
        })
    }

    searchCallBack(tag) {
        console.log(tag);
        this.setState({
            currentTags: [...this.state.currentTags, tag],
        })
    }

    render() {


        return (
            <div className="tableHeader">
                <div className={"tableHeaderActions" + " " + (this.props.component === "" ? "borderRadius" : "topBorderRadius")}>
                    <div className="d-flex justify-content-end align-items-center">
                        {this.props.showBottomMenu ? <div /> :
                            <div className="tableTitleContainer">
                                <div className="tableTitlePulseAnimation-1" style={this.state.searchBarExtended ? { "--ScaleMultiplier": .75 } : { "--ScaleMultiplier": 2 }}>
                                </div>
                                <div className="tableTitlePulseAnimation-2" style={this.state.searchBarExtended ? { "--ScaleMultiplier": .75 } : { "--ScaleMultiplier": 2 }}>
                                </div>
                                <div className="tableTitlePulseAnimation-3" style={this.state.searchBarExtended ? { "--ScaleMultiplier": .75 } : { "--ScaleMultiplier": 2 }}>
                                </div>
                                <span className="tableTitle">{this.props.settings.title}</span>
                            </div>}
                        <SearchBar className={"searchHotBar"} onClick={this.toggleSearchBar} toggleTagMacros={this.props.handles} searchCallBack={this.searchCallBack} persist={this.props.showBottomMenu} toolTip={<div>


                            <h6>(!interest)</h6>
                            <p>
                                ! is short for NOT, entires with column value equals to interest will be removed from the list
                            </p>
                        </div>}></SearchBar>
                        <IconButton title={"Refresh"} size={"48px"} icon={
                            <i className="bi bi-arrow-clockwise" onClick={this.props.requestRefresh}></i>
                        }>
                        </IconButton>
                        {this.props.showBottomMenu ? "" :
                            <div>
                                <TableQuickAction handles={this.props.handles}
                                    actions={this.props.actions}></TableQuickAction></div>}
                    </div>
                </div>
                <HeaderExpansion settings={this.props.settings} requestRefresh={this.props.requestRefresh} fieldSettings={this.props.fieldSettings} expanded={this.props.expanded} component={this.props.component} handleClose={this.props.handleClose}>
                </HeaderExpansion>
                <DivSpacing spacing={1}></DivSpacing>
                <TagsBox showlabel={true} enableDeleteAll={true} className=" p-2" deleteAllTags={this.deleteAllTags}>
                    {this.state.currentTags.map((tag, index) => {
                        return <SearchTags onCancelClick={() => this.onCancelClick(tag)} type={tag.type} key={index}>{tag.value}</SearchTags>
                    })}
                </TagsBox>
                <DivSpacing spacing={1}></DivSpacing>
            </div>
        )
    }
}
TableHeader.defaultProps = {
    component: "",
}

export class HeaderExpansion extends React.Component {
    render() {
        if (this.props.expanded) {
            if (this.props.component === "add") {
                return(

                    <HeaderExpansionPane handleClose={this.props.handleClose} title={"Add Entry"}>
                        <AddEntry settings={this.props.settings} requestRefresh={this.props.requestRefresh} fieldSettings = {this.props.fieldSettings}></AddEntry>
                    </HeaderExpansionPane>
                )
            }
            if (this.props.component === "del"){
                return(
                    <HeaderExpansionPane handleClose={this.props.handleClose} title={"Delete Entry"}>
                        <DeleteEntry settings={this.props.settings} requestRefresh={this.props.requestRefresh} fieldSettings = {this.props.fieldSettings}></DeleteEntry>
                    </HeaderExpansionPane>
                )
            }

            if (this.props.component === "cs") {
                return (
                    <HeaderExpansionPane handleClose={this.props.handleClose} title={"Column Settings"}>
                        <ColumnSettings settings={this.props.settings} requestRefresh={this.props.requestRefresh}></ColumnSettings>
                    </HeaderExpansionPane>
                )
            }

            if (this.props.component === "tm") {
                return (
                    <HeaderExpansionPane handleClose={this.props.handleClose} title={"Tag Macros"}>
                        <TagMacros settings={this.props.settings} requestRefresh={this.props.requestRefresh}>
                        </TagMacros>
                    </HeaderExpansionPane>
                )
            }

            return (
                <div>
                </div>
            )
        } else {
            return (
                <div>

                </div>
            )
        }

    }
}
class HeaderExpansionPane extends React.Component {
    render() {
        return (
            <div className="p-4 headerExpansionPane">
                <div className={"panelCloseBtn d-flex justify-content-between align-items-center"}>
                    <h1>{this.props.title}</h1>
                    <IconButtonWithText className={"invert"} icon={<i class="bi bi-x"></i>} onClick={this.props.handleClose} label={"Close"}></IconButtonWithText>
                </div>
                {this.props.children}
            </div>
        )
    }


}

class AddEntry extends React.Component{
    state = {
        courseToAdd: {},
    }

    onChange = (field, value) => {
        var tempCourse = this.state.courseToAdd;
        tempCourse[field] = value;
        this.setState({
            courseToAdd: tempCourse
        })
    }

    createCourse = async (courseToAdd) => {
        console.log(courseToAdd);
        return fetch(this.props.settings.api + "create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(courseToAdd),
        }).then((res => {
            return res.json();
        }));
    }

    handleCourseCreation = async () => {
        await this.createCourse(this.state.courseToAdd).then((content) => {
            this.props.requestRefresh();
        })
    }

    render(){
        return (
            <div className="container-fluid addEntry">
                <form className={"addEntry-inputFields"} onSubmit={this.handleCourseCreation}>
                {Object.keys(this.props.fieldSettings).map(
                    (key, index) => {
                        return (this.props.fieldSettings[key].primaryKey? "" : 
                            <StdInput 
                            label = {key}
                            type={this.props.fieldSettings[key].type}
                            enabled = {true}
                            fieldLabel={key}
                            onChange = {this.onChange}
                            options={this.props.fieldSettings[key].options}
                            >
                            </StdInput>)
                    }
                )}
                <StdButton type={"submit"}>Submit</StdButton>
            
                </form>
                </div>
        )
    }
}

class DeleteEntry extends React.Component{
    state = {
        courseToDelete: {},
    }

    onChange = (field, value) => {
        var tempCourse = this.state.courseToDelete;
        tempCourse[field] = value;
        this.setState({
            courseToDelete: tempCourse
        })
    }

    deleteCourse = async (courseToDelete) => {
        console.log(courseToDelete);
        return fetch(this.props.settings.api + "delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(courseToDelete),
        }).then((res => {
            return res.json();
        }));
    }

    handleCourseDeletion = async () => {
        await this.deleteCourse(this.state.courseToDelete).then((content) => {
            this.props.requestRefresh();
        })
    }

    render(){
        return (
            <div className="container-fluid deleteEntry">
                <form className={"deleteEntry-inputFields"} onSubmit={this.handleCourseDeletion}>
                {Object.keys(this.props.fieldSettings).map(
                    (key, index) => {
                        return (this.props.fieldSettings[key].primaryKey? 
                            <StdInput 
                            label = {key}
                            type={this.props.fieldSettings[key].type}
                            enabled = {true}
                            fieldLabel={key}
                            onChange = {this.onChange}
                            options={this.props.fieldSettings[key].options}
                            >
                            </StdInput> : "")
                    }
                )}
                <StdButton type={"submit"}>Submit</StdButton>
            
                </form>
                </div>
        )
    }
}

class ColumnSettings extends React.Component {
    render() {
        return (
            <div className="col-12">

            </div>
        )
    }
}

class TagMacros extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMode: "default",
            editable: true
        }
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.toggleAddMode = this.toggleAddMode.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    toggleEditMode() {
        console.log(this.state)
        if (this.state.currentMode === "default") {
            this.setState({
                currentMode: "edit"
            })
        } else {
            this.setState({
                currentMode: "default"
            })
        }
    }

    toggleAddMode() {

        if (this.state.currentMode === "default") {
            this.setState({
                currentMode: "add"
            })
        } else {
            this.setState({
                currentMode: "default"
            })
        }
    }

    resize() {
        const md = 768;
        if (window.innerWidth >= md) {
            this.setState({
                editable: true
            })
        } else {
            this.setState({
                editable: false
            })
        }
    }
    render() {
        if (this.state.currentMode === "edit") {
            return (
                <TagMacrosEditMode toggleEditMode={this.toggleEditMode} currentTags={[
                    { type: "base", value: ":fast" },
                    { type: "specific", value: "@agreement(abc)" },
                    { type: "specific", value: "@birthdayAfter(09-10)" },
                    { type: "specific", value: "@dorm(abc)" },
                    { type: "multiple", value: "+level(3)" }]}></TagMacrosEditMode>
            )
        }

        if (this.state.currentMode === "add") {
            return (
                <TagMacrosAddMode toggleEditMode={this.toggleAddMode}></TagMacrosAddMode>
            )
        }
        return (
            <div className="container-fluid tagMacros">
                <div className="d-flex flex-nowrap justify-content-between">
                    <div className="col-3">
                        Name
                    </div>
                    <div className="tagMacrosTagsBox">
                        Tags
                    </div>
                    <div className="ms-auto col-auto">
                        <IconButtonWithText className={"invert"} icon={<i class="bi bi-plus-circle-fill"></i>} label={"Add Macro"} onClick={this.toggleAddMode}></IconButtonWithText>
                    </div>
                </div>
                <div className="d-flex flex-nowrap justify-content-between">
                    <div className="col-3">
                        <StdInput prefix={"# "} value={"default"} editable={false} showIndicator={false}></StdInput>
                    </div>
                    <div className="tagMacrosTagsBox">
                        <TagsBox>
                            <SearchTags type={"base"} showRemove={false}>:active</SearchTags>
                        </TagsBox>
                    </div>
                    <div className="ms-auto  col-auto">
                    </div>
                </div>
                <div className="d-flex flex-nowrap justify-content-between">
                    <div className="col-3">
                        <StdInput prefix={"# "} value={"test"} editable={this.state.editable} showIndicator={false}></StdInput>
                    </div>
                    <div className="tagMacrosTagsBox">
                        <TagsBox truncate={true}>
                            <SearchTags type={"specific"} showRemove={true}>@lastActivityBefore(10-10-1990)</SearchTags>
                            <SearchTags type={"multiple"} showRemove={true}>+level(3)</SearchTags>
                            <SearchTags type={"multiple"} showRemove={true}>+lastActivityBefore(10-10-1990)</SearchTags>
                            <SearchTags type={"exclude"} showRemove={true}>(!abc)</SearchTags>
                            <SearchTags type={"specific"} showRemove={true}>@lastActivityBefore(10-10-1990)</SearchTags>
                            <SearchTags type={"multiple"} showRemove={true}>+level(3)</SearchTags>
                            <SearchTags type={"multiple"} showRemove={true}>+lastActivityBefore(10-10-1990)</SearchTags>
                            <SearchTags type={"exclude"} showRemove={true}>(!abc)</SearchTags>
                        </TagsBox>
                    </div>
                    <div className="align-items-start">
                        <IconButton icon={<i class="bi bi-pencil"></i>} className={"invert"} onClick={this.toggleEditMode}></IconButton>
                    </div>
                </div>
            </div>
        )
    }
}

export class TagMacrosEditMode extends React.Component {

    constructor(props) {
        super(props);
        this.isTextEmpty = this.isTextEmpty.bind(this);
        this.setStep = this.setStep.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTagSelect = this.onTagSelect.bind(this);
        this.state = {
            textEmpty: true,
            step: 1,
            macroName: "",
            currentTags: this.props.currentTags,
            tagType: "",
            selectedTag: "",
            suggestions: searchSuggestions,
            placeholder: "",
            tagInteralValue: ""
        }
    }

    onCancelClick(tagToRemove) {
        this.setState({
            currentTags: this.state.currentTags.filter((tag) => tag !== tagToRemove),
        })
    }

    onTagSelect = (tag) => {
        console.log("value: " + tag.value, "type: " + tag.type);
        this.setState({
            tagType: tag.type,
            selectedTag: tag.value
        })

        if (tag.value.slice(1) === "gender") {
            this.setState({
                suggestions: [{ value: "Male", label: "Male", type: "" }, { value: "Female", label: "Female", type: "" }],
                placeholder: "Enter a gender",
            })
        }
    }

    tagSelectCallBack = (tag) => {
        this.setState({
            currentTags: [...this.state.currentTags, tag],
            suggestions: searchSuggestions,
            placeholder: "",
        })
    }

    onSubmit(tagToAdd) {
        console.log("value" + tagToAdd.value, tagToAdd.type);
        this.setState({
            currentTags: [...this.state.currentTags, tagToAdd],
            selectedTag: "",
            tagType: "",
        })
    }

    setStep(step) {
        this.setState({
            step: step,
            textEmpty: true
        })
    }

    isTextEmpty(e) {
        console.log(e.target.value)
        if (e.target.value === undefined || e.target.value === "") {
            this.setState({
                textEmpty: true,
                tagInteralValue: ""
            })
        } else {
            this.setState({
                textEmpty: false,
                tagInteralValue: e.target.value
            })

        }
    }

    render() {
        return (
            <div className="container-fluid tagMacros d-flex flex-column align-items-center">
                <div className="col-12 d-flex justify-content-between align-items-center">
                    Editing Macro: {"Test"}
                </div>

                {this.state.step === 1 ?
                    // Step 1
                    <div className="tagMacros col-xl-6 col-lg-8 col-12 row-cols-1 justify-content-stretch align-items-stretch">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h6 className="text-center">
                                Current Tags
                            </h6>
                            <DivSpacing spacing={1}></DivSpacing>
                            <TagsBox className={"tagCloud"}>
                                {this.state.currentTags.map((tag, index) => {
                                    return <SearchTags type={tag.type} key={index} onCancelClick={() => this.onCancelClick(tag)}>{tag.value}</SearchTags>
                                })}
                            </TagsBox>
                        </div>
                        <div className={"col-12"}>
                            <StdInput tagSelectCallBack={this.tagSelectCallBack} label={"Add Tags"} placeholder={this.state.placeholder} type={"dropdown-tags"} onTagSelect={this.onTagSelect} options={this.state.suggestions} editable={true} showIndicator={false} showSaveBtn={false} isTextEmpty={this.isTextEmpty}></StdInput>
                        </div>
                        <div className="d-flex col-12 justify-content-center">
                            <div className={"col-md-4 col-12 align-self-center"}>
                                <div className={"row"}>
                                    <div className={"col-6"}>
                                        <StdButton className="borderless w-100" onClick={this.props.toggleEditMode}>Cancel</StdButton>
                                    </div>
                                    <div className={"col-6"}>
                                        {this.state.textEmpty ?
                                            <StdButton className=" primary w-100" onClick={() => { this.setStep(2) }}>Submit</StdButton> : <StdButton className=" secondary w-100" disabled={this.state.selectedTag === ""} onClick={() => this.onSubmit({ value: this.state.selectedTag + "(" + this.state.tagInteralValue + ")", type: this.state.tagType })}>Add Tag</StdButton>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    // Step 2
                    <div className="tagMacros col-xl-6 col-lg-8 col-12 justify-content-stretch align-items-center">
                        <div className={"col-12"}>
                            <StdInput label={"Macro Name"} editable={true} showIndicator={false} showSaveBtn={false} value={this.state.macroName} isTextEmpty={this.isTextEmpty}></StdInput>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h6 className="text-center">
                                Current Tags
                            </h6>
                            <DivSpacing spacing={1}></DivSpacing>
                            <TagsBox className={"tagCloud"} onClick={() => { this.setStep(1) }}>
                                <SearchTags type={"specific"} showRemove={false}>@lastActivityBefore(10-10-1990)</SearchTags>
                                <SearchTags type={"multiple"} showRemove={false}>+level(3)</SearchTags>
                                <SearchTags type={"multiple"} showRemove={false}>+lastActivityBefore(10-10-1990)</SearchTags>
                                <SearchTags type={"exclude"} showRemove={false}>(!abc)</SearchTags>
                                <SearchTags type={"specific"} showRemove={false}>@lastActivityBefore(10-10-1990)</SearchTags>
                                <SearchTags type={"multiple"} showRemove={false}>+level(3)</SearchTags>
                                <SearchTags type={"multiple"} showRemove={false}>+lastActivityBefore(10-10-1990)</SearchTags>
                                <SearchTags type={"exclude"} showRemove={false}>(!abc)</SearchTags>
                            </TagsBox>
                        </div>
                        <div className="d-flex col-12 justify-content-center">
                            <div className={"col-md-4 col-12 align-self-center"}>
                                <div className={"row"}>
                                    <div className={"col-6"}>
                                        <StdButton className="borderless w-100" onClick={() => { this.setStep(1) }}>Back</StdButton>
                                    </div>
                                    <div className={"col-6"}>
                                        <StdButton className=" primary w-100" onClick={() => { this.onSubmit({ type: this }) }} disabled={this.state.textEmpty ? true : false}>Submit</StdButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
TagMacrosEditMode.defaultProps = {
    currentTags: [],
    suggestions: [],
}

export class TagMacrosAddMode extends React.Component {

    constructor(props) {
        super(props);
        this.isTextEmpty = this.isTextEmpty.bind(this);
        this.setStep = this.setStep.bind(this);
        this.state = {
            textEmpty: true,
            step: 1,
            macroName: "",
        }
    }

    setStep(step) {
        this.setState({
            step: step,
            textEmpty: true
        })
    }

    isTextEmpty(e) {
        console.log(e.target.value)
        if (e.target.value === undefined || e.target.value === "") {
            this.setState({
                textEmpty: true
            })
        } else {
            this.setState({
                textEmpty: false
            })
        }
    }

    render() {
        return (
            <div className="container-fluid tagMacros d-flex flex-column align-items-center">
                <div className="col-12 d-flex justify-content-between align-items-center">
                    Creating New Macro
                </div>
                {this.state.step === 1 ?
                    // Step 1
                    <div className="tagMacros col-md-4 col-12 justify-content-stretch align-items-center">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h6 className="text-center">
                                Current Tags
                            </h6>
                            <DivSpacing spacing={1}></DivSpacing>
                            <TagsBox className={"tagCloud"}>
                            </TagsBox>
                        </div>
                        <div className={"col-12"}>
                            <StdInput label={"Add Tags"} type={"dropdown-tags"} options={searchSuggestions} editable={true} showIndicator={false} showSaveBtn={false} isTextEmpty={this.isTextEmpty}></StdInput>
                        </div>
                        <div className="d-flex col-12 justify-content-center">
                            <div className={"col-md-4 col-12 align-self-center"}>
                                <div className={"row"}>
                                    <div className={"col-6"}>
                                        <StdButton className=" borderless w-100" onClick={this.props.toggleEditMode}>Cancel</StdButton>
                                    </div>
                                    <div className={"col-6"}>
                                        {this.state.textEmpty ?
                                            <StdButton className=" primary w-100" onClick={() => { this.setStep(2) }}>Submit</StdButton> : <StdButton className=" secondary w-100">Add Tag</StdButton>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    // Step 2
                    <div className="tagMacros col-md-4 col-12 justify-content-stretch align-items-center">
                        <div className={"col-12"}>
                            <StdInput label={"Macro Name"} editable={true} showIndicator={false} showSaveBtn={false} value={this.state.macroName} isTextEmpty={this.isTextEmpty}></StdInput>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h6 className="text-center">
                                Current Tags
                            </h6>
                            <DivSpacing spacing={1}></DivSpacing>
                            <TagsBox className={"tagCloud"}>
                            </TagsBox>
                        </div>
                        <div className="d-flex col-12 justify-content-center">
                            <div className={"col-md-4 col-12 align-self-center"}>
                                <div className={"row"}>
                                    <div className={"col-6"}>
                                        <StdButton className="borderless w-100" onClick={() => { this.setStep(1) }}>Back</StdButton>
                                    </div>
                                    <div className={"col-6"}>
                                        <StdButton className=" primary w-100" disabled={this.state.textEmpty ? true : false}>Submit</StdButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>
        )
    }
}

export class TableFooter extends React.Component {
    render() {
        return (
            this.props.showBottomMenu ?
                <ActionsButton className={"fixed-bottom footer-Btn"} onClick={this.props.toggle} style={{ "backgroundColor": this.props.settings.primaryColor, "color": this.props.settings.textColor }}></ActionsButton> : ""
        )
    }
}

export class TableQuickAction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showActionsMenu: false,
            actionsMenuClasses: "actionsMenu",
            actionsButtonClasses: "actionsMenuToggle"
        }
    }
    render() {

        return (
            <div className="d-flex quickActionsPanel align-items-center">
                <ActionsButton onClick={() => {
                    if (this.state.showActionsMenu) {
                        this.setState({
                            showActionsMenu: !this.state.showActionsMenu,
                            actionsMenuClasses: "actionsMenu cardBg",
                            actionsButtonClasses: "actionsMenuToggle"
                        })
                    } else {

                        this.setState({
                            showActionsMenu: !this.state.showActionsMenu,
                            actionsMenuClasses: "actionsMenu cardBg showActions",
                            actionsButtonClasses: "actionsMenuToggle active"
                        })
                    }
                }}>
                    {this.props.actions.map((action, index) => {
                        return (
                            <DrawerItemNonLink key={index} label={action.label} onClick={action.onClick}></DrawerItemNonLink>
                        )

                    })}
                </ActionsButton>
            </div>
        )
    }
}

export class BottomMenu extends React.Component {
    render() {
        return (
            this.props.showBottomMenu ?
                <SlideDrawer show={this.props.show} direction={"bot"} columns={1} settings={settings}>
                    {this.props.actions.map((action, index) => {
                        return (
                            <DrawerItemNonLink key={index} label={action.label} width={"25"} onClick={action.onClick}></DrawerItemNonLink>
                        )

                    })}</SlideDrawer> : <div></div>
        )
    }
}
