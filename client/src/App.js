import React, { Component } from 'react';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Admin from './components/admin/Admin';
import Otp from './components/otp/Otp';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
  const Loginmod = () => (
	<Login />
  );
  const Homemod = () => (
		<Home />
		);
	const Adminmod = () => (
			<Admin />
	);
	const Otpmod = () => (
		<Otp />
	);
class App extends Component {
	render() {
		return (
			<Router>
			  <div className="App">
				<Route exact path="/home" component={Homemod} />
				<Route exact path="/otpvalidation" component={Otpmod} />
				<Route exact path="/" component={Loginmod} />
				<Route exact path="/admin" component={Adminmod} />
			  </div>
			</Router>
		  );
	}
}

export default App;