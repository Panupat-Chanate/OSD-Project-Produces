import React,{Component} from 'react';
import axios from 'axios';
import Add from './add';

export default class Search extends Component{
  constructor() {
    super();
    this.state={
        searchId: '',
        searchName: '',
        searchType: '',
        searchData: '',
        arrayData: [],
        editItem: false,
        DataItem: []

    }
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
      var joined = this.state.arrayData.concat(response.data);
      this.setState({ arrayData: joined })
      // this.setState({
      //   searchId: '',
      //   searchName: '',
      //   searchType: '',
      //   searchData: ''
      // })
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
      alert("ลบแล้วแต่ยังโชว์")
    }).catch((error) => {
      console.log(error)
    });
  }
  beforeEdit=(e)=>{
    const Item = JSON.parse(e.target.id)
    this.setState({
      searchId: Item.item_id,
      searchName: Item.item_name,
      searchType: Item.item_type,
      searchData: Item.item_data
    });
    this.setState({
      editItem: true
    })
  }
  afterEdit=()=>{
    var value = {
      editId: this.state.searchId,
      editName: this.state.searchName,
      editType: this.state.searchType,
      editData: this.state.searchData
    }
    axios.post("/editproduce",value)
    .then((response) => {
      alert("แก้ไขแล้ว")
    }).catch((error) => {
      console.log(error)
    });
  }

  render(){
    return(
    <form>
      <div align="right">
        <input type="text" name="Search" id="searchId" value={this.state.searchId} onChange={this.handleChange} placeholder="ID"></input> &nbsp;&nbsp;
        <input type="text" name="Search" id="searchName" value={this.state.searchName} onChange={this.handleChange} placeholder="Name"></input> &nbsp;&nbsp;
        <input type="text" name="Search" id="searchType" value={this.state.searchType} onChange={this.handleChange} placeholder="Type"></input> &nbsp;&nbsp;
        <input type="text" name="Search" id="searchData" value={this.state.searchData} onChange={this.handleChange} placeholder="Data"></input> &nbsp;&nbsp;
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
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {this.state.arrayData.map((item, index) => (
            <tr key={index}>
              <td align="center"><img src="https://yt3.ggpht.com/a/AATXAJxJjVMWwmPPPXC59rdjHFyWdgWat910_17nHWD0CA=s900-c-k-c0x00ffffff-no-rj" alt="Girl in a jacket" width="50" height="60"/></td>
              <td>{item.produce_id}</td>
              <td>{item.produce_name}</td>
              <td>{item.produce_type}</td>
              <td>{item.produce_data}</td>
              <td align="center" className="text-primary">
                <i class="fas fa-edit" onClick={this.beforeEdit} id={
                  '{ "item_id":"'+item.produce_id+'", "item_name":"'+item.produce_name+'", "item_type":"'+item.produce_type+'", "item_data":"'+item.produce_data+'"}'
                }></i>
              </td>
              <td align="center" className="text-danger">
                <i class="fas fa-trash-alt" onClick={this.handleDelete} id={item.produce_id}></i>
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