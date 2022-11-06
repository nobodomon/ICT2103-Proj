
import React from "react"
import { ListMapper } from "../Components/common"
import DatapageLayout from "./PageLayout"

export default class Skills extends React.Component {
    state={
        content:null,
        headers:[],
        loading:true,
        settings: {},
        error: "",
    }

    settings ={
        title:"Skills",
        primaryColor: "#48a1da",
        accentColor: "#8fc140",
        textColor: "#ffffff",
        textColorInvert: "#606060",
        api: "/skills/",
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
        return fetch( this.settings.api + "allSkills" , {
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
                    return <div>
                        <SkillPolytechnicModuleMapper 
                            key={index + "polytechnic"}  
                            sid={item.sid}/>
                        <SkillUniversityModuleMapper
                            key={index + "university"}
                            sid={item.sid}/>
                        </div>
                })}
            </DatapageLayout>
            
            )
        }
    }
}


export class SkillPolytechnicModuleMapper extends React.Component{
    state = {
        content: [],
        currentMap : [],
        contentSettings: {},
        loading: true,
        settings: {},
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

        await this.getSettings().then((settings)=>{
            console.log(settings);
            this.setState({
                settings:settings.settings,
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

    requestRefresh = async () =>{
        this.setState({
            loading:true,
        })
        await this.getContent().then((content)=>{
            console.log(content);
            this.setState({
                content:content,
            });
        })
        await this.getContentSettings().then((settings)=>{
            console.log(settings);
            this.setState({
                contentSettings:settings,
            })
        })
        await this.getSettings().then((settings)=>{
            console.log(settings);
            this.setState({
                settings:settings.settings,
            })
        })
        await this.getCurrentMap().then((content)=>{
            console.log(content);
            this.setState({
                currentMap:content,
            })
        })
        this.setState({
            loading:false,
        })
    }

    getContent = async () =>{
        return fetch( "/PolytechnicModules/allModules" , {
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
        return fetch( "/PolytechnicModules/settings" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
            console.log(res);
            return res.json();
        });
    }

    getSettings = async () =>{
        return fetch( "/skillPolytechnicModuleMap/settings" , {
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
        return fetch( "/skillPolytechnicModuleMap/allMapsFromSkill" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({skillID: this.props.sid}),
        }).then(res => {
            console.log(res);
            return res.json();
        })
    }

    addLink = async (data) =>{
        console.log(data);
        return fetch("/skillPolytechnicModuleMap/create" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(async res => {
            return res.json();
        });
    }

    deleteLink = async (data) =>{
        console.log(data);
        return fetch("/skillPolytechnicModuleMap/delete" , {
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
        
            <ListMapper title={"Polytechnic Modules this skill belongs to"} requestRefresh={this.requestRefresh} currItemID={this.props.sid} addLink={this.addLink} settings={this.state.settings} deleteLink={this.deleteLink} headers={this.state.contentSettings.settings.fieldSettings} data={this.state.content.data} currentMap={this.state.currentMap.data}>
                
            </ListMapper>
        )
    }
}

export class SkillUniversityModuleMapper extends React.Component{
    state = {
        content: [],
        currentMap : [],
        contentSettings: {},
        loading: true,
        settings: {},
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

        await this.getSettings().then((settings)=>{
            console.log(settings);
            this.setState({
                settings:settings.settings,
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

    requestRefresh = async () =>{
        this.setState({
            loading:true,
        })
        await this.getContent().then((content)=>{
            console.log(content);
            this.setState({
                content:content,
            });
        })
        await this.getContentSettings().then((settings)=>{
            console.log(settings);
            this.setState({
                contentSettings:settings,
            })
        })
        await this.getSettings().then((settings)=>{
            console.log(settings);
            this.setState({
                settings:settings.settings,
            })
        })
        await this.getCurrentMap().then((content)=>{
            console.log(content);
            this.setState({
                currentMap:content,
            })
        })
        this.setState({
            loading:false,
        })
    }

    getContent = async () =>{
        return fetch( "/UniversityModules/allModules" , {
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
        return fetch( "/UniversityModules/settings" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
            console.log(res);
            return res.json();
        });
    }

    getSettings = async () =>{
        return fetch( "/skillUniversityModuleMap/settings" , {
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
        return fetch( "/skillUniversityModuleMap/allMapsFromSkill" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({skillID: this.props.sid}),
        }).then(res => {
            console.log(res);
            return res.json();
        })
    }

    addLink = async (data) =>{
        console.log(data);
        return fetch("/skillUniversityModuleMap/create" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(async res => {
            return res.json();
        });
    }

    deleteLink = async (data) =>{
        console.log(data);
        return fetch("/skillUniversityModuleMap/delete" , {
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
        
            <ListMapper title={"University Modules that requires this skill"} requestRefresh={this.requestRefresh} currItemID={this.props.sid} addLink={this.addLink} settings={this.state.settings} deleteLink={this.deleteLink} headers={this.state.contentSettings.settings.fieldSettings} data={this.state.content.data} currentMap={this.state.currentMap.data}>
                
            </ListMapper>
        )
    }
}

