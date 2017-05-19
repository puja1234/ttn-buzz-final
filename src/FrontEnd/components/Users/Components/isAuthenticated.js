import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {asyncActionFetchUserDetail} from '../../../actions';

export default function isAuthenticated(NewComponent) {
    class isAuthenticated extends Component{
    componentWillMount(){
        this.props.dispatch(asyncActionFetchUserDetail());
    }
    render(){
        const {props} =this;
       if(props.userFetch.users || props.userFetch.loading){
           return <NewComponent {...props}/>
       }else{
       return <Redirect to ='/'/>
       }
    }
    }
    const mapStateToProps = state => {
        return state;
    };
    return connect(mapStateToProps)(isAuthenticated)
}