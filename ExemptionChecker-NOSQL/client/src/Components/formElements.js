import React from "react";

export class InputField extends React.Component {
    render() {
        return(
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">{this.props.title}</span>
                </div>
                <input type="text" className="form-control" onChange={this.props.onChange} placeholder={this.props.title} id={this.props.id} name={this.props.id}></input>
            </div>
        )
    }
}