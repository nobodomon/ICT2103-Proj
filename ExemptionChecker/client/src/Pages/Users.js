
import React from "react"
import DatapageLayout from "./PageLayout"

export default class Users extends React.Component {
    state={
        content:null,
        headers:[],
        loading:true,
        settings: {},
    }
    async componentDidMount(){
        document.title = "USERS";
        await this.getContent().then((content)=>{
            this.setState({
                content:content,
                headers:Object.keys(content.userData[0]),
            });
        })

        await this.getSettings().then((settings)=>{
            console.log(settings);
            this.setState({
                settings:settings.settings,
            });
        })

        this.setState({
            loading:false,
        })
    }

    getSettings = async () => {
        return fetch("/users/settings" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
            return res.json();
        })
    }

    getContent = async () =>{
        return fetch("/users/allUsers" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
            return res.json();
        });
    }

    render(){
        if(this.state.loading){
            return <div>Loading</div>
        }else{
            
        return(
            <DatapageLayout 
                fieldSettings={this.state.settings.fieldSettings} 
                headers={this.state.settings.columnSettings.headers} 
                data={this.state.content.userData}>
            </DatapageLayout>
            
            )
        }
    }
}