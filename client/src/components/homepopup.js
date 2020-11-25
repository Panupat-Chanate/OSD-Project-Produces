import React,{Component, useState} from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import Session from './session'

export default class Homepopup extends Component{
  constructor() {
    super();
    this.state={
      _id: '',
      searchId: '',
      searchName: '',
      searchType: '',
      searchData: '',
      _img: '',

      popupName: '',
      popupId: '',
      popupType: '',
      popupData: '',

      arrayData: [],
      preview: '',
    }
    this.handleUpload = this.handleUpload.bind(this)
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
    axios.post("/search",this.state)
    .then((response) => {
      this.setState({
        arrayData: []
      })
      var concatData = this.state.arrayData.concat(response.data);
      // var json = '{'+response.data[0].produce_img+'}'
      // const Item = JSON.parse('{'+response.data[0].produce_img+'}')
    //'{"jsonIMG1":"PRODUCE-1606125496701.jpg","jsonIMG2":"PRODUCE-1606125496705.jpg"}'
    // { "jsonIMG0":"PRODUCE-1606140295644.jpg"},{ "jsonIMG1":"PRODUCE-1606140295647.jpg"}
    // "jsonIMG0":"PRODUCE-1606181601543.jpg","jsonIMG1":"PRODUCE-1606181601546.jpg"
      // console.log('{'+response.data[0].produce_img+'}')
      console.log(concatData)
      this.setState({
        arrayData: concatData
      })
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
      [e.target.id]: URL.createObjectURL(e.target.files[0])
    })
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
 
  Edit=(e)=>{
    e.preventDefault();
    var value = {
      edit_id: this.state._id,
      editId: this.state.popupId,
      editName: this.state.popupName,
      editType: this.state.popupType,
      editData: this.state.popupData
    }
    axios.post("/editproduce",value)
    .then((response) => {
      this.handleSubmit(e);
    }).catch((error) => {
      console.log(error)
    });
  }

  popup=(e)=>{
    const Item = JSON.parse(e.target.id)
    this.setState({
      _id: Item._id,
      _img: Item._img,
      popupId: Item.item_id,
      popupName: Item.item_name,
      popupType: Item.item_type,
      popupData: Item.item_data,
    });
  }

  clear=(e)=>{
    e.preventDefault();
    this.setState({
      editItem: false,
      searchId: "",
      searchName: "",
      searchType: "",
      searchData: "",
      _img: ''
    });
  }

  cancle=(e)=>{
    e.preventDefault();
    this.setState({
      _id: '',
      preview: '',
      popupId: '',
      popupName: '',
      popupType: '',
      popupData: '',
      // _img: ''
    });
  }

  render(){
    return(
    <form>
      <div align="right">
        <input type="text" name="searchId" id="searchId" value={this.state.searchId} onChange={this.handleChange} placeholder="ID"></input> &nbsp;&nbsp;
        <input type="text" name="searchName" id="searchName" value={this.state.searchName} onChange={this.handleChange} placeholder="Name"></input> <p></p>
        <input type="text" name="searchType" id="searchType" value={this.state.searchType} onChange={this.handleChange} placeholder="Type"></input> &nbsp;&nbsp;
        <input type="text" name="searchData" id="searchData" value={this.state.searchData} onChange={this.handleChange} placeholder="Data"></input> <p></p>
        <input type="button" className="btn btn-warning text-light" value="ล้างข้อมูล" onClick={this.clear}></input> &nbsp;&nbsp;
        <input type="submit" value={"ค้นหา"} className={"btn btn-primary"} onClick={this.handleSubmit}/>
      </div>
      <p></p>
      <div>
        <table class="table table-bordered">
          <thead>
            <tr align="center">
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
              <td align="center"><img src={'/image/' + item.produce_img.jsonIMG0} alt="" width="50" height="60" data-toggle="modal" data-target="#exampleModalCenter" onClick={this.popup} id={
                  '{ "_img":"'+item.produce_img+'","_id":"'+item._id+'", "item_id":"'+item.produce_id+'", "item_name":"'+item.produce_name+'", "item_type":"'+item.produce_type+'", "item_data":"'+item.produce_data+'"}'
              }/></td>
              <td>{item.produce_id}</td>
              <td>{item.produce_name}</td>
              <td>{item.produce_type}</td>
              <td>{item.produce_data}</td>
              <td align="center" className="text"><i class="fas fa-file-download"></i></td>
              <td align="center" className="text-primary">
                <i class="fas fa-edit" data-toggle="modal" data-target="#popupEdit" onClick={this.popup} id={
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

      <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            {/* <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">{"Name: "+this.state.popupName}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div> */}
            <div className="modal-body" align="center">
              <button type="button" className="btn"><i class="fas fa-angle-double-left"></i></button> &nbsp;
              <img src={'/image/'+ this.state._img} alt="" width="290" height="310"/> &nbsp;
              <button type="button" className="btn"><i class="fas fa-angle-double-right"></i></button> &nbsp;
            </div>
            {/* <div className="modal-footer">
              <h5 className="modal-body" id="exampleModalLongTitle">{"ID: "+this.state.popupId}</h5>
              <h5 className="modal-body" id="exampleModalLongTitle">{"Name: "+this.state.popupName}</h5>
              <h5 className="modal-body" id="exampleModalLongTitle">{"Type: "+this.state.popupType}</h5>
              <h5 className="modal-body" id="exampleModalLongTitle">{"Data: "+this.state.popupData}</h5>
            </div> */}
          </div>
        </div>
      </div>

      <div className="modal fade" id="popupEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
                {/* <h5 className="modal-title" id="exampleModalLongTitle">{"Name: "+this.state.popupName}</h5> */}
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body" align="center">
              {/* <button type="button" className="btn"><i class="fas fa-angle-double-left"></i></button> &nbsp;
              <img src={'/image/'+ this.state._img} alt="" width="290" height="310"/> &nbsp;
              <button type="button" className="btn"><i class="fas fa-angle-double-right"></i></button> &nbsp; */}
                
                <img src={'/image/'+ this.state._img} alt="" width="150" height="170"></img>
                <img src={'/image/'+ this.state._img} alt="" width="150" height="170"/>
                <img src={'/image/'+ this.state._img} alt="" width="150" height="170"/> <p></p>
                {/* <img src={this.state.preview} alt="" width="100" height="120"/> &nbsp;&nbsp;
                <input type="file" name="preview" id="preview" onChange={this.handleUpload}/> <p></p> */}
                
                <input type="text" name="popupId" id="popupId" value={this.state.popupId} onChange={this.handleChange} placeholder="ID"></input> &nbsp;&nbsp;
                <input type="text" name="popupName" id="popupName" value={this.state.popupName} onChange={this.handleChange} placeholder="Name"></input> <p></p>
                <input type="text" name="popupType" id="popupType" value={this.state.popupType} onChange={this.handleChange} placeholder="Type"></input> &nbsp;&nbsp;
                <input type="text" name="popupData" id="popupData" value={this.state.popupData} onChange={this.handleChange} placeholder="Data"></input> <p></p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={this.cancle} data-dismiss="modal">ยกเลิก</button>
                <button type="button" className="btn btn-success" onClick={this.Edit} data-dismiss="modal">บันทึก</button>
            {/* <input type="button" value="ยกเลิก" className="btn btn-danger" disabled={!this.state.editItem}
              onClick={this.cancle}/> &nbsp;&nbsp;
            <input type="button" className="btn btn-warning text-light" value="ล้างข้อมูล" onClick={this.clear}></input> &nbsp;&nbsp;
            <input type="submit" value={this.state.editItem?"บันทึก":"ค้นหา"} className={this.state.editItem?"btn btn-success":"btn btn-primary"}
              onClick={this.state.editItem?this.afterEdit:this.handleSubmit}/> */}
            </div>
          </div>
        </div>
      </div>
    </form>
    )
  }
}