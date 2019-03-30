import React, { Component } from 'react';
import { Row,Checkbox, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import './home.sass';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from 'shared/validator';

class Home extends Component {
    constructor(props) {
        super(props)        
        this.state = {
            hassession:sessionStorage.getItem('user'),
            formData: {}, 
            formSubmitted: false,
            loading: false 
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
    castvote = (e) => {
        
        e.preventDefault();
        const { formData } = this.state;
        const { history } = this.props;
            
        if (isEmpty(formData.vote)) {
            alert("vote can't be blank");
        } else{
            alert(formData.vote);

        }

    }
  render() {
    const data =[{"lang":"golang"},{"lang":"c"},{"lang":"python"},{"lang":"javascript"}];
    const listItems = data.map((d) =><label className="Label"><input type="radio" name="vote" onChange={this.handleInputChange}  value={d.lang}/>{d.lang}</label> );
    return (
      <div className="Home">
        <h2>Home Page</h2>
        <marquee>Welcome To blockchain based voting system</marquee>
        <p>welcome {sessionStorage.getItem('user') && (JSON.stringify(sessionStorage.getItem('user')))}</p>
         <b>What is your favorite programming language?</b> <br/>
        <Row>
                    <form onSubmit={this.castvote}>
                                                   {/* <Form.Check disabled type={type} label={`disabled ${type}`} id={`disabled-default-${type}`}/> */}

                        {/* <FormGroup controlId="password" >
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="radio" name="radio"/>
                            
                        </FormGroup> */}
                        {listItems}
                    
                        <Button type="submit" bsStyle="primary">cast vote</Button>
                        
                    </form>
        </Row>
   
      </div>
    );
  }
}

export default Home;