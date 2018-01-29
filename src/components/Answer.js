import React from 'react'
import Score from './Score.js'
import Titlist from './Titlist.js'
import { connect } from 'react-redux'

class Answer extends React.Component{
    render(){
        return(
            <div className="question-box">
                 <Score {...this.props.state}  />
        	     {
        	     	this.props.state.answerContent.length>0?<Titlist {...this.props.state} />:""
        	     }	 
            </div>
        )
    } 
}
export default connect((state)=>({state}))(Answer)