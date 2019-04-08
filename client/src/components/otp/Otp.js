import React, { Component } from "react";
import fetch from 'isomorphic-fetch'
import {  FormGroup, FormControl,  Button, HelpBlock } from 'react-bootstrap';
import './Otp.css';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from '../../shared/validator';
class Otp extends Component {

    constructor(props) {
        super(props)        
        this.state = {
            checkboxChecked: false,
            formData: {}, 
            errors: {}, 
            formSubmitted: false,
            loading: false 
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleIsItChecked = this.handleIsItChecked.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }
      
    valotp = async (e) => {
        
        e.preventDefault();
        const { formData } = this.state;
        const { history } = this.props;
        if (isEmpty(formData.otp)) {
            alert("Otp can't be blank");
        }else{
            if(sessionStorage.getItem('otp')!=formData.otp){
                alert("invalid otp");
      
              }else{
                window.location="http://localhost:3000/home";
              }
        
        } 
    }
    handleChange(evt) {
        this.setState({ checkboxChecked: evt.target.checked });
      }
      
      handleIsItChecked() {
        console.log(this.state.checkboxChecked ? 'Yes' : 'No');
      }
      
      handleToggle() {
        this.setState({ checkboxChecked: !this.state.checkboxChecked });
      }
    render() {

        const { errors, formSubmitted } = this.state;

        return (
            <div>
            <h1 class="login-header">Blockchain based voting system.</h1>
            <div className="login">
            <h2 class="login-header">Validate Otp</h2>
            <form class="login-container" onSubmit={this.valotp}>
                <p>
                    <FormGroup controlId="otp">
                       <FormControl type="number" name="otp" placeholder="Enter otp"  onChange={this.handleInputChange} />        
                    </FormGroup >
                </p>
               
                <p><Button type="submit" bsStyle="primary">Sign-In</Button></p>
            </form>
               
            </div>
            </div>
        )
    }
}

export default Otp;