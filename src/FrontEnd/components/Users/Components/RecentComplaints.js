import React,{Component} from 'react'
import get from 'lodash/get';

import '../../../assets/styling/RecentBuzz.css'
import {asyncGetMyComplaints,asyncDeleteComplaint} from '../../../actions'

export default class RecentComplaints extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        // const email = get(this.props.ReduxProps.userFetch, 'users.email');
        // console.log('component will mount will calll ----------',this.props);
        this.props.ReduxProps.dispatch(asyncGetMyComplaints());
    }

    deleteComplaint = (event,id) =>{
        event.preventDefault();
        console.log("complaint to be deleted is :",id);
        var ob ={
            complaintid:id,
        }
        this.props.ReduxProps.dispatch(asyncDeleteComplaint(ob));
    };

    render(){
        let complaints = this.props.ReduxProps.complaintReducer.myComplaints;
        let index =0;
        return(
            <div>
                <table className="table">
                    <thead>
                    <tr >
                        <td>Complaint Type</td>
                        <td>Assigned To</td>
                        <td>Complaint</td>
                        <td>status</td>
                    </tr>
                    </thead>
                    <tbody>
                         {complaints.map((items)=>(
                        <tr className="success" key={index++}>
                            <td> {items.complaint_type} </td>
                            <td> {items.assignee_email} </td>
                            <td> {items.content} </td>
                            <td> {items.status} </td>
                            <td> <button onClick={ (e) => this.deleteComplaint(e, items._id) }>Delete</button> </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}