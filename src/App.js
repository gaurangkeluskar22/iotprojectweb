import React, { Component } from 'react';
import './App.css';

import Firebase from 'firebase';

class App extends Component {
  componentDidMount() {
    const data1 = Firebase.database().ref('data');
    data1.on("value", datasnap => {
      this.setState({ status: datasnap.val().option });
    });

  }



  constructor(props) {
    super(props);

    const config = {
      apiKey: "AIzaSyD_Jt101lRcgoy0dUcUhBLSkxRDc-6ntro",
      authDomain: "iot-project-da695.firebaseapp.com",
      databaseURL: "https://iot-project-da695.firebaseio.com",
      projectId: "iot-project-da695",
      storageBucket: "iot-project-da695.appspot.com",
      messagingSenderId: "108153433301",
      appId: "1:108153433301:web:9a3f8f9be79135b33fc65c",
      measurementId: "G-XNGP69WFRM"
    };

    if (!Firebase.apps.length) {
      Firebase.initializeApp(config);
    }
    else {
      Firebase.app();
    }


    this.state = { textvalue: '', optionvalue: '', status: ''};

    this.handletextchange = this.handletextchange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleoptionchage = this.handleoptionchage.bind(this);

  }

  handletextchange(event) {
    this.setState({ textvalue: event.target.value });
  }
  handleoptionchage(event) {
    this.setState({ optionvalue: event.target.value });
  }

  handleSubmit(event) {

    const password = 'iotproject1234';

    if (this.state.textvalue !== password) {
      alert("Please Enter Correct Password!!");
    }
    else {
      Firebase.database().ref('data').set(
        {
          'password': this.state.textvalue,
          'option': this.state.optionvalue,
        }
      );
    }
    event.preventDefault();
  }



  render() {
    return (

      <div className="App">
        <center>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group" style={{ marginTop: 200 }}>
              <div className="form-group ml-5 mr-5">
                <input type="text" className="form-control col-sm-3" value={this.state.value} onChange={this.handletextchange} placeholder="Enter Password" />
              </div>
            </div>

            <div className="ml-5 mr-5">
              <select className="col-sm-3" onChange={this.handleoptionchage} value={this.state.value}>
                <option value="Select Option" >Select Option</option>
                <option value="OPEN">OPEN</option>
                <option value="CLOSE">CLOSE</option>
              </select>
            </div>

            <div className="ml-5 mr-5 mt-4">
              <button type="submit" className="btn btn-primary col-sm-3">Submit</button>
            </div>
          </form>

          <p className={this.state.status === "OPEN" ? "badge badge-danger p-2 m-3" : "badge badge-success p-2 m-3"}>Status : {this.state.status}</p>
        </center>

      </div>

    );
  }
}


export default App;
