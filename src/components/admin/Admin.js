import React, { Component } from 'react';
import { Row,Checkbox, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import './admin.sass';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from 'shared/validator';

class Admin extends Component {
    constructor(props) {
        super(props)        
        this.state = {
            hassession:sessionStorage.getItem('user'),
            formData: {}, 
            
        };
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

  render() {
    const data =[{"lang":"golang"},{"lang":"c"},{"lang":"python"},{"lang":"javascript"}];
    const listItems = data.map((d) =><ul className="Label">{d.lang}</ul> );

    return (
      <div className="Admin">
        <h2>Admin Page</h2>
        <Row>
            <form >
                <Button className="Givemepad" type="submit" bsStyle="primary">start voting</Button>
        
                <Button type="submit" bsStyle="primary">stop voting</Button>
            </form>
        </Row>
        <br/><hr/>
        <Row>
            <h2>Vote Count</h2>
            <ul>
                {listItems}
            </ul>
        </Row>
        <br/><hr/>
        <Row>
        <h2>add Candidate</h2>

                    <form >
                        <FormGroup controlId="email">
                            <ControlLabel>name</ControlLabel>
                            <FormControl type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                   
                        </FormGroup >
                        <FormGroup controlId="email">
                            <ControlLabel>email</ControlLabel>
                            <FormControl type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                   
                        </FormGroup >
                        <Button type="submit" bsStyle="primary">add</Button>
                        
                    </form>
        </Row>
        <br/><hr/>
        <Row>
        <h2>add voter</h2>
                    <form >
                        <FormGroup controlId="email">
                            <ControlLabel>name</ControlLabel>
                            <FormControl type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                   
                        </FormGroup >
                        <FormGroup controlId="email">
                            <ControlLabel>email</ControlLabel>
                            <FormControl type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                   
                        </FormGroup >
                        <Button type="submit" bsStyle="primary">add</Button>
                        
                    </form>
        </Row>
      </div>
    );
  }
}

export default Admin;