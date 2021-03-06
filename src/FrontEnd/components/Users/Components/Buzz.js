import React,{Component} from 'react'
import get from 'lodash/get';

import '../../../assets/styling/Home.css'
import {asyncActionPostBuzz} from '../../../actions'
import RecentBuzz from './RecentBuzz'

export default class Buzz extends Component{
    constructor(props){
        super(props);
        this.state={
            postData:{

            },
            buzz:'',
            image:[],
            actionType:'Activity',
            posted_by:'',
            posted_by_image:'',
            err:'',
            imagePreviewUrl:[]
        }
    }

     upload() {
        document.getElementById('clickMe').click();
    };

    onBuzzChange(event){
        this.setState({buzz:event.target.value ,err:''});

    }

    onActionSelect(event){
        this.setState({actionType:event.target.value})
    }

   addBuzz(){
        if(this.state.buzz === '' && this.state.image === ''){
            this.setState({err:'Post cannot be empty'})
        }else {
            const email = get(this.props.ReduxProps.userFetch, 'users.email');
            const image = get(this.props.ReduxProps.userFetch, 'users.imageURL');
           let newData = {
                buzz: this.state.buzz,
                actionType: this.state.actionType,
                posted_by: email,
                posted_by_image: image,
            };
            let formData = new FormData();
            let data = JSON.stringify(newData);
            formData.append('buzzdata', data);

            for(let i=0;i<this.state.image.length; i++){
                formData.append("image", this.state.image[i]);
            }

            this.setState({
                postData: newData,
                buzz: '',
                imagePreviewUrl:'',
                err:'See activities'
            }, function () {
                console.log(this.state.postData);
                this.props.ReduxProps.dispatch(asyncActionPostBuzz(formData));
            });
        }
   }


    imageUpload = (event) => {
       if(event.target.files.length >3){
           alert("Cannot upload more than 3 images!!!");
       }
        let fileName = event.target.files[0].name;
        let extension = fileName.split('.').pop();
        if(extension == 'png' || extension=='jpg' || extension == 'jpeg' || extension == 'gif') {
            this.setState({image: event.target.files}, () => {
                console.log("files", this.state.image);
            });
            let numOfFiles = event.target.files.length;
            const files = [];
            let reader = new FileReader();
            let file = event.target.files;

            reader.onloadend = () => {
                console.log('image in reader',reader.result);
                this.setState({
                    imagePreviewUrl: reader.result
                }, function(){
                    console.log("image selected is",this.state.image)
                });
            };

            for(let j=0;j<file.length;j++) {
                reader.readAsDataURL(file[j]);
            }
        }else{
            alert("Select only images!!!")
        }

    };


    render(){
        return(

             <div className="my-container buzz-container">
                 <div className="wrapper">
                     <div className="header"> <span>Create Buzz</span></div>
                     <textarea rows="10"
                               placeholder="create a buzz (Max 500 characters)"
                               className="buzz-details"
                               maxLength="500"
                               onChange={this.onBuzzChange.bind(this)}
                               value={this.state.buzz} ></textarea>

                     <div className="buzz-footer">

                     <div className="dropdown">
                         <select
                             className="dropbtn"
                             title="Select a category of your buzz"
                             onChange={this.onActionSelect.bind(this)}
                         >Activity
                             <option>Activity</option>>
                             <option>Lost and Found</option>
                         </select>
                     </div>
                         <form encType="multipart/form-data" className="uploadImage">
                             <img src={`/${require('../../../assets/images/upload.png')}`} className="camera"/>
                             <input ref="file" type="file" name="file" className="cameraInput" onChange={this.imageUpload} multiple/>
                         </form>

                         <button className="submit-buzz" onClick={this.addBuzz.bind(this)}>Submit</button>
                     </div>
                 </div>
                 {this.state.imagePreviewUrl?
                     <div className="imagePreview">
                         <img className="imagePreview" src={this.state.imagePreviewUrl}/>
                     </div>:
                     <div></div>}

                 <div className="errorBuzz">
                 {this.state.err}
                 </div>
                 <RecentBuzz ReduxProps = {this.props.ReduxProps}/>
             </div>
        )
    }
}


