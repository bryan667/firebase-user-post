import React from 'react';
import Header from '../components/header_footer/header'
import Footer from '../components/header_footer/footer'

const Layout = props => {
  return (
    <div>
      <Header {...props}></Header>
        {props.children}
      <Footer></Footer>
    </div>
  );
};

export default Layout;