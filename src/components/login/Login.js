import React, { Component } from "react";


import { Row,Checkbox, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import './login.sass';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from 'shared/validator';
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

    validateLoginForm = (e) => {
        
        let errors = {};
        const { formData } = this.state;
    
        if (isEmpty(formData.email)) {
            errors.email = "Email can't be blank";
        } else if (!isEmail(formData.email)) {
            errors.email = "Please enter a valid email";
        }

        if (isEmpty(formData.password)) {
            errors.password = "Password can't be blank";
        }  else if (isContainWhiteSpace(formData.password)) {
            errors.password = "Password should not contain white spaces";
        } else if (!isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
            errors.password = "Password's length must between 6 to 16";
        }

        if (isEmpty(errors)) {
            if(formData.email=='yashwantsoni009@gmail.com' || formData.email=='theyashwantsoni@gmail.com'){
                return true ;
            }else{
                errors.auth = '**oops...user not found!!!!!!*';
                return errors;
            }
        } else {
            return errors;
        }    
    }

    login = (e) => {
        
        e.preventDefault();
        const { formData } = this.state;
        const { history } = this.props;
        let errors = this.validateLoginForm();

        if(errors === true){
            sessionStorage.setItem('user',formData.email);
            alert(sessionStorage.getItem('user'));
            // this.s/tate.checkboxChecked ? sessionStorage.setItem('user',formData.email):alert('no session');
            window.location="http://localhost:3000/home";
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
            <div className="Login">
                <Row>
                    <form onSubmit={this.login}>
                        <FormGroup controlId="email" validationState={ formSubmitted ? (errors.email ? 'error' : 'success') : null }>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                        { errors.email && 
                            <HelpBlock>{errors.email}</HelpBlock> 
                        }
                        </FormGroup >
                        <FormGroup controlId="password" validationState={ formSubmitted ? (errors.password ? 'error' : 'success') : null }>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange} />
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
                </Row>
            </div>
        )
    }
}

export default Login;