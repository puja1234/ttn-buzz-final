import React,{Component} from 'react';
import '../../../assets/styling/RecentBuzz.css'

export default class NextImage extends Component{
    constructor(props){
        super(props);
        this.state = {
            index:0
        }
    }
    showImage=(action,buzz) => {
        console.log("&&&&&&&&&&&&&item  action: ",action, 'buzz : ',buzz);
        if(action === 'next'){
            if(this.state.index === buzz.imageUpload.length-1){
                this.setState({index:0})
            }else {
                this.setState({index: this.state.index + 1})
            }
        }else{
            if(this.state.index === 0){
                this.setState({index:buzz.imageUpload.length-1})
            }else{
                this.setState({index: this.state.index - 1})
            }
        }
    };

    render(){
        return(
            <div className="carousel">
                <img className="next" src={`/${require('../../../assets/images/next.png')}`} onClick={this.showImage.bind(this,'next',this.props.buzzImage)}/>
                <img src={"http://localhost:3000/files/"+this.props.buzzImage.imageUpload[this.state.index].filename} className="posted-image"/>
                <img className="prev" src={`/${require('../../../assets/images/previous.png')}`} onClick={this.showImage.bind(this,'previous',this.props.buzzImage)}/>
            </div>
        )
    }
}