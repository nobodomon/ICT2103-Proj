import React from "react";
import { StdInput } from "./input";

export class ExpandableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      rowClasses: "tableRow ",
      expandedClass: "expandedRowPane",
      editMode: true,
      columns: React.Children.toArray(this.props.children).length,
    };
    this.expand = this.expand.bind(this);
  }

  expand() {
    if (this.state.expanded) {
      this.setState({
        expanded: !this.state.expanded,
        rowClasses: "tableRow ",
      });
    } else {
      this.setState({
        expanded: !this.state.expanded,
        rowClasses: "tableRow expanded",
      });
    }
  }

  updateHandle = (field, value) => {
    let data = this.props.values;
    data[field] = value;
    console.log(data);
    if (this.props.updateHandle(data)) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <div
        onTouchStart={this.handleButtonPress}
        onTouchEnd={this.handleButtonRelease}
        onMouseDown={this.handleButtonPress}
        onMouseUp={this.handleButtonRelease}
        onMouseLeave={this.handleButtonRelease}
      >
        <div className={this.state.rowClasses} onClick={this.expand}  style={{"--Columns": Object.keys(this.props.headers).length}}>
          {/* {this.props.headers.map((cell, secIndex) => {
            return (
              <Cell width={"100%"} key={secIndex}>
                {this.props.values[cell]}
              </Cell>
            );
          })}
           */}
          {Object.keys(this.props.headers).map((key, index) => {
            return <Cell width={"100%"} key={index}>{this.props.values[key]}</Cell>
          })}
        </div>
        {this.state.expanded ? (
          <div className={this.state.expandedClass}>
            <div className="row justify-content-center align-items-start expandedRow">

              <div className="col-12 col-lg-9 expansionColumn">
                <div className="expansionColumn-fieldcontainer">
                  
                {Object.keys(this.props.fieldSettings).map((field, index) => {
                  return (
                    <StdInput
                      key={index}
                      label={this.props.fieldSettings[field].displayLabel}
                      fieldLabel={field}
                      type={this.props.fieldSettings[field].type}
                      enabled={this.props.fieldSettings[field].editable}
                      hasSaveBtn={true}
                      showIndicator={this.props.fieldSettings[field].editable}
                      value={this.props.values[field]}
                      onChange={this.updateHandle}
                      options={this.props.fieldSettings[field].options}
                      dateFormat={this.props.fieldSettings[field].dateFormat}
                    ></StdInput>
                  );
                })}
                </div>
                {this.props.children}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowClasses: "tableRow ",
      columns: React.Children.toArray(this.props.children).length,
    };
  }
  render() {
    return (
      <div>
        <div className={this.state.rowClasses} style={{"--Columns": this.state.columns}}>{this.props.children}</div>
      </div>
    );
  }
}

export class HeaderRow extends React.Component {
  state={
    columns: React.Children.toArray(this.props.children).length,
  }
  render() {
    return <div className="tableRow headerRow" style={{"--Columns": this.state.columns}}>{this.props.children}</div>;
  }
}

export class Cell extends React.Component {
  render() {
    return (
      <div className="cell" style={{ width: this.props.width }}>
        {this.props.children}
      </div>
    );
  }
}

export class ListTable extends React.Component {
  render() {
    return <div className="tableContainer">{this.props.children}</div>;
  }
}
