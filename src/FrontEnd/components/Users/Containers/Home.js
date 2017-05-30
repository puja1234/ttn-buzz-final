import React,{Component} from 'react'
import get from 'lodash/get';
import {BrowserRouter as Router , Link ,Route} from 'react-router-dom'
import { connect } from 'react-redux';
import {Switch} from 'react-router-dom'

import '../../../assets/styling/Home.css';
import Activity from '../Components/Activity'
import Buzz from '../Components/Buzz'
import LostAndFound from '../Components/LostAndFound'
import Complaints from '../Components/Complaints'
import isAuthenticated from '../Components/isAuthenticated';
import Resolve from '../../Admin/Resolve'

class Home extends Component{
    render(){

        const email = get(this.props.userFetch,'users.email');
        const role= get(this.props.userFetch,'users.role');
        const image =get(this.props.userFetch,'users.imageURL');

        return(
            <div className="buzz-container">
                <header className="my-container">
                    <img src={`/${require('../../../assets/images/to_the_new.jpg')}`} alt="" className="logo"/>
                    <ul id="topMostNavBar">
                        <li> <a href="/api/logout" className="logout"> </a> </li>
                        <li> {email} </li>
                        <li> <img src={image} alt="" className="pro-pic"/></li>
                    </ul>

                    <ul className="second-menu">

                        <li> <Link to="/home" >Home </Link></li>
                        <li> <Link to='/home/activity'> Activity </Link> </li>
                        <li> <Link to='/home/lostAndFound'> Lost and Found </Link> </li>
                        <li> <Link to='/home/complaints'> Complaints </Link> </li>
                        { role === 'admin' ?
                            <li> <Link to="/home/resolve" >Resolve </Link></li>:<li></li>}
                    </ul>


                    <img src={`/${require('../../../assets/images/BuzzHeader.jpg')}`} alt="" className="banner"/>
                    <div className="textOnBanner">
                        <p>CREATING BUZZ AROUND YOU</p>
                        <p>NEVER BEEN SO EASY..</p>
                    </div>
                </header>

                <Switch>
                    <Route exact path='/home' render={props=> <Buzz{...props} ReduxProps = {this.props}/>} />
                    <Route exact path='/home/Activity' render={props => <Activity {...props} ReduxProps = {this.props}/>}/>
                    <Route exact path='/home/lostAndFound' render={props=> <LostAndFound {...props} ReduxProps = {this.props}/>} />
                    <Route exact path='/home/complaints' render={props=> <Complaints {...props} ReduxProps = {this.props}/>}/>
                    <Route exact path='/home/resolve' render={props=> <Resolve {...props} ReduxProps = {this.props}/>}/>
                    <Route path ='/!*' render={props=> <Buzz{...props} ReduxProps = {this.props}/>}/>
                </Switch>


                <footer className="my-container">
                    <p className="copyright"> @copyright, To The New 2017</p>
                    <p className="links"> <a href=""> About Us</a>  <a href=""> Help</a> </p>
                </footer>
             </div>
        );
    }
}




const HomeContainer=connect(state=>state)(isAuthenticated(true)(Home));
export default HomeContainer



