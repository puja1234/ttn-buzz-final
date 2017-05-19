import React,{Component} from 'react'
import get from 'lodash/get';
import { connect } from 'react-redux';

import logo from'../../../assets/images/to_the_new.jpg'
import buzzBanner from'../../../assets/images/BuzzHeader.jpg'
import '../../../assets/styling/Home.css'
import Complaints from '../Components/Complaints'
import Buzz from '../Components/Buzz'
import RecentBuzz from '../Components/RecentBuzz'
import isAuthenticated from '../Components/isAuthenticated';

class Home extends Component{
    constructor(){
        super();
        this.state={
            showBuzz:true,
            showComplaints:false,
            showActivities:false,
            showLostAndFound:false
        }
    }


    showComplaintComponent(){
        this.setState({
            showBuzz:false,
            showComplaints:true,
            showActivities:false,
            showLostAndFound:false
        })
    }
    showBuzzComponent(){
        this.setState({
            showBuzz:true,
            showComplaints:false,
            showActivities:false,
            showLostAndFound:false
        })
    }
    showActivity(){
        this.setState({
            showBuzz:false,
            showComplaints:false,
            showActivities:true,
            showLostAndFound:false
        })
    }
    showLostFound(){
        this.setState({
            showBuzz:false,
            showComplaints:false,
            showActivities:false,
            showLostAndFound:true
        })
    }

    render(){

        const email = get(this.props.userFetch, 'users.email');
        const image = get(this.props.userFetch, 'users.imageURL');
        //console.log(email, image);
        return(
            <div className="buzz-container">
                <header className="my-container">
                    <img src={logo} alt="" className="logo"/>
                <ul id="topMostNavBar">
                    <li> <a href="/api/logout" className="logout"> </a> </li>
                    <li> {email} </li>
                    <li> <img src={image} alt="" className="pro-pic"/></li>
                </ul>

                <ul className="second-menu">
                    <li> <a onClick={this.showBuzzComponent.bind(this)}> Home</a> </li>
                    <li> <a onClick={this.showComplaintComponent.bind(this)} > Complaint</a> </li>
                    <li> <a onClick={this.showActivity.bind(this)}> Activity</a> </li>
                    <li> <a onClick={this.showLostFound.bind(this)}> Lost and Found</a> </li>
                </ul>

                    <hr/>
                    <img src={buzzBanner} alt="" className="banner"/>
                    <div className="textOnBanner">
                        <p>CREATING BUZZ AROUND YOU</p>
                        <p>NEVER BEEN SO EASY..</p>
                    </div>
                </header>

                {
                    this.state.showBuzz ?
                        <div className="buzz-wrapper">
                            <Buzz ReduxProps={this.props}/>
                            <RecentBuzz ReduxProps={this.props}/>
                        </div>
                        :

                            <Complaints/>
                }

            <footer className="my-container">
                <p className="copyright"> @copyright, To The New 2017</p>
                <p className="links"> <a href=""> About Us</a>  <a href=""> Help</a> </p>
            </footer>
            </div>
        );
    }
}

const HomeContainer=connect(state => state)(isAuthenticated(Home));
export default HomeContainer