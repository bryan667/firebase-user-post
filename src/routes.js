import React from 'react'
import {Switch} from 'react-router-dom'
import Home from './components/home/index'
import SignIn from './components/sign_in/index'
import ViewPost from './components/view_post/index'
import PrivateRoutes from './components/authRoutes/privateRoutes'
import PublicRoutes from './components/authRoutes/publicRoutes'
import NotFound404 from './components/ui/404'
import Layout from './high-order-comp/Layout';

const Routes = (props) => {
  return (
    <Layout {...props}>
      <Switch>
        <PublicRoutes {...props} restricted={false} path='/' exact component={Home}></PublicRoutes>
        <PublicRoutes {...props} restricted={true} path='/sign_in' exact component={SignIn}></PublicRoutes>
        <PrivateRoutes {...props} path='/view_post/' exact component={ViewPost}></PrivateRoutes>
        <PublicRoutes {...props} restricted={false} component={NotFound404}></PublicRoutes>
      </Switch>
    </Layout>
  )
};

export default Routes;
