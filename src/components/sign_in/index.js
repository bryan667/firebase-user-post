import React, { Component } from 'react';
import {firebase} from '../../firebase-db'
import FormField from '../ui/formFields'
import {validateFunction} from '../ui/misc'
import {Button} from 'react-bootstrap'
import '../../css/sign_in.css'

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
            },
        },
        textarea: {
            value: `test-users:\nawyis@gmail.com /\nawyis2@gmail.com /\ndoge@gmail.com /\ncate@gmail.com /\n\npassword: 123456`,
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

        console.log(dataToSubmit)

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
            <div>
                <div className='signin_wrapper'>
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
                        <Button bsStyle="primary"
                            onClick={(event) => this.submitForm(event)}
                            type='submit'
                        >Login</Button>
                        <div className='textarea'>
                            <textarea rows='7' 
                                value={this.state.textarea.value}
                                readOnly
                            >
                            </textarea>
                        </div>
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