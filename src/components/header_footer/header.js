import React from 'react';
import { Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {firebase} from '../../firebase-db'
import '../../css/header.css'

const Header = (props) => {
    const logoutHandler = () => {
        firebase.auth().signOut().then(()=> {
            console.log('Log out successful')
        }, (error) => {
            console.log('Error logging out')
        })
    }

    const privateButtons = () => (
        <React.Fragment>
            <Link to={`/view_post`}>
                <Button bsStyle="primary">View Posts</Button>
            </Link>
            <Button bsStyle="primary" onClick={()=> logoutHandler()}>Log Out</Button>
        </React.Fragment>
    )

    return (
        <div>
            <Link to={`/`}>
                <Button bsStyle="primary">
                    Home
                </Button>
            </Link>
            {props.user!=null ? 
                    (privateButtons())
                :
            <Button bsStyle="primary">
                <Link to={`/sign_in`} 
                    style={{ textDecoration: 'none',
                            color: '#FFF' 
                    }}>
                    Sign In
                </Link>
            </Button>
            }
        </div>
    );
};

export default Header;