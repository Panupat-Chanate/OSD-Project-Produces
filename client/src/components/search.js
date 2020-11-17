import React,{Component} from 'react';
import axios from 'axios';
import Home from './home';

export default class Search extends Component{
  constructor() {
    super();
    this.state={
        searchId: null,
        searchName: null,
        searchType: null,
        searchData: null
    }
  }

  handleSubmit = (e) => {
    console.log(this.state)
    axios.post("/search",this.state)
    .then((response) => {
      alert("uploaded");
    }).catch((error) => {
  });
  }

  handleChange=(e)=>{
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render(){
    return(
    <form onSubmit={this.handleSubmit}>
      <div  align="right">
        <input type="text" name="Search" id="searchId" value={this.state.searchId} onChange={this.handleChange} placeholder="ID"></input> &nbsp;&nbsp;
        <input type="text" name="Search" id="searchName" value={this.state.searchName} onChange={this.handleChange} placeholder="Name"></input> &nbsp;&nbsp;
        <input type="text" name="Search" id="searchType" value={this.state.searchType} onChange={this.handleChange} placeholder="Type"></input> &nbsp;&nbsp;
        <input type="text" name="Search" id="searchData" value={this.state.searchData} onChange={this.handleChange} placeholder="Data"></input> &nbsp;&nbsp;
        <input type="submit" className="btn btn-primary" value="ค้นหา"/>
      </div>
      <p></p>
      <Home></Home>
    </form>
    )
  }
}