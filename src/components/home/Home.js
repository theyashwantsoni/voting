import React, { Component } from 'react';


class Home extends Component {
    constructor(props) {
        super(props)        
        this.state = {
            hassession:sessionStorage.getItem('user')
        };
    }
    
  render() {

    // const { finduser } = sessionStorage.getItem('user');

    return (
      <div className="Home">
        <h2>Home Page</h2>
        <p>welcome {sessionStorage.getItem('user') && (JSON.stringify(sessionStorage.getItem('user')))}</p>
      </div>
    );
  }
}

export default Home;