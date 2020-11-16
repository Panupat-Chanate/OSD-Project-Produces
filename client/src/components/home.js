import React,{Component} from 'react';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import Signin from './signin';

export default class Home extends Component{
  constructor() {
    super();
    this.state={
        arrData: [],
        arrData2: []
    }
  }

  checkSession() {
    axios.get('/session', {withCredentials: true})
    .then(response => {
      // if (response.data.logged_in && this.state.sessionStatus === 'NOT_LOGGED_IN')
      console.log('logged in?', response);
    }).catch(error => {
      console.log('logged error', error);
    });
  }

  getProduces() {
    axios.get('/showProduce', {withCredentials: true})
    .then(response => {
      this.setState({
          arrData: response.data[0],
          arrData2: response.data[1]
      }, () => console.log(this.state))
    }).catch(error => {
      console.log(error);
    });
  }

  componentDidMount() {
    this.checkSession();
    this.getProduces();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.arrData)
  }
  handleChange=(e)=>{
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  render(){
    const data = {
        columns: [
            // {
            //     label: 'Image',
            //     field: 'image',
            //     sort: 'asc',
            //     width: 150
            // },
            {
                label: 'ID',
                field: 'id',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Type',
                field: 'type',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Data',
                field: 'data',
                sort: 'asc',
                width: 100
            }
        ],
        rows: [
            {
                // image: this.state.arrData.produce_img,
                id: this.state.arrData.produce_id,
                name: this.state.arrData.produce_name,
                type: this.state.arrData.produce_type,
                data: this.state.arrData.produce_data
            },
            {
                // image: this.state.arrData2.produce_img,
                id: this.state.arrData2.produce_id,
                name: this.state.arrData2.produce_name,
                type: this.state.arrData2.produce_type,
                data: this.state.arrData2.produce_data
            }
        ]
      };
    return(
        // <div>
        //     <form onSubmit={this.handleSubmit}>
        //     <input type="text" className="form-control" id="data" value={this.state.data} onChange={this.handleChange} placeholder="ชื่อ"></input><br/>
        //      <input type="submit" ></input>
        //     </form> 
        // </div>
        <MDBDataTable
            striped
            bordered
            small
            data={data}
        />
    )
  }
}