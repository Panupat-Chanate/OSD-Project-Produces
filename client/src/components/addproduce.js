import React,{Component, useState} from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

export default class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {
      imgCollection: '',
      produceId: '',
      produceName: '',
      produceType: '',
      produceData: ''
    }
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
}

  handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    for (const key of Object.keys(this.state.imgCollection)) {
      formData.append('imgCollection', this.state.imgCollection[key])
    }
    formData.append('produceId', this.state.produceId)
    formData.append('produceName', this.state.produceName)
    formData.append('produceType', this.state.produceType)
    formData.append('produceData', this.state.produceData)
    axios.post("/upload",formData)
    .then((response) => {
      console.log(response.data)
    }).catch((error) => {
      console.log(error)
    });
  }

  handleChange=(e)=>{
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleUpload=(e)=>{
    this.setState({
        [e.target.id]: e.target.files
    });
  }

  render(){
    return(
    <form>
      <input type="file" id="imgCollection" name="imgCollection" onChange={this.handleUpload} multiple></input><p></p>
      {/* <input type="file" id="file" name="file" onChange={this.handleFile}></input> */}
      <input type="text" id="produceId" placeholder="รหัสผลิตภัณฑ์" onChange={this.handleChange}></input><p></p>
      <input type="text" id="produceName" placeholder="ชื่อผลิตภัณฑ์" onChange={this.handleChange}></input><p></p>
      <input type="text" id="produceType" placeholder="ประเภทผลิตภัณฑ์" onChange={this.handleChange}></input><p></p>
      <input type="text" id="produceData"  placeholder="ข้อมูลผลิตภัณฑ์" onChange={this.handleChange}></input><p></p>
      <input type="submit" className="btn btn-primary" onClick={this.handleSubmit} value="เพิ่มข้อมูลผลิตภัณฑ์"></input><p></p>
    </form>
    )
  }
}