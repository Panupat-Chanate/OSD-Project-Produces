import React,{Component} from 'react';
import axios from 'axios';

export default class Home extends Component{
  constructor() {
    super();
    this.state={
        arrayData: []
    }
  }

  getProduces() {
    axios.get('/showProduce', {withCredentials: true})
    .then(response => {
      const numbers = response.data
      for (let i = 0; i < numbers.length; i++) {
        console.log(response.data[i])
        this.setState(state => {
          state.arrayData.push(response.data[i]);
        })
      }
      console.log(this.state.arrayData)
    }).catch(error => {
      console.log(error);
    });
  }

  componentDidMount() {
    this.getProduces();
  }

  render(){
    return(
      <div>
        {this.state.arrayData.map((item, index) => (
          // <p key={index}>Hello, {person.produce_name} from {person.produce_id}!</p>
        <table class="table table-bordered"  key={index}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{item.produce_id}</td>
              <td>{item.produce_name}</td>
              <td>{item.produce_type}</td>
              <td>{item.produce_data}</td>
            </tr>
          </tbody>
        </table>
        ))}
      </div>
    )
  }
}