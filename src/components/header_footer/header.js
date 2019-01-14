import React from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap'
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap'
import {firebase} from '../../firebase-db'
import '../../css/header.css'

const Header = (props) => {
    const logoutHandler = () => {
        firebase.auth().signOut().then(()=> {
            console.log('Log out successful')
        }, (error) => {
            console.log(`Error logging out: ${error}`)
        })
    }

    const privateButtons = () => (
        <React.Fragment>
            <LinkContainer to='/view_post'>
                <NavItem>
                    View Posts
                </NavItem>
            </LinkContainer>
        </React.Fragment>
    )

    return (
        <div>
            <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <IndexLinkContainer to='/'>
                    <Navbar.Brand>
                    </Navbar.Brand>
                </IndexLinkContainer>
                <Navbar.Toggle />
            </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <IndexLinkContainer to='/'>
                            <NavItem>
                                Home
                            </NavItem>
                        </IndexLinkContainer>

                        {props.user!=null ? 
                            (privateButtons())
                            :
                        null
                        }
                    </Nav>
                {props.user!=null ? 
                    <Nav pullRight>
                        <LinkContainer to='/sign_in'>
                            <NavItem onClick={()=> logoutHandler()}>
                                Log Out
                            </NavItem>
                        </LinkContainer>
                    </Nav>
                        :
                    <Nav pullRight>
                        <LinkContainer to='/sign_in'>
                            <NavItem onClick={()=> logoutHandler()}>
                                Sign In
                            </NavItem>
                        </LinkContainer>
                    </Nav>
                }
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;