import React, { Component } from 'react';
import {firebaseUsers} from '../firebase-db'

export default function retrieveUserData(WrappedComponent) {

    return class extends Component {

        state = {
            firstName: '',
            lastName: '',
            email: '',
            imageURL: '',
        }

        componentDidMount() {
            if (this.props.user!=null) { 
                firebaseUsers.orderByChild('email').equalTo(this.props.user.email).once('value', (snap)=> {
                    snap.forEach((data)=> {
                        this.setState({
                            firstName: data.val().firstName,
                            lastName: data.val().lastName,
                            email: data.val().email,
                            imageURL: data.val().imageURL
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