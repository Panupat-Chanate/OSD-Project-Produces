import React,{Component, useState} from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

export default class Home extends Component{
  constructor() {
    super();
    this.state={
      file: [],
      image: [],
      name: ''
    }
  }

//   getSession=() => {
//     axios.get('/checkSession', {withCredentials: true})
//     .then(response => {
//       console.log(response.data)
//       if (response.data) {
//       } else {
//         browserHistory.push("/");
//       }
//     }).catch(error => {
//       console.log(error);
//     });
//   }

//   componentDidMount() {
//     this.getSession();
//   }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
    const fd = new FormData();
    fd.append("Image", this.state.image);
    fd.append("File", this.state.file);
    fd.append("Name", this.state.name);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    axios.post("/upload",{
      file:this.state.file,
      img:this.state.image
    })
    .then((response) => {

    }).catch((error) => {
      console.log(error)
    });
  }

  handleChange=(e)=>{
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleFile=(e)=>{
    this.setState({
        [e.target.id]: e.target.files[0]
    });
    //   console.log(e.target.files[0])
  }

  render(){
    return(
    <form>
      <input type="file" id="image" name="image" onChange={this.handleFile}></input>
      <input type="file" id="file" name="file" onChange={this.handleFile}></input>
      <input type="text" id="name" onChange={this.handleChange}></input>
      <input type="submit" onClick={this.handleSubmit}></input>
    </form>
    )
  }
}