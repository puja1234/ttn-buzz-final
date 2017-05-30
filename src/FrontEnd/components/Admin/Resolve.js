import React,{Component} from 'react'
import {asyncGetComplaints,asyncUpdateStatus} from '../../actions'

export default class Resolve extends Component {
    constructor(props){
        super(props);
        this.state = {
            status:''
        }
    }

    componentDidMount(){
        this.props.ReduxProps.dispatch(asyncGetComplaints());
    }

    changeStatus = (e,id) => {
        this.setState({status:e.target.value},()=>{
            this.props.ReduxProps.dispatch(asyncUpdateStatus(id,this.state.status));
        });
    };

    render(){
        let complaints = this.props.ReduxProps.complaintReducer.complaints;
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