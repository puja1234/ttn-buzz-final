import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {asyncActionFetchUserDetail} from '../../../actions';

export default (isAuthRoute)=>(NewComponent)=> {
    class isAuthenticated extends Component{
    componentWillMount(){
        this.props.dispatch(asyncActionFetchUserDetail());
    }
    render(){
        const {props} =this;
        if(isAuthRoute){
            if(props.userFetch.users || props.userFetch.loading){
                return <NewComponent {...props}/>
            }else{
                return <Redirect to ='/'/>
            }
        }else{
            if(props.userFetch.users || props.userFetch.loading){
                return <Redirect to ='/home'/>
            }else{
                return <NewComponent {...props}/>
            }
        }

    }


    }
    const mapStateToProps = state => {
        return state;
    };
    return connect(mapStateToProps)(isAuthenticated)
}