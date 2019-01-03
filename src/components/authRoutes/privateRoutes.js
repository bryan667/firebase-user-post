import React from 'react';
import {Route, Redirect } from 'react-router-dom'

const PrivateRoutes = ({user,component: Comp,...rest}) => {
    return (
            <Route {...rest} component={(props)=> {
                if (user !== null) {
                    return <Comp {...props} user={user}></Comp>
                } else {
                    return <Redirect to='/sign_in'></Redirect>
                }
            }}>
            </Route>
            
    );
};

export default PrivateRoutes;