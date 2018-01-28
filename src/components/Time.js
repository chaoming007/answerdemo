import React from 'react'
import { connect } from 'react-redux'
import {currentData,timerSet} from '../store/reducer.js'


class Time extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        timeNum:10,
        num:this.props.state.answerCurrentNum
      };
    }

    componentWillReceiveProps(){
        
        let timer=null;
        this.setState({
            timeNum:10
        })
        timer=setInterval(()=>{
            this.props.timerSet(timer);
            this.setState({
                timeNum:this.state.timeNum-1
            },()=>{

                if(this.state.timeNum<=0){
                     clearInterval(timer);
                     this.skipFun();
                }

            })

       },1000)
    }

    skipFun(){       
        this.setState({
            num:this.state.num+1
        },()=>{
            this.props.currentData(this.state.num)
        });  
    }



    render(){ 
        return(
        	<div>
        	     <div className="time-box">{this.state.timeNum}</div>
            </div>
        )
    } 
}
export default connect((state)=>({state}),{currentData,timerSet})(Time) 