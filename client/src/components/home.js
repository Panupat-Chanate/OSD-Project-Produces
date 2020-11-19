import React,{Component, useState} from 'react';
import axios from 'axios';
import Add from './add';
import { browserHistory } from 'react-router';
import Session from './session'
const fs = require('fs');

export default class Home extends Component{
  constructor() {
    super();
    this.state={
      _id: '',
      searchId: '',
      searchName: '',
      searchType: '',
      searchData: '',
      _img: '',
      arrayData: [],
      editItem: false,
      originAll: {
        origin_id: '',
        originId: '',
        originName: '',
        originType: '',
        originData: ''
      }
    }
  }

  getSession=() => {
    axios.get('/checkSession', {withCredentials: true})
    .then(response => {
      console.log(response.data)
      if (response.data) {
      } else {
        browserHistory.push("/");
      }
    }).catch(error => {
      console.log(error);
    });
  }

  componentDidMount() {
    this.getSession();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state)
    axios.post("/search",this.state)
    .then((response) => {
      this.setState({
        arrayData: []
      })
      const numbers = response.data
      console.log(numbers)
      var concatData = this.state.arrayData.concat(response.data);
      this.setState({ 
        arrayData: concatData,
        originAll: {
          originId: this.state.searchId,
          originName: this.state.searchName,
          originType: this.state.searchType,
          originData: this.state.searchData
        }
      })
      // console.log(this.state.arrayData[20].produce_img)
    }).catch((error) => {
      console.log(error)
    });
  }

  handleChange=(e)=>{
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  handleDelete=(e)=>{
    console.log(e.target.id)
    var value = {
      delId: e.target.id
    }
    axios.post("/deleteproduce",value)
    .then((response) => {
      this.handleSubmit(e);
    }).catch((error) => {
      console.log(error)
    });
  }
  beforeEdit=(e)=>{
    const Item = JSON.parse(e.target.id)
    this.setState({
      editItem: true,
      _id: Item._id,
      searchId: Item.item_id,
      searchName: Item.item_name,
      searchType: Item.item_type,
      searchData: Item.item_data,
      _img: Item.item_img
    });
  }
  afterEdit=(e)=>{
    e.preventDefault();
    var value = {
      edit_id: this.state._id,
      editId: this.state.searchId,
      editName: this.state.searchName,
      editType: this.state.searchType,
      editData: this.state.searchData
    }
    axios.post("/editproduce",value)
    .then((response) => {
      this.setState({
        editItem: false,
        searchId: this.state.originAll.originId,
        searchName: this.state.originAll.originName,
        searchType: this.state.originAll.originType,
        searchData: this.state.originAll.originData
      })
      this.handleSubmit(e);
    }).catch((error) => {
      console.log(error)
    });
  }

  render(){
    return(
    <form>
      <div align="right">
        {/* <img src={'D:/UploadIMG/'+ this.state._img} alt="" width="50" height="60"/>
        <input type="file" name="picture" id="picture"/> <p></p> */}
        <input type="text" name="searchId" id="searchId" value={this.state.searchId} onChange={this.handleChange} placeholder="ID"></input> <p></p>
        <input type="text" name="searchName" id="searchName" value={this.state.searchName} onChange={this.handleChange} placeholder="Name"></input> <p></p>
        <input type="text" name="searchType" id="searchType" value={this.state.searchType} onChange={this.handleChange} placeholder="Type"></input> <p></p>
        <input type="text" name="searchData" id="searchData" value={this.state.searchData} onChange={this.handleChange} placeholder="Data"></input> <p></p>
        <input type="submit" className="btn btn-primary" value={this.state.editItem?"บันทึก":"ค้นหา"} className={this.state.editItem?"btn btn-danger":"btn btn-primary"}
          onClick={this.state.editItem?this.afterEdit:this.handleSubmit}/>
      </div>
      <p></p>
      <div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Image</th>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Data</th>
              <th>Download</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {this.state.arrayData.map((item, index) => (
            <tr key={index}>
              {/* src="/image/IMAGE-1605751886206.jpg" */}
              <td align="center"><img src={'/image/'+ item.produce_img} alt="" width="50" height="60"/></td>
              <td>{item.produce_id}</td>
              <td>{item.produce_name}</td>
              <td>{item.produce_type}</td>
              <td>{item.produce_data}</td>
              <td></td>
              <td align="center" className="text-primary">
                <i class="fas fa-edit" onClick={this.beforeEdit} id={
                  '{ "_img":"'+item.produce_img+'","_id":"'+item._id+'", "item_id":"'+item.produce_id+'", "item_name":"'+item.produce_name+'", "item_type":"'+item.produce_type+'", "item_data":"'+item.produce_data+'"}'
                }></i>
              </td>
              <td align="center" className="text-danger">
                <i class="fas fa-trash-alt" onClick={this.handleDelete} id={item._id}></i>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </form>
    )
  }
}