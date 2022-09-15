
import React from "react"
import { ListMapperView } from "../Components/common"
import DatapageLayout from "./PageLayout"

export default class UniversityCourses extends React.Component {
    state={
        content:null,
        headers:[],
        loading:true,
        settings: {},
        error: "",
    }

    settings ={
        title:"University Courses",
        primaryColor: "#48a1da",
        accentColor: "#8fc140",
        textColor: "#ffffff",
        textColorInvert: "#606060",
        api: "/universityCourses/",
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
        return fetch( this.settings.api + "allCourses" , {
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
                        <CourseSkills
                            key={index + "course"}
                            cid={item.cid}/>
                        </div>
                })}
            </DatapageLayout>
            
            )
        }
    }
}
export class CourseSkills extends React.Component{
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
                content:content.data,
            });
        })

        await this.getSettings().then((settings)=>{
            console.log(settings);
            this.setState({
                settings:settings.settings,
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
                content:content.data,
            });
        })
        
        await this.getSettings().then((settings)=>{
            console.log(settings);
            this.setState({
                settings:settings.settings,
            })
        })
        this.setState({
            loading:false,
        })
    }
    
    getContent = () =>{
        return fetch( "/skills/allSkillsFromUniversityCourse" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({courseID: this.props.cid}),
        }).then(res => {
            console.log(res);
            return res.json();
        })
    }

    getSettings = async () =>{
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


    addLink = async (data) =>{

    }

    deleteLink = async (data) =>{
    }


    render(){
        
        return(
            this.state.loading? <div>Loading</div>:
        
            <ListMapperView 
            title={"Skills this course requires"} 
            requestRefresh={this.requestRefresh} 
            addLink={this.addLink} 
            settings={this.state.settings} 
            deleteLink={this.deleteLink} 
            headers={this.state.settings.listViewSettings["UniversityCourseSkills"].fieldSettings} 
            data={this.state.content}>
            </ListMapperView>
        )
    } 
}