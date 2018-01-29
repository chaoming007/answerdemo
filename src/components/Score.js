import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types'

class Score extends React.Component{
    constructor(props){
        super(props)
        this.state={
            widthVal:1
        }
    }
    componentDidMount(){
      setTimeout(()=>{
        this.setProgressFun();
      },200)       
    }
    componentWillReceiveProps(){
      this.setProgressFun();
    }
    setProgressFun(){
        if(this.props.answerContent.length<=0){
            return;
        }
        let w=(this.props.nowNum/this.props.answerContent.length)*100+"%";
        this.setState({
            widthVal:w
        })   
    }

    render(){
        let {score,answerCurrentNum,answerContent}=this.props;
        return(
            <div>                   
                <div className="score-box " >
                        <span className="score-bg" style={ { "width":this.state.widthVal} }></span>
                </div> 
                <div className="score-content">
                    已答：{this.props.nowNum+"/"+this.props.answerContent.length}题，得分：{score} 分
                </div>                  
            </div>
        )
    } 
}

Score.propTypes={
    score:PropTypes.number,
    answerContent:PropTypes.array,
    answerCurrent:PropTypes.object
}

export default Score 