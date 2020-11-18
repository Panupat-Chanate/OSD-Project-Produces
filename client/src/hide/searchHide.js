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
        searchData: null,
        arrayData: []
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
      // console.log(numbers.length)
      var joined = this.state.arrayData.concat(response.data);
      this.setState({ arrayData: joined })
      // this.setState(state => {
      //       state.arrayData.push(response.data);
      //       console.log(response)
      //     })
      // for (let i = 0; i < numbers.length; i++) {
      //   // console.log(response.data[i])
      //   console.log(numbers.length)
      //   this.setState(state => {
      //     state.arrayData.push(response.data[i]);
      //     console.log(response.data[i])
      //   })
      //   // console.log(this.state.arrayData)
      // }
      // console.log(this.state.arrayData)
      this.setState({
        searchId: '',
        searchName: '',
        searchType: '',
        searchData: '',
        // [e.target.id]:"",
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
      {/* <Home></Home> */}
      <div>
        
        <table class="table table-bordered"  >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>data</th>
            </tr>
          </thead>
          <tbody>
          {this.state.arrayData.map((item, index) => (
            <tr key={index}>
              <td>{item.produce_id}</td>
              <td>{item.produce_name}</td>
              <td>{item.produce_type}</td>
              <td>{item.produce_data}</td>
            </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </form>
    )
  }
}