import React from 'react'
import {connect} from 'react-redux'
import { BrowserRouter,Switch,Route } from 'react-router-dom'
import Store from '../store/Store.js'
import Begin from './Begin.js'
import Answer from './Answer.js'
import End from './End.js'
import { getData } from '../store/reducer.js'


class App extends React.Component{
	constructor(props) {
	  super(props);
	  this.state = {};
	}
	componentWillMount(){
		this.props.getData();
	}

    render(){
        return(
        	<div>
        	   <BrowserRouter>
        	      <Switch>
					  <Route path="/" exact component={ Begin} />
					  <Route path="/answer" component={ Answer } />
					  <Route path="/end" component={ End } />
        	      </Switch>
 
        	   </BrowserRouter>
            </div>
        )
    }
}
export default connect( (state)=>({state}),{ getData })(App)