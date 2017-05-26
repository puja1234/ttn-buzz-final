import React,{Component} from 'react'
import { connect } from 'react-redux';

import homePage from '../../../assets/images/homePage.jpg'
import logo from '../../../assets/images/to_the_new.jpg'
import '../../../assets/styling/Main.css'
import isAuthenticated from './isAuthenticated'

 class Main extends Component{
    render(){
        return(

            <div>
                <img className="containerImage" src={homePage}/>
                <div className="middle">
                    <img className="logoImage" src={logo}/>
                    <h4>Create Your Own Buzz</h4>
                    <button className="login">
                        <a href="http://localhost:3000/api/login"><span>G</span> Sign in with google</a>
                    </button>
                </div>
            </div>
        );
    }
}

const MainContainer=connect(state => state)(isAuthenticated(false)(Main));
export default MainContainer