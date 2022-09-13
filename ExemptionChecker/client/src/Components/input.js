import e from "cors";
import React from "react";

export class StdInput extends React.Component {
  state = {
    enabled: this.props.enabled,
    value: this.props.value,
    newValue:this.props.type === "multiselect" ? this.props.value ? this.props.value : [] : this.props.value,
    valueChanged: false,
    feedbackClass: "feedback",
  };
  componentDidMount() {
    this.setState({
      enabled: this.props.enabled ? this.props.enabled : false,
    });
  }

  updateValue = (value) => {
    this.setState({
      newValue: value,
      valueChanged: value != this.state.value ? true : false,
    });
    if (!this.props.hasSaveBtn) {
      this.props.onChange(this.props.fieldLabel, value);
    }
  };

  toggleEdit = () => {
    if (this.props.enabled) {
      this.setState({
        enabled: !this.state.enabled,
      });
    } else {
      this.setState({
        enabled: false,
      });
    }
  };

  handleSave = (value) => {
    this.setState({
      value: value,
      valueChanged: false,
    });
    console.log(this.props.onChange(this.props.fieldLabel, value));
    this.props.onChange(this.props.fieldLabel, value) ?
      this.feedback({success:true, msg: "Changes Saved"}) : 
      this.feedback({success:false, msg: "Failed to save changes"});
  };

  feedback = (message) =>{
    console.log(message);
    if(message.success){
      this.setState({
        feedbackClass: "feedback show",
        feedback: message.msg
      })
    }else{
      this.setState({
        feedbackClass: "feedback failed show",
        feedback: message.msg
      })
    }
  }

  reset =() => {
    this.setState({
        feedbackClass: "feedback",
        feedback: ""
    })
  }
  render() {
    if (this.state.enabled) {
      return (
        <div className={"inputBox " + (this.props.sameLine ? "same-line" : "")}>
          <div className="inputBox-Label">{this.props.label}</div>
          {this.props.type === "text" && (
            <StdTextBox
              updateValue={this.updateValue}
              value={this.state.newValue}
            ></StdTextBox>
          )}
          {this.props.type === "password" && (
            <StdPwdBox
              updateValue={this.updateValue}
              value={this.state.newValue}
            ></StdPwdBox>
          )}
          {this.props.type === "email" && (
            <StdEmailBox
              updateValue={this.updateValue}
              value={this.state.newValue}
            ></StdEmailBox>
          )}
          {this.props.type === "number" && (
            <StdNumberBox
              updateValue={this.updateValue}
              value={this.state.newValue}
            ></StdNumberBox>
          )}
          {this.props.type === "time" && (
            <StdTimeBox
              updateValue={this.updateValue}
              value={this.state.newValue}
            ></StdTimeBox>
          )}
          {this.props.type === "date" && this.props.dateFormat === "YYYY" &&(
            <StdNumberBox
              updateValue={this.updateValue}
              value={this.state.newValue}
              max={this.props.max ? this.props.max : new Date().getFullYear()}
              min={this.props.min ? this.props.min : new Date().getFullYear()-100}
            ></StdNumberBox>
          )}
          {this.props.type === "date" && this.props.dateFormat === "MM" &&(
            <StdNumberBox
              updateValue={this.updateValue}
              value={this.state.newValue}
              max={this.props.max ? this.props.max : 12}
              min={this.props.min ? this.props.min : 1}
            ></StdNumberBox>
          )}
          {this.props.type === "date" && this.props.dateFormat === "DD" &&(
            <StdNumberBox
              updateValue={this.updateValue}
              value={this.state.newValue}
              max={this.props.max ? this.props.max : 31}
              min={this.props.min ? this.props.min : 1}
            ></StdNumberBox>
          )}
          {this.props.type === "date" && !["YYYY","MM","DD"].includes(this.props.dateFormat) &&(
            <StdDateBox
              updateValue={this.updateValue}
              value={this.state.newValue}
            ></StdDateBox>
          )}
          {this.props.type === "datetime" && (
            <StdDateTimeBox
              updateValue={this.updateValue}
              value={this.state.newValue}
            ></StdDateTimeBox>
          )}

          {this.props.type === "dropdown" && (
            <StdDropDownBox
              updateValue={this.updateValue}
              value={this.state.newValue}
              options={this.props.options}
            ></StdDropDownBox>
          )}

          {this.props.type === "multiselect" && (
            <StdMultiSelect
              updateValue={this.updateValue}
              value={this.state.newValue}
              options={this.props.options}
            ></StdMultiSelect>
          )}
          {this.props.hasSaveBtn && this.state.valueChanged && (
            <div
              className="inputSave"
              onClick={() => {
                this.handleSave(this.state.newValue);
              }}
            >
              <i class="bi bi-check-circle"></i>
            </div>
          )}
          <div className={this.state.feedbackClass} onAnimationEnd={this.reset}>
            {this.state.feedback}
          </div>
        </div>
      );
    } else {
      return (
        <div onClick={this.toggleEdit} className={"inputBox disabled"}>
          <div className="inputBox-Label">{this.props.label}</div>
          <div className="read-only">{this.props.value}</div>

          {this.props.showIndicator && <i className="bi bi-pencil "></i>}
        </div>
      );
    }
  }
}
StdInput.defaultProps = {
  type: "text",
  enabled: false,
  value:"",
};

class StdTextBox extends React.Component {
  state = {
    valueChanged: false,
    value: this.props.value,
    newValue: this.props.value,
  };

  componentDidMount() {
    this.setState({
      newValue: this.props.value,
    });
  }

  onChange = (e) => {
    this.setState({
      newValue: e.target.value,
    });
    this.props.updateValue(e.target.value);
  };

  render() {
    return (
      <div
        className={
          "stdInputGroup d-flex align-items-center" +
          " " +
          (this.state.valueChanged ? "leftBorderRadius" : "borderRadius")
        }
      >
        <input
          className="stdInput"
          type="text"
          ref={this.primaryInput}
          autoComplete={this.props.autoComplete}
          placeholder={""}
          onChange={(e) => this.onChange(e)}
          value={this.state.newValue}
        ></input>
        {this.props.showIndicator ? (
          this.state.editable ? (
            <i className="bi bi-pencil "></i>
          ) : (
            <svg
              className="editLock"
              viewBox="0 0 30 30"
              preserveAspectRatio={"xMidYMid meet"}
            >
              <path
                className={"lockBody"}
                d={
                  "M 10 10 L 20 10 Q 25 10 25 15 V 25 Q 25 30 20 30 H 10 Q 5 30 5 25 V 15 Q 5 10 10 10 H 25 "
                }
              ></path>
              <path
                d={
                  "M 15 20 L 15 20 L 14 19.8 L 13 23 L 17 23 L 16 19.8 L 15 20 A 1 1 0 0 0 15 15 A 1 1 0 0 0 15 20"
                }
                className={"keyHole"}
              ></path>
              <path
                className="bolt"
                fill={"none"}
                d={"M 20 20 V 8 A 1 1 0 0 0 10 8 V 10"}
              ></path>
            </svg>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

class StdPwdBox extends React.Component {
  state = {
    valueChanged: false,
    value: this.props.value,
    newValue: this.props.value,
  };

  componentDidMount() {
    this.setState({
      newValue: this.props.value,
    });
  }

  onChange = (e) => {
    this.setState({
      newValue: e.target.value,
    });
    this.props.updateValue(e.target.value);
  };

  render() {
    return (
      <div
        className={
          "stdInputGroup d-flex align-items-center" +
          " " +
          (this.state.valueChanged ? "leftBorderRadius" : "borderRadius")
        }
      >
        <input
          className="stdInput"
          type="password"
          ref={this.primaryInput}
          autoComplete={this.props.autoComplete}
          placeholder={""}
          onChange={(e) => this.onChange(e)}
          value={this.state.newValue}
        ></input>
        {this.props.showIndicator ? (
          this.state.editable ? (
            <i className="bi bi-pencil "></i>
          ) : (
            <svg
              className="editLock"
              viewBox="0 0 30 30"
              preserveAspectRatio={"xMidYMid meet"}
            >
              <path
                className={"lockBody"}
                d={
                  "M 10 10 L 20 10 Q 25 10 25 15 V 25 Q 25 30 20 30 H 10 Q 5 30 5 25 V 15 Q 5 10 10 10 H 25 "
                }
              ></path>
              <path
                d={
                  "M 15 20 L 15 20 L 14 19.8 L 13 23 L 17 23 L 16 19.8 L 15 20 A 1 1 0 0 0 15 15 A 1 1 0 0 0 15 20"
                }
                className={"keyHole"}
              ></path>
              <path
                className="bolt"
                fill={"none"}
                d={"M 20 20 V 8 A 1 1 0 0 0 10 8 V 10"}
              ></path>
            </svg>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

class StdDateBox extends React.Component {
  state = {
    valueChanged: false,
    value: this.props.value,
    newValue: this.props.value,
  };

  componentDidMount() {
    this.setState({
      newValue: this.props.value,
    });
  }

  onChange = (e) => {
    this.setState({
      newValue: e.target.value,
    });
    this.props.updateValue(e.target.value);
  };

  render() {
    return (
      <div
        className={
          "stdInputGroup d-flex align-items-center" +
          " " +
          (this.state.valueChanged ? "leftBorderRadius" : "borderRadius")
        }
      >
        <input
          className="stdInput"
          type="date"
          ref={this.primaryInput}
          autoComplete={this.props.autoComplete}
          placeholder={""}
          onChange={(e) => this.onChange(e)}
          value={this.state.newValue}
        ></input>
        {this.props.showIndicator ? (
          this.state.editable ? (
            <i className="bi bi-pencil "></i>
          ) : (
            <svg
              className="editLock"
              viewBox="0 0 30 30"
              preserveAspectRatio={"xMidYMid meet"}
            >
              <path
                className={"lockBody"}
                d={
                  "M 10 10 L 20 10 Q 25 10 25 15 V 25 Q 25 30 20 30 H 10 Q 5 30 5 25 V 15 Q 5 10 10 10 H 25 "
                }
              ></path>
              <path
                d={
                  "M 15 20 L 15 20 L 14 19.8 L 13 23 L 17 23 L 16 19.8 L 15 20 A 1 1 0 0 0 15 15 A 1 1 0 0 0 15 20"
                }
                className={"keyHole"}
              ></path>
              <path
                className="bolt"
                fill={"none"}
                d={"M 20 20 V 8 A 1 1 0 0 0 10 8 V 10"}
              ></path>
            </svg>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

class StdTimeBox extends React.Component {
  state = {
    valueChanged: false,
    value: this.props.value,
    newValue: this.props.value,
  };

  componentDidMount() {
    this.setState({
      newValue: this.props.value,
    });
  }

  onChange = (e) => {
    this.setState({
      newValue: e.target.value,
    });
    this.props.updateValue(e.target.value);
  };

  render() {
    return (
      <div
        className={
          "stdInputGroup d-flex align-items-center" +
          " " +
          (this.state.valueChanged ? "leftBorderRadius" : "borderRadius")
        }
      >
        <input
          className="stdInput"
          type="time"
          ref={this.primaryInput}
          autoComplete={this.props.autoComplete}
          placeholder={""}
          onChange={(e) => this.onChange(e)}
          value={this.state.newValue}
        ></input>
        {this.props.showIndicator ? (
          this.state.editable ? (
            <i className="bi bi-pencil "></i>
          ) : (
            <svg
              className="editLock"
              viewBox="0 0 30 30"
              preserveAspectRatio={"xMidYMid meet"}
            >
              <path
                className={"lockBody"}
                d={
                  "M 10 10 L 20 10 Q 25 10 25 15 V 25 Q 25 30 20 30 H 10 Q 5 30 5 25 V 15 Q 5 10 10 10 H 25 "
                }
              ></path>
              <path
                d={
                  "M 15 20 L 15 20 L 14 19.8 L 13 23 L 17 23 L 16 19.8 L 15 20 A 1 1 0 0 0 15 15 A 1 1 0 0 0 15 20"
                }
                className={"keyHole"}
              ></path>
              <path
                className="bolt"
                fill={"none"}
                d={"M 20 20 V 8 A 1 1 0 0 0 10 8 V 10"}
              ></path>
            </svg>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

class StdDateTimeBox extends React.Component {
  state = {
    valueChanged: false,
    value: this.props.value,
    newValue: this.props.value,
  };

  componentDidMount() {
    this.setState({
      newValue: this.props.value,
    });
  }

  onChange = (e) => {
    this.setState({
      newValue: e.target.value,
    });
    this.props.updateValue(e.target.value);
  };

  render() {
    return (
      <div
        className={
          "stdInputGroup d-flex align-items-center" +
          " " +
          (this.state.valueChanged ? "leftBorderRadius" : "borderRadius")
        }
      >
        <input
          className="stdInput"
          type="datetime-local"
          ref={this.primaryInput}
          autoComplete={this.props.autoComplete}
          placeholder={""}
          onChange={(e) => this.onChange(e)}
          value={this.state.newValue}
        ></input>
        {this.props.showIndicator ? (
          this.state.editable ? (
            <i className="bi bi-pencil "></i>
          ) : (
            <svg
              className="editLock"
              viewBox="0 0 30 30"
              preserveAspectRatio={"xMidYMid meet"}
            >
              <path
                className={"lockBody"}
                d={
                  "M 10 10 L 20 10 Q 25 10 25 15 V 25 Q 25 30 20 30 H 10 Q 5 30 5 25 V 15 Q 5 10 10 10 H 25 "
                }
              ></path>
              <path
                d={
                  "M 15 20 L 15 20 L 14 19.8 L 13 23 L 17 23 L 16 19.8 L 15 20 A 1 1 0 0 0 15 15 A 1 1 0 0 0 15 20"
                }
                className={"keyHole"}
              ></path>
              <path
                className="bolt"
                fill={"none"}
                d={"M 20 20 V 8 A 1 1 0 0 0 10 8 V 10"}
              ></path>
            </svg>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

class StdEmailBox extends React.Component {
  state = {
    valueChanged: false,
    value: this.props.value,
    newValue: this.props.value,
  };

  componentDidMount() {
    this.setState({
      newValue: this.props.value,
    });
  }

  onChange = (e) => {
    this.setState({
      newValue: e.target.value,
    });
    this.props.updateValue(e.target.value);
  };

  render() {
    return (
      <div
        className={
          "stdInputGroup d-flex align-items-center" +
          " " +
          (this.state.valueChanged ? "leftBorderRadius" : "borderRadius")
        }
      >
        <input
          className="stdInput"
          type="email"
          ref={this.primaryInput}
          autoComplete={this.props.autoComplete}
          placeholder={""}
          onChange={(e) => this.onChange(e)}
          value={this.state.newValue}
        ></input>
        {this.props.showIndicator ? (
          this.state.editable ? (
            <i className="bi bi-pencil "></i>
          ) : (
            <svg
              className="editLock"
              viewBox="0 0 30 30"
              preserveAspectRatio={"xMidYMid meet"}
            >
              <path
                className={"lockBody"}
                d={
                  "M 10 10 L 20 10 Q 25 10 25 15 V 25 Q 25 30 20 30 H 10 Q 5 30 5 25 V 15 Q 5 10 10 10 H 25 "
                }
              ></path>
              <path
                d={
                  "M 15 20 L 15 20 L 14 19.8 L 13 23 L 17 23 L 16 19.8 L 15 20 A 1 1 0 0 0 15 15 A 1 1 0 0 0 15 20"
                }
                className={"keyHole"}
              ></path>
              <path
                className="bolt"
                fill={"none"}
                d={"M 20 20 V 8 A 1 1 0 0 0 10 8 V 10"}
              ></path>
            </svg>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

class StdNumberBox extends React.Component {
  state = {
    valueChanged: false,
    value: this.props.value,
    newValue: this.props.value,
  };

  componentDidMount() {
    this.setState({
      newValue: this.props.value,
    });
  }

  onChange = (e) => {
    this.setState({
      newValue: e.target.value,
    });
    this.props.updateValue(e.target.value);
  };

  render() {
    return (
      <div
        className={
          "stdInputGroup d-flex align-items-center" +
          " " +
          (this.state.valueChanged ? "leftBorderRadius" : "borderRadius")
        }
      >
        <input
          className="stdInput"
          type="number"
          ref={this.primaryInput}
          autoComplete={this.props.autoComplete}
          placeholder={""}
          onChange={(e) => this.onChange(e)}
          value={this.state.newValue}
          min = {this.props.min}
          max = {this.props.max}
        ></input>
        {this.props.showIndicator ? (
          this.state.editable ? (
            <i className="bi bi-pencil "></i>
          ) : (
            <svg
              className="editLock"
              viewBox="0 0 30 30"
              preserveAspectRatio={"xMidYMid meet"}
            >
              <path
                className={"lockBody"}
                d={
                  "M 10 10 L 20 10 Q 25 10 25 15 V 25 Q 25 30 20 30 H 10 Q 5 30 5 25 V 15 Q 5 10 10 10 H 25 "
                }
              ></path>
              <path
                d={
                  "M 15 20 L 15 20 L 14 19.8 L 13 23 L 17 23 L 16 19.8 L 15 20 A 1 1 0 0 0 15 15 A 1 1 0 0 0 15 20"
                }
                className={"keyHole"}
              ></path>
              <path
                className="bolt"
                fill={"none"}
                d={"M 20 20 V 8 A 1 1 0 0 0 10 8 V 10"}
              ></path>
            </svg>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

class StdDropDownBox extends React.Component {
  state = {
    valueChanged: false,
    value: this.props.value,
    newValue: this.props.value ? this.props.options.find((option) => option.value === this.props.value).label : "",
    options: this.props.options? this.props.options : [],
  };

  componentDidMount() {
    this.setState({
      newValue: this.props.value ? this.props.options.find((option) => option.value === this.props.value).label : "",
    });
  }

  onChange = (e) => {
    this.setState({
      newValue: e.target.value,
    });
    this.props.updateValue(e.target.value);
  };

  dropdownSelect = (option) =>{
    this.setState({
      newValue: option.label,
    });
    this.props.updateValue(option.value);
  }
  render() {
    return (
      <div
        className={
          "stdInputGroup d-flex align-items-center" +
          " " +
          (this.state.valueChanged ? "leftBorderRadius" : "borderRadius")
        }
      >
        <input
          className="stdInput dropdown"
          type="dropdown"
          ref={this.primaryInput}
          autoComplete={this.props.autoComplete}
          placeholder={""}
          onChange={(e) => this.onChange(e)}
          value={this.state.newValue}
        ></input>
        <div className="dropdownWrapper">
          <div className="dropdown">
          {this.props.options.map((option,index) => {
            return <div className="dropdownOptions" key={index} onClick ={()=>this.dropdownSelect(option)}>{option.label}</div>;
          })}
          </div>
        </div>
        {this.props.showIndicator ? (
          this.state.editable ? (
            <i className="bi bi-pencil "></i>
          ) : (
            <svg
              className="editLock"
              viewBox="0 0 30 30"
              preserveAspectRatio={"xMidYMid meet"}
            >
              <path
                className={"lockBody"}
                d={
                  "M 10 10 L 20 10 Q 25 10 25 15 V 25 Q 25 30 20 30 H 10 Q 5 30 5 25 V 15 Q 5 10 10 10 H 25 "
                }
              ></path>
              <path
                d={
                  "M 15 20 L 15 20 L 14 19.8 L 13 23 L 17 23 L 16 19.8 L 15 20 A 1 1 0 0 0 15 15 A 1 1 0 0 0 15 20"
                }
                className={"keyHole"}
              ></path>
              <path
                className="bolt"
                fill={"none"}
                d={"M 20 20 V 8 A 1 1 0 0 0 10 8 V 10"}
              ></path>
            </svg>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

class StdMultiSelect extends React.Component {
  state = {
    valueChanged: false,
    value: this.props.value,
    newValue: this.props.value.length > 0 ? this.props.options.find((option) => option.value === this.props.value).label : [],
    options: this.props.options? this.props.options : [],
  };

  componentDidMount() {
    this.setState({
      newValue: this.props.value > 0 ? this.props.options.find((option) => option.value === this.props.value).label : [],
    });
  }

  onChange = (e) => {
    this.setState({
      newValue: e.target.value,
    });
    this.props.updateValue(e.target.value);
  };

  dropdownSelect = (option) =>{
    let selected = this.props.value;
    let selectedDisplay = this.props.value.map(selected =>  selected.label);
    if(selected.includes(option)){
      selected = selected.filter((value) => value.value !== option.value);
      selectedDisplay = selected.map(select => select.label);
    }else{
      selected.push(option);
      selectedDisplay.push(option.label);
    }
    
    console.log(selected);
    console.log(selectedDisplay);
    this.setState({
      newValue: selectedDisplay,
    });
    this.props.updateValue(selected);
  }
  render() {
    return (
      <div
        className={
          "stdInputGroup d-flex align-items-center" +
          " " +
          (this.state.valueChanged ? "leftBorderRadius" : "borderRadius")
        }
      >
        <input
          className="stdInput dropdown"
          type="dropdown"
          ref={this.primaryInput}
          autoComplete={this.props.autoComplete}
          placeholder={""}
          onChange={(e) => this.onChange(e)}
          value={this.state.newValue}
        ></input>
        <div className="dropdownWrapper">
          <div className="dropdown">
          {this.props.options.map((option,index) => {
            return <div className={"dropdownOptions " + (this.state.newValue.includes(option.label) ? "active" : "")} key={index} onClick ={()=>this.dropdownSelect(option)}>
              {option.label}
              </div>;
          })}
          </div>
        </div>
        {this.props.showIndicator ? (
          this.state.editable ? (
            <i className="bi bi-pencil "></i>
          ) : (
            <svg
              className="editLock"
              viewBox="0 0 30 30"
              preserveAspectRatio={"xMidYMid meet"}
            >
              <path
                className={"lockBody"}
                d={
                  "M 10 10 L 20 10 Q 25 10 25 15 V 25 Q 25 30 20 30 H 10 Q 5 30 5 25 V 15 Q 5 10 10 10 H 25 "
                }
              ></path>
              <path
                d={
                  "M 15 20 L 15 20 L 14 19.8 L 13 23 L 17 23 L 16 19.8 L 15 20 A 1 1 0 0 0 15 15 A 1 1 0 0 0 15 20"
                }
                className={"keyHole"}
              ></path>
              <path
                className="bolt"
                fill={"none"}
                d={"M 20 20 V 8 A 1 1 0 0 0 10 8 V 10"}
              ></path>
            </svg>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}
