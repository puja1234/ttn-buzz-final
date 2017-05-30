import React,{Component} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Switch} from 'react-router-dom'

import Main from './Users/Components/Main'
import Home from './Users/Containers/Home'

export default class App extends Component{
    render(){
        return(
            <Router>
                <div>
                    <Switch>
                        <Route exact path='/' component={Main}/>
                        <Route path='/home' component={Home}/>
                        <Route  path='/*' component={Main}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}


