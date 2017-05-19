import React,{Component} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Main from './Users/Components/Main'
import Home from './Users/Containers/Home'
import About from './Users/Components/About'

export default class App extends Component{

    render(){
        return(
            <Router>
                <div>
                    <Route exact path='/' component={Main}/>
                    <Route path='/home' component={Home}/>
                    <Route  path='/about' component={About}/>
                </div>
            </Router>
        )
    }
}


