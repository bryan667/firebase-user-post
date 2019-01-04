import React, { Component } from 'react';
import {firebaseUsers} from '../firebase-db'

export default function retrieveUserData(WrappedComponent) {

    return class extends Component {

        state = {
            firstName: '',
            lastName: '',
            email: ''
        }

        componentDidMount() {
            if (this.props.user!=null) { 
                firebaseUsers.orderByChild('email').equalTo(this.props.user.email).on('value', (snap)=> {
                    snap.forEach((data)=> {
                        this.setState({
                            firstName: data.val().firstName,
                            lastName: data.val().lastName,
                            email: data.val().email
                        })
                    });
                })
            }
        }

        render() {
            return (
                <WrappedComponent userData={this.state} {...this.props}/>
            );
        }
    }
}