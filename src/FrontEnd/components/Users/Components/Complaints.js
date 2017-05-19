import React,{Component} from 'react'

import '../../../assets/styling/Home.css'
import '../../../assets/styling/Complaints.css'

export default class Complaints extends Component{
    render(){
        return(
            <div className="complaint-body">
                <h1 className="heading">Complaint Box</h1>
                <form className="complaint-form">
                    <label> Select Department : </label>
                        <select>
                            <option value="Product Inquiry">Product Inquiry</option>
                            <option value="Feedback">Feedback</option>
                            <option value="Complaint">Complaint</option>
                        </select>

                    <label>Email :</label>
                    <input name="demail" type="email"  className="feilds"/>

                    <label>Your Concern :</label>
                    <textarea  className="feilds" name="msg"></textarea>

                </form>

                <div className="complaint-footer">
                    <button className="complaint-send">Submit</button>
                </div>

            </div>
        )

      }
}