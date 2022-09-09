import React from "react";
import { InputField } from "../Components/formElements";

export default class Register extends React.Component {
    render() {
        return (
            <div className="col-10 d-flex p-2">
                <form action="/attemptRegister" method="POST">
                    <InputField id="Username" title="Username"></InputField>
                    <InputField id="Password" title="Password"></InputField>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
