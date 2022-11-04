import React from "react";
import { AppPageContainer,Loading } from "../../Components/appCommon";
import "../../styles/user.scss";

import placeholderImg from "../../Assets/placeholderUser.png";
import { StdInput } from "../../Components/input";


export default class Landing extends React.Component{

    state ={
        polyCourses: [],
        uniCourses: [],
        loading:true,
    }

    componentDidMount = async() =>{

        var dataToPush = {};
        Object.keys(this.props.user.data[0]).map((item) => {
            var temp = {[item]: this.props.user.data[0][item]};
            dataToPush = {...dataToPush, ...temp};
        });

        await this.getSkills().then((skills) =>{
            this.setState({
                skills: skills.data
            })
        });

        await this.getPolytechnicCourses().then((courses) =>{
            var courseList = [];
            courses.data.map((course) =>{
                console.log(course);
                var courseTemp = {value: course.cid, label: course.courseCode + " " + course.courseName};
                return courseList.push(courseTemp);
            });
            this.setState({
                polyCourses: courseList
            })
        });

        await this.getUniversityCourses().then((courses) =>{
            var courseList = [];
            courses.data.map((course) =>{
                console.log(course);
                var courseTemp = {value: course.cid, label: course.courseCode + " " + course.courseName};
                return courseList.push(courseTemp);
            });
            this.setState({
                uniCourses: courseList
            })
        });

        this.setState({
            dataToPush: dataToPush,
            loading: false
        })
    }

    getSkills = async() => {
        return await fetch(
            "/skills/allSkillsFromPolytechnicCourse",
            {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    courseID: this.props.user.data[0].polytechnicCourse
                }),
            }
        ).then((res) => {
            return res.json()
        })
    }

    getPolytechnicCourses = async() =>{
        return await fetch(
            "/polytechnicCourses/allCourses",
            {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((res) => {
            return res.json()
        })
    }
    
    getUniversityCourses = async() =>{
        return await fetch(
            "/universityCourses/allCourses",
            {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((res) => {
            return res.json()
        })
    }

    getUserInfo = async() =>{
        return await fetch(
            "/users/getUserByID",
            {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid: this.props.user.data[0].uid
                }),
            }
            
        ).then((res) => {
            return res.json()
        })
    }

    handleOnChange = async (field, value) =>{
        var temp = this.state.dataToPush;
        temp[field] = value;
        this.setState({
            dataToPush: temp
        })

        await this.update().then((result) =>{
            console.log(result);
            this.getUserInfo().then((result) =>{
                console.log(result);
                this.props.updateUser(result);
            })
            return result.success;
        })
    }

    update = async()=>{
        console.log(this.state.dataToPush);
        return await fetch(
            "/users/update",
            {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.state.dataToPush),
            }
        ).then((res) => {
            return res.json()
        })
    }

    render(){
        return(
            this.state.loading? 
            <Loading></Loading>
            :
            <AppPageContainer>
                <div className="landing-container">
                    <div className="profile">
                        <div className="profile-image">
                            <img src={placeholderImg} alt="profile"/>
                        </div>
                        <span className="d-name">Name: <span>{this.props.user.data[0].username}</span></span>
                        <StdInput 
                            type="dropdown" options={this.state.polyCourses}
                            label="Polytechnic Course"
                            enabled={true}
                            hasSaveBtn ={true}
                            value={this.props.user.data[0].polytechnicCourse}
                            onChange={this.handleOnChange}     
                            fieldLabel={"polytechnicCourse"}
                        >

                        </StdInput>
                        <StdInput 
                            type="dropdown" 
                            options={this.state.uniCourses}
                            label="University Course"
                            enabled={true}
                            value={this.props.user.data[0].universityCourse}
                            onChange={this.handleOnChange}     
                            fieldLabel={"universityCourse"}
                        >
                        </StdInput>
                        <SkillContainer skills={this.state.skills}></SkillContainer>
                    </div>
                    <div className="header">
                        <h1>Welcome {this.props.user.data[0].username}</h1>
                    </div>
                    <div className="content">
                        <UniversityModules skills={this.state.skills} user={this.props.user}></UniversityModules>
                    </div>
                </div>
            </AppPageContainer>
        )
    }
}

export class SkillContainer extends React.Component{
    render(){
        return(
            <div className="skill-container">
                <span className="skill-container-header">Skills:</span>
                <div className="skill-list">
                    
                {this.props.skills.map((skill) =>{
                    return <SkillCard skill={skill}></SkillCard>
                })} 
                </div>
            </div>
        )
    }
}

export class SkillCard extends React.Component{
    render(){
        return(
            <div className="skill-card">
                {this.props.skill.skill}
            </div>
        )
    }
}

export class UniversityModules extends React.Component{
    state={
        modules: [],
        loading: true
    }
    componentDidMount = async() =>{
        await this.getModules().then((result) =>{
            console.log(result);
            this.setState({
                modules: result.data,
            })
        })

        this.setState({
            loading: false
        })
    }

    getModules = async() =>{
        return await fetch(
            "/universityModuleCourseMap/allModulesForCourse",
            {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    universityCourse: this.props.user.data[0].universityCourse
                })
            }
        ).then((res) => {
            return res.json()
        })
    }

    render(){
        return(
            <div className="university-modules">
                <span className="university-modules-header">University Modules</span>
                <div className="module-list">
                    {this.state.modules.map((module) =>{
                        return <ModuleCard skills={this.props.skills} module={module}></ModuleCard>
                    })}
                </div>
            </div>
        )
    }
}

export class ModuleCard extends React.Component{

    state= {
        loading: true,
        skillsRequired: []
    }

    componentDidMount = async() => {
        var tempSkillsRequired = [];
        await this.getSkillsRequired().then((result) =>{
            console.log(result);

            result.data.map((skill) =>
            
                tempSkillsRequired.push(skill.sid)
            );
            this.setState({
                skillsRequired: result.data
            })
        })

        
        var tempSkills = [];
        this.props.skills.map((skill) =>{
            tempSkills.push(skill.sid);
        })

        const intersect = tempSkills.filter(x => tempSkillsRequired.includes(x));


        console.log(tempSkillsRequired);
        console.log(tempSkills);

        console.log(intersect);
        

        this.setState({
            confidence: intersect.length / tempSkillsRequired.length * 100,
            loading: false
        })
    }

    getSkillsRequired = async() =>{
        return await fetch(
            "/skillUniversityModuleMap/allMapsFromModule",
            {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    moduleID: this.props.module.mid
                })
            }
        ).then((res) => {
            return res.json()
        })
    }

    render(){
        return(
            <div className="module-container">
                
                <div className="module-card">
                    <span>
                        {this.props.module.moduleCode + " " + this.props.module.moduleName}
                    </span>
                    <div className="skill-section">
                        <span className="skill-section-header">Skills Required:</span>
                        <div className="skill-list">
                            {this.state.skillsRequired.map((skill) =>{
                                return <SkillCard skill={skill}></SkillCard>
                            })}
                        </div>
                    </div>
                </div>

                <div className="confidence">
                    <svg viewbox="0 0 100 100">
                        <path class="grey" d="M40,90
                                A40,40 0 1,1 60,90"
                                style={{fill:"none"}}/>
                        <path class="purple" d="M40,90
                                A40,40 0 1,1 60,90"
                            style={{fill:"none", "--confidenceVal": this.state.confidence}}/>
                    </svg>
                    <span className="confidence-value">
                    {this.state.confidence + "%"}</span>
                </div>
            </div>
        )
    }
}
