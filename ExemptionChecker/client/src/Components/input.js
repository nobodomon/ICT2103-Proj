import e from "cors";
import React from "react";

export class StdInput extends React.Component{
    state ={
        enabled: this.props.enabled,
        value: this.props.value,
        newValue: this.props.value,
        valueChanged: false,
    }
    componentDidMount(){
        this.setState({
            enabled: this.props.enabled? this.props.enabled : false,
        })
    }

    updateValue = (value) => {
        this.setState({
            newValue: value,
            valueChanged: value != this.state.value ? true : false
        })
        console.log(this.props.label,value);
        
        if(!this.props.hasSaveBtn){
            this.props.onChange(this.props.label, value);
        }
    }

    toggleEdit = () =>{
        if(this.props.enabled){
            this.setState({
                enabled: !this.state.enabled
            });
        }else{
            this.setState({
                enabled: false,
            })
        }
    }

    handleSave = (value) => {
        this.setState({
            value: value,
            valueChanged:false,
        })
        this.props.onChange(this.props.label, value)
    }

    render(){
        if(this.state.enabled){
            return(
                <div className={"inputBox " + (this.props.sameLine ? "same-line" : "")}>
                <div className="inputBox-Label">{this.props.label}</div>
                {this.props.type ==="text" && 
                    <StdTextBox updateValue={this.updateValue} value={this.state.newValue}></StdTextBox>
                }
                {this.props.type ==="password" &&
                    <StdTextBox updateValue={this.updateValue} value={this.state.newValue}></StdTextBox>
                }
                {this.props.type === "email" &&
                    <StdTextBox updateValue={this.updateValue} value={this.state.newValue}></StdTextBox>
                }
                {this.props.type === "number" && 
                    <StdTextBox updateValue={this.updateValue} value={this.state.newValue}></StdTextBox>
                }
                {this.props.type === "time" && 
                    <StdTextBox updateValue={this.updateValue} value={this.state.newValue}></StdTextBox>
                }
                {this.props.type === "date" &&
                    <StdTextBox updateValue={this.updateValue} value={this.state.newValue}></StdTextBox>
                }
                {this.props.type === "dropdown" &&
                    <StdTextBox updateValue={this.updateValue} value={this.state.newValue}></StdTextBox>
                }
                

                {this.props.hasSaveBtn && this.state.valueChanged &&
                    <div className="inputSave" onClick={() => { this.handleSave(this.state.newValue) }}><i class="bi bi-check-circle"></i></div>
                }
                <div className={this.state.feedbackClass} onAnimationEnd={this.reset}>
                    {this.state.feedback}
                </div>
                </div>
            )
        }else{
            return <div onClick={this.toggleEdit} className={"inputBox disabled"}>
                <div className="inputBox-Label">{this.props.label}</div>
                <div className="read-only">{this.props.value}</div>

                {this.props.showIndicator &&
                    <i className="bi bi-pencil "></i>
                }
            </div>
        }
    }
}
StdInput.defaultProps = {
    type: "text",
    enabled: false,
}

class StdTextBox extends React.Component{
    state={
        valueChanged:false,
        value:this.props.value,
        newValue: this.props.value,
    }

    componentDidMount(){
        this.setState({
            newValue:  this.props.value
        })
    }

    onChange = (e) => {
        this.setState({
            newValue: e.target.value,
        });
        this.props.updateValue(e.target.value);
    }


    render(){
        return(
            <div className={"stdInputGroup d-flex align-items-center" + " " + (this.state.valueChanged ? "leftBorderRadius" : "borderRadius")} >
                    <input className="stdInput" 
                        type="text"
                        ref={this.primaryInput} 
                        autoComplete={this.props.autoComplete} 
                        placeholder={""} 
                        onChange={(e) => this.onChange(e)}
                        value={this.state.newValue}>
                    </input>
                    {this.props.showIndicator ?
                        this.state.editable ?
                            <i className="bi bi-pencil "></i> :
                            <svg className="editLock" viewBox="0 0 30 30" preserveAspectRatio={"xMidYMid meet"}>
                                <path className={"lockBody"} d={"M 10 10 L 20 10 Q 25 10 25 15 V 25 Q 25 30 20 30 H 10 Q 5 30 5 25 V 15 Q 5 10 10 10 H 25 "}>
                                </path>
                                <path d={"M 15 20 L 15 20 L 14 19.8 L 13 23 L 17 23 L 16 19.8 L 15 20 A 1 1 0 0 0 15 15 A 1 1 0 0 0 15 20"} className={"keyHole"}></path>
                                <path className="bolt" fill={"none"} d={"M 20 20 V 8 A 1 1 0 0 0 10 8 V 10"}>

                                </path>
                            </svg> : ""
                    }
            </div>
        )
    }
}