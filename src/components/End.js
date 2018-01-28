import React from 'react'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
class End extends React.Component{
    render(){
        return(
        	<div className="end-content">
        	   <div className="btn-box">
        	     <p>答题结束！</p>
        	     <p className="p-1">你的得分是： <em>{this.props.state.score}</em> 分</p>
        	   	 <a href="/"  className="btn-sty">重新答题</a>
        	   </div>
            </div>
        )
    }
}
export default connect( (state)=>({state}))(withRouter(End))