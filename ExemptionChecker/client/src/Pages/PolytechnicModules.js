
import React from "react"
import { ListMapper } from "../Components/common"
import DatapageLayout from "./PageLayout"

export default class PolytechnicModules extends React.Component {
    state={
        content:[],
        headers:[],
        loading:true,
        settings: {},
        error: "",
    }

    settings ={
        title:"Polytechnic Modules",
        primaryColor: "#48a1da",
        accentColor: "#8fc140",
        textColor: "#ffffff",
        textColorInvert: "#606060",
        api: "/polytechnicModules/",
    }

    async componentDidMount(){
        await this.getContent().then((content)=>{
            console.log(content);
            this.setState({
                content:content,
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
        return fetch(this.settings.api + "settings" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.props.user.data[0]),
        }).then(res => {
            console.log(res);
            return res.json();
        })
    }

    getContent = async () =>{
        return fetch( this.settings.api + "allModules" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
            console.log(res);
            return res.json();
        });
    }

    update = async (data) =>{
        console.log(data);
        return fetch(this.settings.api + "update" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(async res => {
            return res.json();
        });
    }

    handleUpdate = async (data) =>{
        await this.update(data).then((content)=>{
            if(content.success){
                this.requestRefresh();
            }else{
                this.setState({
                    error:content.message,
                })
                return false;
            }
        })
    }

    requestRefresh = async () =>{
        this.setState({
            loading:true,
        })
        await this.getContent().then((content)=>{
            console.log(content);
            this.setState({
                content:content,
                loading:false,
            });
        })
    }

    render(){
        if(this.state.loading){
            return <div>Loading</div>
        }else{
            
        return(
            <DatapageLayout 
                settings={this.settings}
                fieldSettings={this.state.settings.fieldSettings} 
                headers={this.state.settings.columnSettings.headers} 
                data={this.state.content.data}
                updateHandle = {this.handleUpdate}
                requestRefresh = {this.requestRefresh}
                error = {this.state.error}>
                {this.state.content.data.map((item, index) => {
                    return <ModuleToCourseMapper 
                    key={index}  
                    mid={item.mid}/>
                })}
            </DatapageLayout>
            
            )
        }
    }
}


export class ModuleToCourseMapper extends React.Component{
    state = {
        content: [],
        currentMap : [],
        loading: true,
    }

    async componentDidMount(){
        await this.getContent().then((content)=>{
            console.log(content);
            this.setState({
                content:content,
            })
        }) 

        await this.getContentSettings().then((settings)=>{
            console.log(settings);
            this.setState({
                contentSettings:settings,
            })
        })


        await this.getCurrentMap().then((content)=>{
            console.log(content);
            this.setState({
                currentMap:content,
            })
        })

        this.setState({
            
            loading: false,
        })
    }

    getContent = async () =>{
        return fetch( "/PolytechnicCourses/allCourses" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
            console.log(res);
            return res.json();
        });
    }

    getContentSettings = async () =>{
        return fetch( "/PolytechnicCourses/settings" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
            console.log(res);
            return res.json();
        });
    }

    getCurrentMap = () =>{
        return fetch( "/PolytechnicModules/getModule" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({mid: this.props.mid}),
        }).then(res => {
            console.log(res);
            return res.json();
        })
    }

    addLink = async (data) =>{
        return fetch("/PolytechnicModules/addCourseToModule" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(async res => {
            return res.json();
        });
    }

    render(){
        
        return(
            this.state.loading? <div>Loading</div>:
        
            <ListMapper headers={this.state.contentSettings.settings.fieldSettings} data={this.state.content.data} currentMap={this.state.currentMap.data}>
                
            </ListMapper>
        )
    }

    
}