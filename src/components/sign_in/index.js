import React, { Component } from 'react';
import {firebase} from '../../firebase-db'
import FormField from '../ui/formFields'
import {validateFunction} from '../ui/misc'
import {Button} from 'react-bootstrap'

class SignIn extends Component {
    state = {
        formError: false,
        formSuccess: '',
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'text',
                    placeholder: 'Enter Email here'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: ''
            }
        }
    }

    updateForm(event) {
        const tempValue = event.event.target.value
        const tempID = event.id

        const tempFormData = this.state.formData
        const tempElement = tempFormData[tempID]

        tempElement.value = tempValue

        //validation check
        let validateResult = validateFunction(tempElement)
        tempElement.valid = validateResult[0]
        tempElement.validationMessage = validateResult[1]
        tempFormData[tempID] = tempElement

        this.setState({
            formData: tempFormData,
            formError: false
        })
    }

    submitForm(event) {
        event.preventDefault()

        let dataToSubmit = {}
        let formIsValid = true

        //for in
        for (let items in this.state.formData) {
            
            dataToSubmit[items] = this.state.formData[items].value
            formIsValid = this.state.formData[items].valid
            
        }

        if (formIsValid) {
            firebase.auth()
            .signInWithEmailAndPassword(
                dataToSubmit.email,
                dataToSubmit.password
            ).then(()=> {
                this.props.history.push('/')
            }).catch(error => {
                this.setState({
                    formError: true
                })
            })

        } else {
            this.setState({
                formError: true
            })
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='signin_wrapper' style={{margin: '100px'}}>
                    <form onSubmit={(event) => this.submitForm(event)}>
                        <h2>Please Login</h2>
                        <FormField
                                id={'email'}
                                formData={this.state.formData.email}
                                change={(event) => this.updateForm(event)}
                        ></FormField>
                        <FormField
                                id={'password'}
                                formData={this.state.formData.password}
                                change={(event) => this.updateForm(event)}
                        ></FormField>
                        <p>**awyis@gmail.com / awyis2@gmail.com / doge@gmail.com**</p>
                        <p>**123456**</p>
                        <Button bsStyle="primary" onClick={(event) => this.submitForm(event)}>Login</Button>
                    </form>
                    {this.state.formError ?
                    <div className='error_label'>
                        Incorrect credentials
                    </div>
                    :''
                    }
                </div>
            </div>
        );
    }
}

export default SignIn;