import React, { Component } from "react";
import fetch from 'isomorphic-fetch'
import {  FormGroup, FormControl,  Button, HelpBlock } from 'react-bootstrap';
import './login.css';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from '../../shared/validator';
class Login extends Component {

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
    createPost =async (data)=> {
        return await fetch('http://localhost/sms.php', {
            method: 'POST',
            mode: 'CORS',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res;
        }).catch(err => err);
    }
    validateLoginForm = (e) => {
        
        let errors = {};
        const { formData } = this.state;
    
        if (isEmpty(formData.email)) {
            errors.email = "Phone can't be blank";
        } 

        if (isEmpty(formData.password)) {
            errors.password = "aadhar can't be blank";
        }  else if (isContainWhiteSpace(formData.password)) {
            errors.password = "aadhar should not contain white spaces";
        } else if (!isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
            errors.password = "aadhar's length must between 6 to 16";
        }

        if (isEmpty(errors)) {
            if(formData.email){
                return true ;
            }else{
                errors.auth = '**oops...user not found!!!!!!*';
                return errors;
            }
        } else {
            return errors;
        }    
    }
    generateOTP() { 

        var digits = '0123456789'; 
        let OTP = ''; 
        for (let i = 0; i < 4; i++ ) { 
            OTP += digits[Math.floor(Math.random() * 10)]; 
        } 
        let { formData } = this.state;
        formData['otp'] = OTP;

        this.setState({
            formData: formData
        });
        sessionStorage.setItem('otp',OTP);
    } 
      
    login = async (e) => {
        
        e.preventDefault();
        const { formData } = this.state;
        const { history } = this.props;
        let errors = this.validateLoginForm();

        if(errors === true){
            sessionStorage.setItem('user',formData.email);
            sessionStorage.setItem('aadhar',formData.password);
            this.generateOTP();
            alert(JSON.stringify(formData));
            fetch('http://localhost/sms.php', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
            }).then(res => res.text())          // convert to plain text
            .then(text => {if(text=='1'){window.location="http://localhost:3000/otpvalidation";}else{alert('retry');}}) 
            // alert(sessionStorage.getItem('user')+""+sessionStorage.getItem('aadhar'));
            // const sms = this.createPost(formData);
            // alert(sms);
            // this.s/tate.checkboxChecked ? sessionStorage.setItem('user',formData.email):alert('no session');
            // window.location="http://localhost:3000/home";
        } else {
            this.setState({
                errors: errors,
                formSubmitted: true
            });
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
            {/* <div class="login-triangle"></div> */}
            <h2 class="login-header">Log in</h2>
            <form class="login-container" onSubmit={this.login}>
                <p><FormGroup controlId="email" validationState={ formSubmitted ? (errors.email ? 'error' : 'success') : null }>
                            <FormControl type="number" name="email" placeholder="Enter your phone"  onChange={this.handleInputChange} />
                        { errors.email && 
                            <HelpBlock>{errors.email}</HelpBlock> 
                        }
                        </FormGroup ></p>
                <p> <FormGroup controlId="password" validationState={ formSubmitted ? (errors.password ? 'error' : 'success') : null }>
                            <FormControl type="number" name="password" placeholder="Enter your aadhar" onChange={this.handleInputChange} />
                        { errors.password && 
                            <HelpBlock>{errors.password}</HelpBlock> 
                        }
                        </FormGroup>
                        </p>
                        {/* <p><div><label>remember me</label><input type="checkbox" checked={this.state.checkboxChecked} onChange={this.handleChange}/>
                        </div></p> */}
                <p><Button type="submit" bsStyle="primary">Sign-In</Button>
                        { errors.auth && 
                            <HelpBlock>{errors.auth}</HelpBlock> 
                        }</p>
            </form>
                {/* <Row>
                    <form onSubmit={this.login}>
                        <FormGroup controlId="email" validationState={ formSubmitted ? (errors.email ? 'error' : 'success') : null }>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                        { errors.email && 
                            <HelpBlock>{errors.email}</HelpBlock> 
                        }
                        </FormGroup >
                        <FormGroup controlId="password" validationState={ formSubmitted ? (errors.password ? 'error' : 'success') : null }>
                            <ControlLabel>Adhar</ControlLabel>
                            <FormControl type="password" name="password" placeholder="Enter your aadhar" onChange={this.handleInputChange} />
                        { errors.password && 
                            <HelpBlock>{errors.password}</HelpBlock> 
                        }
                        </FormGroup>
                        <div><label>remember me</label><input type="checkbox" checked={this.state.checkboxChecked} onChange={this.handleChange}/>
                        </div>
                        <Button type="submit" bsStyle="primary">Sign-In</Button>
                        { errors.auth && 
                            <HelpBlock>{errors.auth}</HelpBlock> 
                        }
                    </form>
                </Row> */}
            </div>
            </div>
        )
    }
}

export default Login;