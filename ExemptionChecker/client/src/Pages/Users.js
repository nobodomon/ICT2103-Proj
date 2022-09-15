
import React from "react"
import { ListMapper } from "../Components/common"
import DatapageLayout from "./PageLayout"
import { CourseSkills } from "./UniversityCourses"

export default class Users extends React.Component {
    state={
        content:null,
        headers:[],
        loading:true,
        settings: {},
        error: "",
    }

    settings ={
        title:"Users",
        primaryColor: "#48a1da",
        accentColor: "#8fc140",
        textColor: "#ffffff",
        textColorInvert: "#606060",
        api: "/users/",
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
        return fetch( this.settings.api + "allUsers" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
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
            console.log(content);
            if(content.success){
                this.setState({
                    error:"",
                })
                return true;
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
                error={this.state.error}>
                {this.state.content.data.map((item, index) => {
                    return <div>
                        <UserSkillMapper
                            key={index + "user"}
                            uid={item.uid}/>
                        <CourseSkills
                            key={index + "course"}
                            cid={item.universityCourse}/>
                        </div>
                })}
            </DatapageLayout>
            
            )
        }
    }
}

class UserSkillMapper extends React.Component {
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
        return fetch( "/skills/allSkills" , {
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
        return fetch( "/skills/settings" , {
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
        return fetch( "/userSkillMap/settings" , {
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
        return fetch( "/userSkillMap/allMapsFromUser" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userID: this.props.uid}),
        }).then(res => {
            console.log(res);
            return res.json();
        })
    }

    addLink = async (data) =>{
        console.log(data);
        return fetch("/userSkillMap/create" , {
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
        return fetch("/userSkillMap/delete" , {
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
        
            <ListMapper title={"This user possesses these skills"} requestRefresh={this.requestRefresh} currItemID={this.props.uid} addLink={this.addLink} settings={this.state.settings} deleteLink={this.deleteLink} headers={this.state.contentSettings.settings.fieldSettings} data={this.state.content.data} currentMap={this.state.currentMap.data}>
                
            </ListMapper>
        )
    }
}