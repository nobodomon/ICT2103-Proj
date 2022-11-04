import React from "react";
import "../styles/Hamburger.scss";
import { Link } from "react-router-dom";
import { searchSuggestions } from "../Pages/PageLayout";
import moment from "moment";

import footer from "../Assets/footer.png";

export class DivSpacing extends React.Component {
    state = {
        spacing: 1
    }
    render() {
        return (
            <div className={"divSpacing-" + this.state.spacing}></div>
        )
    }
}

export class SizedBox extends React.Component {
    render() {
        const width = this.props.width;
        const height = this.props.height;
        return (
            <div style={{ width: width, height: height }} className={this.props.className} onClick={this.props.onClick}>
                {this.props.children}
            </div>
        )
    }
}
SizedBox.defaultProps = {
    width: "0px",
    height: "0px"
}

export class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCopyright: true
        }
    }
    componentDidMount() {
        window.addEventListener('resize', this.resize.bind(this));
        this.resize();
    }
    resize() {
        if (window.innerWidth <= 576) {
            this.setState({
                showCopyright: false
            }
            )
        } else {
            this.setState({
                showCopyright: true
            }
            )
        }
    }
    render() {
        return (
            <div className="footer">
                <div className="footer-content">
                    {this.state.showCopyright &&
                        <div className="footer-text no-print">Copyright &copy; 2022 Chimeric Technologies. All Rights Reserved.</div>
                    }
                    <img className="footer-Logo" alt={"footer Logo"} src={footer}></img>
                </div>
            </div>
        )
    }
}

export class StdInputDropDownOption extends React.Component {
    render() {
        return (
            <div className={"dropdownOptions " + this.props.className} type={this.props.type} value={this.props.value} onClick={this.props.onClick}>

                {this.props.children}
            </div>
        )
    }
}

export class StdInputCountryCodeDropDownOption extends React.Component {
    render() {
        return (
            <div className={"dropdownOptions "} value={this.props.value} onClick={this.props.onClick}>
                <span className="countryCode">{this.props.countryCode}</span>
                {this.props.children}
            </div>
        )
    }
}
StdInputDropDownOption.defaultProps = {
    value: "",
}




export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            inputClasses: "SearchFieldGroup",
            showToolTip: false,
            searchQuery: "",
            selectedTag: "",
            tagType: "",
            suggestions: this.props.suggestions,
            macrosSuggestion: this.props.suggestions.filter(suggestion => suggestion.type === "macro"),
            specificSuggestion: this.props.suggestions.filter(suggestion => suggestion.type === "specific"),
            multipleSuggestion: this.props.suggestions.filter(suggestion => suggestion.type === "multiple"),
            placeholder: "",
        }
        this.searchInput = React.createRef();
        this.toggle = this.toggle.bind(this);
        this.focus = this.focus.bind(this);
        this.toggleToolTip = this.toggleToolTip.bind(this);
        this.searchCallBack = this.searchCallBack.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.state.expanded = this.props.persist ? true : false;
        this.state.inputClasses = this.props.persist ? "SearchFieldGroup if-active" : "SearchFieldGroup";
    }

    componentDidUpdate(prevProps) {
        if (prevProps.persist !== this.props.persist) {
            this.updateAndNotify();
        }
    }

    focus() {
        if (!this.props.persist) {
            this.searchInput.current.focus()
        }
    }

    updateAndNotify() {
        this.setState({
            expanded: true,
            inputClasses: "SearchFieldGroup if-active"
        })
    }

    toggleToolTip = (e) => {
        e.stopPropagation()
        this.setState({
            showToolTip: !this.state.showToolTip
        })
    }
    toggle() {
        this.props.onClick();

        if (this.props.persist) {
            this.searchInput.current.focus();
            return;
        } else {

            if (this.state.expanded) {
                this.setState({
                    expanded: false,
                    inputClasses: "SearchFieldGroup"
                })
            } else {
                this.setState({
                    expanded: true,
                    inputClasses: "SearchFieldGroup if-active"
                })
                this.searchInput.current.focus();
            }
        }

    }

    setSearch(option) {
        this.searchInput.current.value = option;
    }

    setPrimaryInput(tag) {
        this.setState({
            selectedTag: tag.value,
            tagType: tag.type,
        })
        this.searchInput.current.value = ""

        if (tag.value.slice(1) === "gender") {
            this.setState({
                suggestions: [{ value: "Male", label: "Male", type: "" }, { value: "Female", label: "Female", type: "" }],
                placeholder: "Enter a gender",
            })
        }
        this.searchInput.current.focus();
    }

    handleSearchQueryChange = (e) => {
        this.setState({
            searchQuery: e.target.value
        })
    }

    handleKeydown = (e, tag) => {
        if (e.key === "Enter") {
            this.searchCallBack(tag);
        }
    }

    searchCallBack(tag) {
        this.setState({
            selectedTag: "",
            tagType: "",
            suggestions: searchSuggestions,
            placeholder: "",
        })
        this.searchInput.current.value = ""
        this.searchInput.current.focus();
        this.props.searchCallBack(tag);
    }

    onCancelClick() {
        this.setState({
            selectedTag: "",
            tagType: "",
            suggestions: searchSuggestions,
            placeholder: "",
        })
        this.searchInput.current.value = "";
    }

    render() {

        return (
            <div className={this.props.className}>
                <div className={" justify-content-end d-flex align-items-center"}>
                    <div className="searchBar">
                        <SearchButton onClick={this.toggle} className={this.props.invert ? "invert" : ""} icon={<i className="bi bi-search"></i>} toolTip={this.props.toolTip} showToolTip={this.state.showToolTip} onMouseEnter={this.toggleToolTip} onMouseLeave={
                            this.toggleToolTip}></SearchButton>

                    </div>{this.state.selectedTag !== "" &&
                        <SearchTags showEdit={false} onCancelClick={this.onCancelClick} type={this.state.tagType}>{this.state.selectedTag}</SearchTags>
                    }
                    <div className={"d-flex align-items-center " + this.state.inputClasses} onAnimationEnd={this.focus}>
                        <input type={"text"} className={"SearchField"} placeholder={this.state.placeholder} ref={this.searchInput} onChange={this.handleSearchQueryChange} onKeyDown={(e) => this.handleKeydown(e, { type: this.state.tagType, value: this.state.selectedTag + "(" + this.searchInput.current.value + ")" })}></input>
                        {this.state.selectedTag === "" &&
                            <div className={"dropdown "} style={{ "--maxItems": 5, "gridTemplateColumns": ["@", ":", "+", "#"].includes(this.state.searchQuery[0]) ? "1fr" : "" }}>
                                {(this.state.searchQuery[0] === ":" || !["@", ":", "+", "#"].includes(this.state.searchQuery[0]) || this.state.searchQuery === "") &&
                                    <div className="macros">
                                        <div className="d-flex tagDescListTile macros">
                                            <div className="icon macros">
                                                :
                                            </div>
                                            <div className="tagDesc macros">
                                                <h6 className="macros">:MacroName</h6>
                                                <p>
                                                    Predefined macros for quick and easy search filtering.
                                                </p>
                                            </div>
                                        </div>

                                        {this.state.macrosSuggestion.length === 0 ?
                                            <div className="noMacrosPlaceHolder">
                                                There are no macros created. Click below to create a new macro.
                                                <StdButton onClick={() => this.props.toggleTagMacros("tm")} className={"primary"}>Create New Macro</StdButton>
                                            </div>
                                            :
                                            <div className="row row-cols-xs-3 row-cols-md-2 row-cols-lg-3 row-cols-1 searchSuggestions">
                                                {this.state.macrosSuggestion.map((option, index) => {
                                                    if (((option.label.toLowerCase().includes(this.state.searchQuery.toLowerCase()) || this.state.searchQuery === "") && option.type !== "specific" && option.type !== "multiple")) {
                                                        return <StdInputDropDownOption key={index} value={option.value} onClick={() => this.searchCallBack({ type: option.type, value: option.value })}>{option.label}</StdInputDropDownOption>
                                                    }
                                                    return "";
                                                })}
                                            </div>
                                        }


                                    </div>
                                }
                                {(this.state.searchQuery[0] === "@" || !["@", ":", "+", "#"].includes(this.state.searchQuery[0]) || this.state.searchQuery === "") &&

                                    <div className="specific">
                                        <div className="d-flex tagDescListTile specific">
                                            <div className="icon specific">
                                                @
                                            </div>
                                            <div className="tagDesc specific">
                                                <h6 className="specific">@column(interest)</h6>
                                                <p>
                                                    Targets specific column, only return entries with column value like interest
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row row-cols-xs-3 row-cols-md-2 row-cols-lg-3 row-cols-1 searchSuggestions">
                                            {this.state.specificSuggestion.map((option, index) => {
                                                if ((option.label.toLowerCase().includes(this.state.searchQuery.toLowerCase()) || this.state.searchQuery === "") && option.type === "specific") {
                                                    return <StdInputDropDownOption key={index} value={option.value} onClick={() => this.setPrimaryInput(option)}>{option.label}</StdInputDropDownOption>
                                                }
                                                return "";
                                            }
                                            )}
                                        </div>
                                    </div>
                                }
                                {(this.state.searchQuery[0] === "+" || !["@", ":", "+", "#"].includes(this.state.searchQuery[0]) || this.state.searchQuery === "") &&
                                    <div className="multiple">
                                        <div className="d-flex tagDescListTile multiple">
                                            <div className="icon multiple">
                                                +
                                            </div>
                                            <div className="tagDesc multiple">
                                                <h6 className="multiple">+column(interest)</h6>
                                                <p>
                                                    Multiple targeting of specific column, returns entries with column value like interestA or interestB
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row row-cols-xs-3 row-cols-md-2 row-cols-lg-3 row-cols-1 searchSuggestions">
                                            {this.state.multipleSuggestion.map((option, index) => {
                                                if ((option.label.toLowerCase().includes(this.state.searchQuery.toLowerCase()) || this.state.searchQuery === "") && option.type === "multiple") {
                                                    return <StdInputDropDownOption key={index} value={option.value} onClick={() => this.setPrimaryInput(option)}>{option.label}</StdInputDropDownOption>
                                                }
                                                return "";
                                            }
                                            )}
                                        </div>
                                    </div>
                                }

                            </div>
                        }
                        {this.state.selectedTag !== "" &&
                            <div className="dropdown row" style={{ "--maxItems": 5 }}>
                                {this.state.suggestions.map((option, index) => {
                                    if (option.label.toLowerCase().includes(this.state.searchQuery.toLowerCase()) || this.state.searchQuery === "") {
                                        return <StdInputDropDownOption className={"col-12 col-md-6 col-lg-3"} key={index} value={option.value} onClick={() => this.searchCallBack({ type: this.state.tagType, value: this.state.selectedTag + "(" + option.value + ")" })}>{option.label}</StdInputDropDownOption>
                                    }
                                    return "";
                                }
                                )}
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
SearchBar.defaultProps = {
    invert: false,
    suggestions: searchSuggestions,
}

export class StdSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            inputClasses: "SearchFieldGroup",
            showToolTip: false,
            searchQuery: "",
            selectedTag: "",
            tagType: "",
            suggestions: this.props.suggestions,
            placeholder: "",
        }
        this.searchInput = React.createRef();
        this.toggle = this.toggle.bind(this);
        this.focus = this.focus.bind(this);
        this.toggleToolTip = this.toggleToolTip.bind(this);
        this.searchCallBack = this.searchCallBack.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.state.expanded = this.props.persist ? true : false;
        this.state.inputClasses = this.props.persist ? "SearchFieldGroup if-active" : "SearchFieldGroup";
    }

    componentDidUpdate(prevProps) {
        if (prevProps.persist !== this.props.persist) {
            this.updateAndNotify();
        }
    }

    focus() {
        if (!this.props.persist) {
            this.searchInput.current.focus()
        }
    }

    updateAndNotify() {
        this.setState({
            expanded: true,
            inputClasses: "SearchFieldGroup if-active"
        })
    }

    toggleToolTip = (e) => {
        e.stopPropagation()
        if (this.props.toolTip !== null) {

            this.setState({
                showToolTip: !this.state.showToolTip
            })
        }
    }
    toggle() {
        this.props.onClick();

        if (this.props.persist) {
            this.searchInput.current.focus();
            return;
        } else {

            if (this.state.expanded) {
                this.setState({
                    expanded: false,
                    inputClasses: "SearchFieldGroup"
                })
            } else {
                this.setState({
                    expanded: true,
                    inputClasses: "SearchFieldGroup if-active"
                })
                this.searchInput.current.focus();
            }
        }

    }

    setSearch(option) {
        this.searchInput.current.value = option;
    }

    handleSearchQueryChange = (e) => {
        console.log(e.target.value);
        this.setState({
            searchQuery: e.target.value
        })
        this.props.searchChangeCallBack(e.target.value);
    }

    handleKeydown = (e, tag) => {
        if (e.key === "Enter") {
            this.searchCallBack(tag);
        }
    }

    searchCallBack(query) {
        this.props.searchCallBack(query);
    }

    render() {

        return (
            <div className={this.props.className}>
                <div className={" justify-content-end d-flex align-items-center"}>
                    <div className="searchBar">
                        <SearchButton onClick={this.toggle} className={this.props.invert ? "invert" : ""} hasToolTip={false} icon={<i className="bi bi-search"></i>}></SearchButton>
                    </div>
                    <div className={"d-flex align-items-center " + this.state.inputClasses} onAnimationEnd={this.focus}>
                        <input type={"text"} className={"SearchField"} placeholder={this.state.placeholder} ref={this.searchInput} onChange={this.handleSearchQueryChange} onKeyDown={(e) => this.handleKeydown(e, { type: this.state.tagType, value: this.state.selectedTag + "(" + this.searchInput.current.value + ")" })}></input>

                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
StdSearchBar.defaultProps = {
    suggestions: [],
}


export class SearchButton extends React.Component {
    render() {
        return (
            <SizedBox width={this.props.size} height={this.props.size} className={"searchButton"} >
                <button className={"iconButton " + this.props.className} onClick={this.props.onClick} style={{ width: this.props.size, height: this.props.size }} onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave}>
                    {this.props.icon}
                </button>
                {this.props.hasToolTip &&

                    <div className="tooltiptext">
                        {this.props.toolTip}

                    </div>
                }

            </SizedBox>
        )
    }
}
SearchButton.defaultProps = {
    size: "56px",
}

export class Hamburger extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggled: false,
            classList: "ham hamRotate ham1",
        }
        this.toggle = this.toggle.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.show !== this.props.show) {

            this.handleUpdate(this.props.show);
        }
    }

    handleUpdate(show) {
        if (show) {
            this.setState({
                classList: "ham hamRotate ham1 active",
                toggled: !this.state.toggled
            }
            )
        } else {
            this.setState({
                classList: "ham hamRotate ham1 ",
                toggled: !this.state.toggled
            }
            )
        }
    }

    toggle = () => {
        this.props.onClick();
        if (this.state.toggled) {
            this.setState({
                classList: "ham hamRotate ham1 ",
                toggled: !this.state.toggled
            }
            )
        } else {
            this.props.onClick()
            this.setState({
                classList: "ham hamRotate ham1 active",
                toggled: !this.state.toggled
            }
            )
        }
    }

    render() {

        return (
            <div className={this.props.className} onClick={this.toggle}>

                <svg className={this.state.classList} viewBox="0 0 100 100" width={this.props.size} height={this.props.size}>
                    <path
                        class="line top"
                        d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40" />
                    <path
                        class="line middle"
                        d="m 30,50 h 40" />
                    <path
                        class="line bottom"
                        d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40" />
                </svg>
                {this.props.children}
            </div>
        )
    }
}

Hamburger.defaultProps = {
    size: "56px",
}

export class ActionsButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classList: "actionsMenuToggle",
            actionsMenuClass: "actionsMenu",
            toggled: false,
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle = () => {
        this.props.onClick()
        if (this.state.toggled) {
            this.setState({
                classList: "actionsMenuToggle ",
                actionsMenuClass: "actionsMenu",
                toggled: !this.state.toggled
            }
            )
        } else {
            this.props.onClick()
            this.setState({
                classList: "actionsMenuToggle active ",
                actionsMenuClass: "actionsMenu showActions",
                toggled: !this.state.toggled
            }
            )
        }
    }

    render() {
        return (
            <div className={" " + this.props.className} title={"Actions"} style={this.props.style}>

                <div className={this.state.classList + " text-center"} onClick={this.toggle}>
                    <i class="bi bi-grid-3x3-gap-fill"></i>
                </div>
                <div className={this.state.actionsMenuClass}>

                    {this.props.children}
                </div>
            </div>
        )
    }
}

ActionsButton.defaultProps = {
    size: "32px",
}
export class IconButton extends React.Component {
    render() {
        return (
            <SizedBox width={this.props.size} height={this.props.size} className={"align-items-center d-flex justify-content-center "}>
                <button className={"iconButton " + this.props.className} onClick={this.props.onClick} title={this.props.title}>
                    {this.props.icon}
                </button>
            </SizedBox>
        )
    }
}
IconButton.defaultProps = {
    className: "",
    size: "32px",
}
export class IconButtonAsLink extends React.Component {
    render() {
        return (
            <SizedBox width={this.props.size} height={this.props.size} className={"align-items-center d-flex justify-content-center "}>
                <Link to={this.props.to} className={"iconButton " + this.props.className} onClick={this.props.onClick} title={this.props.title}>
                    {this.props.icon}
                </Link>
            </SizedBox>
        )
    }
}
IconButtonAsLink.defaultProps = {
    className: "",
    size: "32px",
}

export class IconButtonWithText extends React.Component {
    render() {
        return (
            <button className={"align-items-center d-flex justify-content-center iconButton " + this.props.className} onClick={this.props.onClick}>
                <SizedBox width={this.props.size} height={this.props.size} className={"align-items-center d-flex justify-content-center "}>
                    <div>
                        {this.props.icon}
                    </div>
                </SizedBox>
                {this.props.label}
            </button>
        )
    }
}
IconButtonWithText.defaultProps = {
    className: "",
    size: "32px",
}

export class SearchTags extends React.Component {
    TagType = { DEFAULT: "DEFAULT", SPECIFIC: "SPECIFIC", MULTIPLE: "MULTIPLE", EXCLUDE: "EXCLUDE" }
    constructor(props) {
        super(props);
        this.state = {
            type: this.TagType.DEFAULT,
            mode: "desktop",
            showTagOverlay: false
        }

        this.toggleDelete = this.toggleDelete.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    resize() {
        const md = 768;
        if (window.innerWidth < md) {
            this.setState({ mode: "mobile" })
        } else {
            this.setState({ mode: "desktop" })
        }
    }

    toggleDelete() {
        this.setState({
            showTagOverlay: !this.state.showTagOverlay
        })
    }

    render() {
        let type = " default";
        switch (this.props.type) {
            case "default": type = " default"; break;
            case "specific": type = " specific"; break;
            case "multiple": type = " multiple"; break;
            case "exclude": type = " exclude"; break;
            case "truncator": type = " truncator"; break;
            case "base": type = " base"; break;
            default: type = " default"; break;

        }
        if (type === " truncator") {
            return (
                <div className={"searchTag" + type}>
                    <span>{this.props.children}</span>
                </div>
            )
        }

        if (this.state.mode === "mobile") {
            return (
                <div className={"searchTag d-flex align-items-center" + type}>
                    <span>{this.props.children}</span>
                    {this.props.showRemove ?
                        <div className={"searchTag-delete"} onClick={this.props.onCancelClick} ><i class="bi bi-x"></i></div> : <div />}
                </div>
            )
        } else {
            return (

                <div className={"searchTag searchTag-desktop d-flex align-items-center" + type}>
                    {this.props.showRemove ? <div className={"searchTag-deleteOverlay"}>
                        <i class="bi bi-pencil" onClick={this.props.onEditClick}></i>
                        <i class="bi bi-x-circle" onClick={this.props.onCancelClick}></i>
                    </div> : <div />
                    }

                    <span>{this.props.children}</span>
                </div>
            )
        }
    }
}

SearchTags.defaultProps = {
    showRemove: true,
}

export class TagsBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maxTags: 3,
            startX: 0,
            endX: 0,
            slideClass: "",
            slideProgression: 0,
        }
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
    }
    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    handleTouchStart = (e) => {

        this.setState({
            startX: e.touches[0].clientX,
            slideClass: "sliding",
            slideProgression: 0,
        }
        )
        console.log(e.touches[0].clientX);
    }

    handleMouseDown = (e) => {
        this.setState({
            startX: e.clientX,
            slideClass: "sliding",
            slideProgression: 0,
        })
    }

    handleTouchMove = (e) => {
        this.setState({
            endX: e.touches[0].clientX,
            slideProgression: (this.state.endX - this.state.startX) + "px",
        })
        console.log(e.touches[0].clientX);
    }

    handleMouseMove = (e) => {
        if (this.state.startX - this.state.endX > -150) {

            this.setState({
                endX: e.clientX,
                slideProgression: (this.state.endX - this.state.startX) + "px",
            })
        }
    }

    handleTouchEnd = (e) => {
        console.log("END")
        if (this.state.startX - this.state.endX < -150) {
            this.setState({
                slideClass: "",
                slideProgression: 0,
            })
            this.props.deleteAllTags();
        }
    }

    handleMouseUp = (e) => {
        if (this.state.startX - this.state.endX < -150) {
            this.setState({
                slideClass: "",
                slideProgression: 0,
            })
            this.props.deleteAllTags();
        }
    }

    resize() {
        const sm = 576;
        const md = 768;
        const lg = 992;
        const xl = 1200;
        const xxl = 1600;
        if (window.innerWidth >= xxl) {
            this.setState({
                maxTags: -1
            })
        } else if (window.innerWidth >= xl) {
            this.setState({
                maxTags: 6
            })
        } else if (window.innerWidth >= lg) {
            this.setState({
                maxTags: 5
            })
        } else if (window.innerWidth >= md) {
            this.setState({
                maxTags: 4
            })
        } else if (window.innerWidth >= sm) {
            this.setState({
                maxTags: 3
            })
        } else if (window.innerWidth < sm) {
            this.setState({
                maxTags: 3
            })
        }
    }

    render() {
        const tags = React.Children.count(this.props.children);
        const tagsList = React.Children.toArray(this.props.children);
        if (React.Children.count(this.props.children) === 0) {
            return (
                <div className={"d-flex align-items-center tagsBox flex-wrap justify-content-start " + this.props.className} onClick={this.props.onClick}>
                    <h1>No Tags yet</h1>
                </div>
            )
        }
        if (!this.props.truncate || this.state.maxTags === -1) {
            if (window.innerWidth < 768) {
                return (
                    <div>
                        {this.props.enableDeleteAll &&
                            <span className="instructions">Slide right to delete all tags</span>
                        }
                        <div className="tagsContainer">
                            <div className={"d-flex align-items-center tagsBox flex-wrap justify-content-start " + this.props.className + " " + this.state.slideClass}
                                onClick={this.props.onClick}
                                onTouchStart={this.handleTouchStart}
                                onMouseDown={this.handleMouseDown}
                                onTouchMove={this.handleTouchMove}
                                onMouseMove={this.handleMouseMove}
                                onTouchEnd={this.handleTouchEnd}
                                onMouseUp={this.handleMouseUp}
                                style={{ "--slideDistance": this.state.slideProgression }}>
                                {this.props.showlabel &&
                                    <div className="tagboxLabel" style={{ color: "black" }}>Search Tags:</div>
                                }
                                {this.props.children}
                            </div>
                            <div className="text-left deleteBg" >

                                <i class="bi bi-trash3-fill"></i> Delete All
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="tagsContainer">
                        <div className={"d-flex align-items-center tagsBox flex-wrap justify-content-start " + this.props.className + " " + (this.props.enableDeleteAll && " tagsBox-desktop")} >
                            {this.props.showlabel &&
                                <div className="tagboxLabel" style={{ color: "black" }}>Search Tags:</div>
                            }
                            {this.props.children}
                        </div>
                        <div className="text-left deleteBg" onClick={this.props.deleteAllTags}>
                            <div className="deleteBtn">
                                <i class="bi bi-trash3-fill"></i>
                                <span>Delete All</span>
                            </div>
                        </div>
                    </div>
                )
            }

        } else {
            return (

                <div className={"d-flex tagsBox flex-wrap justify-content-start " + this.props.className} onClick={this.props.onClick} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
                    {tags > this.state.maxTags ? tagsList.slice(0, this.state.maxTags) : this.props.children}
                    {tags > this.state.maxTags ? <SearchTags className={"align-self-stretch"} type={"truncator"} showRemove={false}>({tags - this.state.maxTags}) More...</SearchTags> : <div></div>}
                </div>
            )
        }
    }
}

TagsBox.defaultProps = {
    className: "",
    truncate: false,
    showlabel: false,
    enableDeleteAll: false,
    onClick: () => { }
}

//A beautiful checkbox
export class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked,
            className: "checkbox"
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle = () => {
        this.setState({
            checked: !this.state.checked,
            className: this.state.checked ? "checkbox" : "checkbox checked"
        })
        this.props.onClick();
    }
    render() {
        return (
            <div className={this.state.className} onClick={this.toggle}>
                <div className="checkbox-icon">
                    <i class="bi bi-check"></i>
                </div>
            </div>
        )
    }
}

export class StdButton extends React.Component {
    constructor(props) {
        super(props);
        this.getPos = this.getPos.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.ripple = this.ripple.bind(this);
        this.reset = this.reset.bind(this);
        this.btnRef = React.createRef();
        this.state = {
            ripplePosX: 0,
            ripplePosY: 0,
            classes: ""
        }
    }


    getPos = (e) => {
        this.setState({
            ripplePosX: e.clientX - this.btnRef.current.getBoundingClientRect().left,
            ripplePosY: e.clientY - this.btnRef.current.getBoundingClientRect().top
        })
    }
    reset() {
        this.setState({
            classes: ""
        })
    }

    handleClick = (e) => {
        this.getPos(e);
        this.setState({ classes: "ripple" })
        this.props.onClick();
    }

    ripple = (e) => {
        this.getPos(e);
        this.setState({ classes: "ripple" })
    }

    render() {


        return (
            <button
                className={"button " + this.state.classes + " " + this.props.className}
                style={{ "--x": this.state.ripplePosX + "px", "--y": this.state.ripplePosY + "px" }}
                onClick={this.handleClick}
                disabled={this.props.disabled}
                onAnimationEnd={this.reset}
                ref={this.btnRef}>
                {this.props.children}
            </button>
        )
    }

}
StdButton.defaultProps = {
    disabled: false,
}

export class MultiStepBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: this.props.currentStep,
            progression: 0,
        }
        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
        this.setStep = this.setStep.bind(this);
    }

    nextStep() {
        this.setState({
            currentStep: this.props.currentStep + 1,
        })
    }

    prevStep() {
        this.setState({
            currentStep: this.props.currentStep - 1,
        })
    }

    setStep(e) {
        this.setState({
            currentStep: e
        })
    }


    
    componentDidUpdate(prevProps, prevState){
        if(prevProps.currentStep !== this.props.currentStep){
            this.setState({
                currentStep: this.props.currentStep
            })
        }
    }  

    render() {
        return (
            <div className="Multistep-Container">
                {this.props.children.map((child, index) => {
                    if (React.isValidElement(child) && index === this.state.currentStep) {
                        return (
                            <div key={index} className={"step " + (index === this.state.currentStep ? "active" : "")}>
                                {React.cloneElement(child, { nextStep: this.nextStep, prevStep: this.prevStep, setStep: this.setStep })}
                            </div>
                        )
                    } else {
                        return <div key={index} className={"step  i " + (index === this.state.currentStep ? "active" : "")} nextStep={this.nextStep} prevStep={this.prevStep} setStep={this.setStep}>
                        </div>
                    }
                })}
            </div>
        )
    }
}


export class Step extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: this.props.currentStep
        }
    }

    render() {
        return (
            <div className={"step " + (this.props.currentStep === this.props.step? "active" : "")}>
                {this.props.children}
            </div>
        )
    }
}

export class ListMapper extends React.Component{

    addLink = (a,b) =>{
        const aKey = this.props.settings.tableHeaders[0]
        const bKey = this.props.settings.tableHeaders[1]
        const itemToAdd = {}
        itemToAdd[aKey] = a
        itemToAdd[bKey] = b
        console.log(a,b);
        this.props.addLink(itemToAdd);
        this.props.requestRefresh();
    }

    deleteLink = (a,b) =>{
        const aKey = this.props.settings.tableHeaders[0]
        const bKey = this.props.settings.tableHeaders[1]
        const itemToDelete = {}
        itemToDelete[aKey] = a;
        itemToDelete[bKey] = b;
        console.log(a,b);
        this.props.deleteLink(itemToDelete);
        this.props.requestRefresh();
    }

    render(){
        return(
            <div className="listMapper">
                <div className="listMapper-header">{this.props.title}</div>
                <div className="listMapper-Selector">
                    {this.props.data?
                    
                    this.props.data.map((item, index) => {
                        return (
                            <ListMapperItem currItem = {this.props.currItemID} addLink={this.addLink} deleteLink={this.deleteLink} key={index} currentMap={this.props.currentMap} item={item} headers = {this.props.headers} settings={this.props.settings}></ListMapperItem>
                        )
                    }): ""}
                </div>
            </div>
        )
    }
}

export class ListMapperItem extends React.Component{
    render(){
        return(
            this.props.currentMap.some((item) => item[this.props.settings.matchingHeaders[0]] === this.props.item[this.props.settings.matchingHeaders[1]]) ? 
                <div className="listMapperItem active"  onClick={()=>this.props.deleteLink(this.props.item[this.props.settings.matchingHeaders[1]],this.props.currItem)}>
                {Object.keys(this.props.headers).map((key, index) => {
                    if(!this.props.headers[key].primaryKey && !this.props.headers[key].foreignKey ){
                        
                    return (
                        this.props.item[key] + " "
                    )
                    }
                    return "";
                })}
            </div>
            : 
            
            <div className="listMapperItem" onClick={()=>this.props.addLink(this.props.item[this.props.settings.matchingHeaders[1]],this.props.currItem,)}>
                {Object.keys(this.props.headers).map((key, index) => {
                    if(!this.props.headers[key].primaryKey && !this.props.headers[key].foreignKey ){
                        
                    return (
                        this.props.item[key] + " "
                    )
                    }
                    return "";
                })}
            </div>
        )
    }
}

export class ListMapperView extends React.Component{
    render(){
        return(
            <div className="listMapper">
                <div className="listMapper-header">{this.props.title}</div>
                <div className="listMapper-Selector">
                    {this.props.data?
                    this.props.data.map((item, index) => {
                        return (
                            <ListMapperViewItem key={index} item={item} headers = {this.props.headers} settings={this.props.settings}></ListMapperViewItem>
                        )
                    }): ""}
                </div>
            </div>
        )
    }
}

export class ListMapperViewItem extends React.Component{
    render(){
        return(
            <div className="listMapperItem active">
                {Object.keys(this.props.headers).map((key, index) => {
                    if(!this.props.headers[key].primaryKey && !this.props.headers[key].foreignKey ){
                        
                    return (
                        this.props.item[key] + " "
                    )
                    }
                    return "";
                })}
            </div>
        )
    }
}

const steps = {
    0: "month",
    1: "week",
    2: "day",
}

export class CalendarView extends React.Component{

    state={
        month: moment(new Date()).format("MM"),
    }

    nextMonth = () =>{
        this.setState({
            month: moment(this.state.month, "MM").add(1, "month").format("MM")
        })
    }

    prevMonth = () =>{
        this.setState({
            month: moment(this.state.month, "MM").subtract(1, "month").format("MM")
        })
    }

    componentDidMount(){
    }

    render(){
        return (
            <MultiStepBox steps={steps} currentStep={0}>
                <MonthView month = {this.state.month} nextMonth={this.nextMonth} prevMonth={this.prevMonth}>
                </MonthView>
                <WeekView>
                </WeekView>
                <DayView>
                </DayView>
            </MultiStepBox>
        )
    }
}

export class MonthView extends React.Component{
    state={
        calendar:[],
        currentMonth: moment(),
    }

    componentDidMount(){
        const days = this.generateCalendar();
        this.setState({
            calendar: days
        })
    }

    generateCalendar = () =>{
        
        const startDay = this.state.currentMonth.clone().startOf('month').startOf('week');
        const endDay = this.state.currentMonth.clone().endOf('month').endOf('week');

        var calendar = [];
        var index = startDay.clone();
        while (index.isBefore(endDay, 'day')) {
            calendar.push(
                new Array(7).fill(0).map(
                    function(n, i) {
                        return {date: index.add(1, 'day').date()};
                    }
                )
            );
        }
        return calendar;
    }

    nextMonth = () =>{
        this.setState({
            currentMonth: this.state.currentMonth.add(1, "month")
        })
        var days = this.generateCalendar();
        this.setState({
            calendar: days
        })
        
        this.props.nextMonth();
    }

    prevMonth = () =>{
        this.setState({
            currentMonth: this.state.currentMonth.subtract(1, "month")
        })
        var days = this.generateCalendar();
        this.setState({
            calendar: days
        })
        this.props.prevMonth();
    }

    render(){
        return(
            <div className="monthView">
                <div className="monthView-header">
                    <IconButton className={"invert"} icon={<i class="bi bi-chevron-double-left"></i>} onClick={this.prevMonth}></IconButton>
                    {moment(this.props.month).format("MMMM")}
                    <IconButton className={"invert"} icon={<i class="bi bi-chevron-double-right"></i>} onClick={this.nextMonth}></IconButton>
                </div>
                <div className="monthView-daysHeader">
                    <div className="monthView-dayHeader">Monday</div>
                    <div className="monthView-dayHeader">Tuesday</div>
                    <div className="monthView-dayHeader">Wednesday</div>
                    <div className="monthView-dayHeader">Thursday</div>
                    <div className="monthView-dayHeader">Friday</div>
                    <div className="monthView-dayHeader">Saturday</div>
                    <div className="monthView-dayHeader">Sunday</div>
                </div>
                <div className="monthView-days">
                    {this.state.calendar.map((week, index) => {
                        return (
                            <div className="monthView-week">
                                {week.map((day, index) => {
                                    return (
                                        <div className="monthView-day">
                                            {day.date}
                                        </div>
                                    )
                                })}
                                </div>
                        )})}
                </div>
            </div>
        )
    }
}

export class WeekView extends React.Component{
    state={
        calendar:[],
        currentMonth: moment(),
        timeSlots: [],
    }
    componentDidMount(){
        const days = this.generateCalendar();
        const timeSlots = [
            {time: "8:00", events: []},
            {time: "8:30", events: []},
            {time: "9:00", events: []},
            {time: "9:30", events: []},
            {time: "10:00", events: []},
            {time: "10:30", events: []},
            {time: "11:00", events: []},
            {time: "11:30", events: []},
            {time: "12:00", events: []},
            {time: "12:30", events: []},
            {time: "13:00", events: []},
            {time: "13:30", events: []},
            {time: "14:00", events: []},
            {time: "14:30", events: []},
            {time: "15:00", events: []},
            {time: "15:30", events: []},
            {time: "16:00", events: []},
            {time: "16:30", events: []},
            {time: "17:00", events: []},
            {time: "17:30", events: []},
            {time: "18:00", events: []},
            {time: "18:30", events: []},
            {time: "19:00", events: []},
            {time: "19:30", events: []},
            {time: "20:00", events: []},
            {time: "20:30", events: []},
        ]
        this.setState({
            calendar: days,
            timeSlots: timeSlots
        })
    }

    generateCalendar = () =>{
        const startDay = this.state.currentMonth.clone().startOf("week").subtract(1,"day");

        var calendar = [];
        var index = startDay.clone();
            calendar = 
                new Array(7).fill(0).map(
                    function(n, i) {
                        return {date: index.add(1, 'day').date(), day: index.format("ddd"), month: index.format("MM"), fullDateFormat: index.format("DD-MM-YYYY")};
                    }
                );
        return calendar;
    }

    nextWeek = () =>{
        this.setState({
            currentMonth: this.state.currentMonth.add(1, "week")
        })
        var days = this.generateCalendar();
        this.setState({
            calendar: days
        })
        if(this.props.nextWeek){
            this.props.nextWeek();
        }
    }

    prevWeek = () =>{
        this.setState({
            currentMonth: this.state.currentMonth.subtract(1, "week")
        })
        var days = this.generateCalendar();
        this.setState({
            calendar: days
        })
        if(this.props.prevWeek){
            this.props.prevWeek();
        }
        ;
    }




    render(){
        return(
            <div className="weekView">
                <div className="weekView-header">
                    <IconButton className={"invert"} icon={<i class="bi bi-chevron-double-left"></i>} onClick={this.prevWeek}></IconButton>
                    {this.state.currentMonth.clone().startOf('week').format("DD MMMM") + " - " + this.state.currentMonth.clone().endOf('week').format("DD MMMM")}
                    <IconButton className={"invert"} icon={<i class="bi bi-chevron-double-right"></i>} onClick={this.nextWeek}></IconButton>
                </div>
                <div className="weekView-week-container">
                        <div className="weekView-weekDays" style={{"--rows": this.state.calendar.length + 1}}>
                            <div className="spacer"></div>
                            {this.state.calendar.map((day, index) => {
                                return (
                                    <div className={"weekView-days " + ((day.date === parseInt(moment(new Date()).format("DD")) && day.month === moment(new Date()).format("MM")) ? "active" : "")}>
                                        <span className="date">{day.date}</span>
                                        <span className="day">{day.day}</span>
                                    </div>
                                )
                            })}
                        </div>
                    <div className="weekView-timeHeader" style={{"--columns" : this.state.timeSlots.length}}>
                        {this.state.timeSlots.map((timeSlot, index) => {
                            return (
                                <div className="timeSlot">{timeSlot.time}</div>
                            )
                        })}
                        <div className="weekView-days">
                        {this.state.calendar.map((day, index) => {
                            console.log(this.props.items);
                            let item = "";
                            if(this.props.items.hasOwnProperty(day.fullDateFormat)){
                                item = this.props.items[day.fullDateFormat];
                                return(
                                    <div className="weekView-day" style={{"--columns" : this.state.timeSlots.length}}>
                                        {this.state.timeSlots.map((timeSlot, index) => {
                                            return (
                                                <div className="weekView-timeSlot">
                                                    <div className="event">{item[timeSlot.time]}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            }else{
                                
                                return(
                                    <div className="weekView-day" style={{"--columns" : this.state.timeSlots.length}}>
                                        {this.state.timeSlots.map((timeSlot, index) => {
                                            return (
                                                <div className="weekView-timeSlot">
                                                    <div className="event">-</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            }
                            
                        })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class DayView extends React.Component{
    render(){
        return(
            <div className="monthView">
                <div className="monthView-header">
                    <div className="monthView-header-item">Month</div>
                    <div className="monthView-header-item">Week</div>
                    <div className="monthView-header-item">Day</div>
                </div>
                <div className="monthView-body">
                    <div className="monthView-body-item">Month</div>
                    <div className="monthView-body-item">Week</div>
                    <div className="monthView-body-item">Day</div>
                </div>
            </div>
        )
    }
}
