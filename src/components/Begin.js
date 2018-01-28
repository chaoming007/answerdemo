import React from 'react'
import { withRouter } from 'react-router-dom'
class Begin extends React.Component{
    render(){
        return(
        	<div className="begin-content">
        	   	 <a href="javascript:;" onClick={ ()=>{ this.props.history.push("/answer") } } className="btn-sty">开始答题</a>
            </div>
        )
    }
}
export default withRouter(Begin)