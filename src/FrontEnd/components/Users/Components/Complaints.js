import React,{Component} from 'react'
import get from 'lodash/get'

import '../../../assets/styling/Home.css'
import '../../../assets/styling/Complaints.css'
import {asyncPostComplaint} from '../../../actions/index'
import RecentComplaints from './RecentComplaints'

export default class Complaints extends Component{
    constructor(props){
        super(props);
        this.state = {
            complaint_type:'',
            complaint_content:'',
            assignee_email:''
        }
    }

    onComplaintChange =(event) => {
        this.setState({complaint_type:event.target.value}, function () {
            if(this.state.complaint_type === 'Hardware') {
                this.setState({assignee_email: 'anchal.jain@tothenew.com'}, function () {
                    console.log("assigned to_____________", this.state.assignee_email)
                })
            }else{
                if(this.state.complaint_type === 'Software') {
                    this.setState({assignee_email: 'kanishka.sikka@tothenew.com'})
                }
                else {
                    this.setState({assignee_email:'lata.tiwari@tothenew.com'})
                }
            }
        })
    };
    onConcern = (event) => {
        this.setState({complaint_content:event.target.value});
    };

    submitComplaint = (event) => {
        event.preventDefault();
        if(this.state.complaint_content === ''){
            alert("complaint cannot be empty.......Please write your complaint");
        }
        else {
            const email = get(this.props.ReduxProps.userFetch, 'users.email');

            let complaint = {
                complaint_by: email,
                complaint_type: this.state.complaint_type,
                content: this.state.complaint_content,
                assignee_email: this.state.assignee_email
            };

            this.setState({complaint_content: ''}, () => {
                this.props.ReduxProps.dispatch(asyncPostComplaint(complaint));
            });
        }
    };

    render(){
        console.log('this-----------props------------',this.props);
        const email = get(this.props.ReduxProps.userFetch, 'users.email');
        return(
            <div>
                <div className="complaint-body">
                    <h1 className="heading">Complaint Box</h1>
                    <form className="complaint-form">
                        <label> Select Department : </label>
                        <select onChange={this.onComplaintChange}>
                            <option >Software</option>
                            <option >Hardware</option>
                            <option >Others</option>
                        </select>

                        <label>Your Concern :</label>
                        <textarea value={this.state.complaint_content} className="feilds" name="msg" onChange={this.onConcern}></textarea>
                    </form>

                    <div className="complaint-footer">
                        <button className="complaint-send" onClick={this.submitComplaint}>Submit</button>
                    </div>
                </div>
                <RecentComplaints ReduxProps = {this.props.ReduxProps} />
            </div>
        )

      }
}