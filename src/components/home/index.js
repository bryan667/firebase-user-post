import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {firebaseUsers} from '../../firebase-db'

class Home extends Component {

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
            <div>
                {this.props.user!=null ? 
                    <div>
                        <div>{`Welcome ${this.state.firstName} ${this.state.lastName}!`}</div>           
                        <div>{`logged in as ${this.state.email}`}</div>
                    </div>
                :
                    <div>
                        Please <Link to={`/sign_in`}>sign In</Link>
                    </div>
                }
            </div>
        );
    }
}

export default Home;