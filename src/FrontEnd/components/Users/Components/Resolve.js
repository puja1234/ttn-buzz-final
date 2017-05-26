import React,{Component} from 'react'
import get from 'lodash/get'
import {asyncGetComplaints,asyncUpdateStatus} from '../../../actions'

export default class Resolve extends Component {
    constructor(props){
        super(props);
        this.state = {
            status:''
        }
    }

    componentDidMount(){
        const email = get(this.props.ReduxProps.userFetch, 'users.email');
        this.props.ReduxProps.dispatch(asyncGetComplaints(email));
    }

    changeStatus = (e,id) => {
        const email = get(this.props.ReduxProps.userFetch, 'users.email');
        this.setState({status:e.target.value},()=>{
            console.log("&&&&&&&&&&&&&&&&&&&&&&&",this.state.status);
            this.props.ReduxProps.dispatch(asyncUpdateStatus(id,this.state.status,email));
        });
    };

    render(){
        let complaints = this.props.ReduxProps.complaintReducer.complaints;
        console.log("complaints received in resolver are",complaints);
        return(
            <div>{complaints.length ?
                <table className="table">
                    <thead>
                    <tr>
                        <th>Complained By</th>
                        <th>Complaint</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    { complaints.map((items) => (
                        <tr className="success">
                            <td>{items.complaint_by}</td>
                            <td>{items.content}</td>
                            <td>
                                <select name="status" onChange={ (e) => this.changeStatus(e, items._id) }>
                                    { items.status === 'pending' ?
                                        <option value="pending">pending</option> :
                                        ''}
                                    <option value="resolve">resolve</option>
                                    <option value="close">close</option>
                                </select>
                            </td>
                        </tr>
                    )) }
                    </tbody>
                </table>
                : <div>No complaints</div>
            }
            </div>
        )
    }
}