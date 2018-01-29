import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types'

class Score extends React.Component{
    constructor(props){
        super(props)
        this.state={
            widthVal:0
        }
    }
    componentDidMount(){
      this.setProgressFun();
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
                <div className="score-box " key={1} >
                        <em>分数：{score}</em>
                        <span className="score-bg" style={ { "width":this.state.widthVal} }></span>
                </div>                   
            </div>
        )
    } 
}

Score.propTypes={
    score:PropTypes.number
}

export default Score 