import React from 'react'
import $ from 'jquery'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {currentData,addScore,addNowNum} from '../store/reducer.js'

class Titlist extends React.Component{
    constructor(props) {
      super(props);    
      this.state = {
        num:this.props.answerCurrentNum,
        currentNum:2,
        timeNum:10,       //倒计时时间
        clickTuff:true,    //选择控制
        answerLength:0     //题目数量
      };
      this.setClassFun=this.setClassFun.bind(this)
    }

    componentDidMount(){
        this.setTimeFun();
        this.initClassFun();
        this.enterAnimateFun()
    }

    setTimeFun(){
        clearInterval(window.timer);
        this.setState({
           timeNum:10
        })
        window.timer=setInterval(()=>{
            this.setState({
                timeNum:this.state.timeNum-1
            },()=>{
                if(this.state.timeNum<=0){
                    clearInterval(window.timer);
                    this.props.addNowNum(1);   //已答题目数量增加
                    this.skipFun();
                }
            })

        },1000)
    }

    skipFun(){                           // 倒计时时间到了之后跳转
        this.setState({
                num:this.state.num+1,
                clickTuff:true,
                currentNum:2,
                answerLength:this.state.answerLength+1
            },()=>{
                
                this.leaveAnimateFun();
                this.enterAnimateFun();
                if(this.finishFun()){
                    this.setTimeFun();    //更换题目重新设置计时时间
                    this.finishFun();
                    this.initClassFun();  //初始化样式
                }
        }); 
    }

    setResultFun(key,setNum,evt){        //选择答案(第几题，当前答案结果,当前选中选项)
        clearInterval(window.timer);
        if(!this.state.clickTuff){
            return;
        }
        this.setState({
            clickTuff:false
        })
        this.setClassFun(setNum,evt);

        this.props.addNowNum(1);   //已答题目数量增加

        setTimeout(()=>{
            this.skipFun();                
        },1000) 
    }

    finishFun(){      //答题完成
        if(this.state.answerLength>this.props.answerContent.length-1){
            clearInterval(window.timer);
            console.log("答题完毕");
            this.props.history.push("/end");
            return false;

         }else{
            this.props.currentData(this.state.num);
            return true;
         }
    }

    setClassFun(setNum,evt){         //设置错误和正确样式

        if(setNum==0){
            evt.target.className="animated-short wrong-current"
        }
        if(setNum==1){
            this.props.addScore(10);
            evt.target.className="right-current"
        }
        this.setState({
            currentNum:1
        })
    }

    initClassFun(){                  //题目跳转初始化样式
        let liObj=[...this.refs.ulObj.querySelectorAll("li")];
        liObj.forEach((item)=>{
             item.className="li-enter";      
        })
    }

    //动画

    enterAnimateFun(){
        let $titObj=$(this.refs.titObj); 
        let $liObj=$(this.refs.ulObj).find("li");      
        setTimeout(()=>{
            $titObj.removeClass('tit-enter').addClass('animated');
            $liObj.removeClass('li-enter').addClass('animated');
        },200);                  
    }

    leaveAnimateFun(){
        let $titObj=$(this.refs.titObj);
        let $liObj=$(this.refs.ulObj).find("li");        
        $titObj.addClass('tit-enter').removeClass('animated');
        $liObj.addClass('li-enter').removeClass('animated');              
    }


    render(){
        let {answerCurrentNum,answerCurrent}=this.props;
        return(
        	<div>
                 <div className="time-box">{this.state.timeNum}</div>
        	   	 <div className="animated tit-box tit-enter" ref="titObj">{answerCurrentNum+1}.{answerCurrent.title}</div>
        	   	 <ul className="answer-list" ref="ulObj">
                      {
                        answerCurrent.answer.map((item,key)=>{
                            return (<li                                
                                 className={ this.state.currentNum==item.right?"animated-short right-current":"" }
                                 onClick={(evt)=>{ this.setResultFun(answerCurrentNum,item.right,evt)}}
                                 key={key}>
                                    {item.answerTit}
                                </li>)
                        })
                      }       	   	 	   
        	   	 </ul>
            </div>
        )
    } 
}

Titlist.propTypes={
    answerCurrentNum:PropTypes.number,
    answerCurrent:PropTypes.object,
    answerContent:PropTypes.array
}

export default connect((state)=>({state}),{currentData,addScore,addNowNum})(withRouter(Titlist)) 