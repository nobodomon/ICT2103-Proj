import React from "react";
import { AppPageContainer,Loading } from "../../Components/appCommon";
import "../../styles/user.scss";

import placeholderImg from "../../Assets/placeholderUser.png";
import { StdInput } from "../../Components/input";
import { MultiStepBox } from "../../Components/common";


export default class Landing extends React.Component{

    state ={
        polyCourses: [],
        uniCourses: [],
        skillOption: [],
        loading:true,
    }

    componentDidMount = async() =>{

        var dataToPush = {};
        Object.keys(this.props.user.data[0]).map((item) => {
            var temp = {[item]: this.props.user.data[0][item]};
            dataToPush = {...dataToPush, ...temp};
        });

        var skillOptions = [];

        await this.getAllSkills().then((skills) => {
            skills.data.map((item) => {
                skillOptions.push({label: item.skill, value: item.sid});
            });


            this.setState({skillOption: skillOptions});
        });

        await this.getSkills().then((skills) =>{
            this.setState({
                skills: skills.data
            })
        });

        await this.getUserSkills().then((userSkills) =>{
            var temp = new Set(this.state.skills.map(skill => skill.sid));
            var user = userSkills.data;
            user.map((item)=> Object.assign(item,{editable: true}));
            var tempList = [...this.state.skills, ...user.filter(skill => !temp.has(skill.sid))];
            this.setState({
                skills: tempList
            })
        })

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

    getUserSkills = async() =>{
        return await fetch(
            "/skills/allSKillFromUser",
            {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID: this.props.user.data[0].uid
                }),
            }
        ).then((res) => {
            return res.json()
        })
    }

    getAllSkills = async() =>{
        return await fetch(
            "/skills/allSkills",
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

    handleAddSkill = async (field, value) =>{
        await this.addSkill(this.props.user.data[0].uid, value).then( async(result) =>{
            console.log(result);
            this.getUserInfo().then((result) =>{
                console.log(result);
                this.props.updateUser(result);
            })
            

            var skillOptions = [];

            await this.getAllSkills().then((skills) => {
                skills.data.map((item) => {
                    skillOptions.push({label: item.skill, value: item.sid});
                });


                this.setState({skillOption: skillOptions});
            });

            await this.getSkills().then((skills) =>{
                this.setState({
                    skills: skills.data
                })
            });

            await this.getUserSkills().then((userSkills) =>{
                var temp = new Set(this.state.skills.map(skill => skill.sid));
                var user = userSkills.data;
                user.map((item)=> Object.assign(item,{editable: true}));
                var tempList = [...this.state.skills, ...user.filter(skill => !temp.has(skill.sid))];
                this.setState({
                    skills: tempList
                })
            })
            return result.success;
        })
    }

    handleDeleteSkill = async (value) =>{
        await this.deleteSkill(this.props.user.data[0].uid, value).then(async (result) =>{
            console.log(result);
            this.getUserInfo().then((result) =>{
                console.log(result);
                this.props.updateUser(result);
            })
            

            var skillOptions = [];

            await this.getAllSkills().then((skills) => {
                skills.data.map((item) => {
                    skillOptions.push({label: item.skill, value: item.sid});
                });


                this.setState({skillOption: skillOptions});
            });

            await this.getSkills().then((skills) =>{
                this.setState({
                    skills: skills.data
                })
            });

            await this.getUserSkills().then((userSkills) =>{
                var temp = new Set(this.state.skills.map(skill => skill.sid));
                var user = userSkills.data;
                user.map((item)=> Object.assign(item,{editable: true}));
                var tempList = [...this.state.skills, ...user.filter(skill => !temp.has(skill.sid))];
                this.setState({
                    skills: tempList
                })
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

    addSkill = async(uid,sid) =>{
        return await fetch(
            "/userSkillMap/create",
            {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID: uid,
                    skillID: sid
                }),
            }
        ).then((res) => {
            return res.json()
        })
    }

    deleteSkill = async(uid,sid) =>{
        return await fetch(
            "/userSkillMap/delete",
            {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID: uid,
                    skillID: sid
                }),
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
                            hasSaveBtn ={true}
                            value={this.props.user.data[0].universityCourse}
                            onChange={this.handleOnChange}     
                            fieldLabel={"universityCourse"}
                        >
                        </StdInput>

                        
                        <StdInput 
                            type="dropdown" 
                            options={this.state.skillOption}
                            label="Add Skills"
                            enabled={true}
                            hasSaveBtn ={true}
                            onChange={this.handleAddSkill}     
                            fieldLabel={"universityCourse"}
                        >
                        </StdInput>


                        <SkillContainer deleteSkill={this.handleDeleteSkill} skills={this.state.skills}></SkillContainer>
                    </div>
                    <div className="header">
                        <h1>Welcome, {this.props.user.data[0].username}</h1>
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
                    return <SkillCard skill={skill} deleteSkill={this.props.deleteSkill}></SkillCard>
                })} 
                </div>
            </div>
        )
    }
}

export class SkillCard extends React.Component{
    render(){
        return(
            <div className="skill-card" >
                {this.props.skill.skill}
                {this.props.skill.editable && 
                <i className="bi bi-x-circle-fill" onClick={this.props.skill.editable? ()=>{this.props.deleteSkill(this.props.skill.sid)}:()=>{}}></i>
                }
            </div>
        )
    }
}

export class UniversityModules extends React.Component{
    state={
        modules: [],
        loading: true,
        currentStep: 0
    }

    steps = [
        {0: "YEAR 1"},
        {1: "YEAR 2"},
        {2: "YEAR 3"},
    ]
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
                <div className="university-year-tabs">
                    <div className={"tab " + (this.state.currentStep === 0 ? "active": "")} onClick={()=>{this.setState({
                        currentStep: 0
                    })}}>
                        Year 1
                    </div>
                    <div className={"tab " + (this.state.currentStep === 1 ? "active": "")} onClick={()=>{this.setState({
                        currentStep: 1
                    })}}>
                        Year 2
                    </div>
                    <div  className={"tab " + (this.state.currentStep == 2 ? "active": "")} onClick={()=>{this.setState({
                        currentStep: 2
                    })}}>
                        Year 3
                    </div>
                </div>
                <div className="module-list">
                    <MultiStepBox steps = {this.steps} currentStep = {this.state.currentStep}>
                        <div className="module-year-list">
                            {this.state.modules.filter((module) => module.yearOffered === "YEAR 1").map((module) =>{
                                return <ModuleCard skills={this.props.skills} module={module}></ModuleCard>
                            })}
                        </div>
                        <div className="module-year-list">
                            {this.state.modules.filter((module) => module.yearOffered === "YEAR 2").map((module) =>{
                                return <ModuleCard skills={this.props.skills} module={module}></ModuleCard>
                            })}
                        </div>
                        <div className="module-year-list">
                            {this.state.modules.filter((module) => module.yearOffered === "YEAR 3").map((module) =>{
                                return <ModuleCard skills={this.props.skills} module={module}></ModuleCard>
                            })}
                        </div>
                    </MultiStepBox>
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

        
        if(this.state.skillsRequired.length == 0 && tempSkills.length == 0){
            this.setState({
                loading: false,
                confidence: 0,
            })
            return;
        }

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
                
                <ConfidenceGraph confidence={this.state.confidence} loading={this.state.loading}></ConfidenceGraph>
            </div>
        )
    }
}

export class ConfidenceGraph extends React.Component{
    render(){
        return(
            !this.props.loading ? 
                

            <div className="confidence">
            <svg viewbox="0 0 100 100">
                <path class="grey" d="M40,90
                        A40,40 0 1,1 60,90"
                        style={{fill:"none"}}/>
                <path class="purple" d="M40,90
                        A40,40 0 1,1 60,90"
                    style={{fill:"none", "--confidenceVal": this.props.confidence}}/>
            </svg>
            <span className="confidence-value">
            {this.props.confidence + "%"}</span>
        </div>:
        <div className="confidence">
            <div class="spinner-border text-primary" role="status">
            </div>
        </div>
        )
    }
}