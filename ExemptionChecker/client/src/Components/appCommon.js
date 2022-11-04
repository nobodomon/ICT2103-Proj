import React from "react"

export class AppPageContainer extends React.Component{

    state = {
      height: window.innerHeight,
    }
  
    componentDidMount(){
      this.resize();
      window.addEventListener('resize', () => {
        this.resize();
      });
  
    }
  
    resize = () =>{
      this.setState({
        height: window.innerHeight,
      })
    }
  
    render(){
      return(
        <div className={"app-page " + (this.props.nopad? "no-pad" : "")} style={{maxHeight: (this.state.height - 56)}}>
          {this.props.children}
  
        </div>
      )
    }
  }


  export class Loading extends React.Component {
    state={
      text: "Loading",
    }
  
    // 1 second tick timer
    tick = () => {
      if(this.state.text === "Loading..."){
        this.setState({
          text: "Loading"
        })
      }else{
        this.setState({
          text: this.state.text + "."
        })
      }
    }
  
    componentDidMount(){
      this.interval = setInterval(() => this.tick(), 1000);
    }
  
    render(){
      return(
        <AppPageContainer nopad={true}>
          <div className="loading-graphic">  
            <div class="spinner-border text-dark" role="status">
            </div>
            <span class="sr-only">{this.state.text}</span>
          </div>
        </AppPageContainer>
      )
    }
  }
  
  