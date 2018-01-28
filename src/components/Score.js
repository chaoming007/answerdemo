import React from 'react'
import PropTypes from 'prop-types'

class Score extends React.Component{
    render(){

        let {score}=this.props;

        return(
        	<div>
        	     <div className="score-box">分数：{score}</div>
            </div>
        )
    } 
}

Score.propTypes={
    score:PropTypes.number
}

export default Score 