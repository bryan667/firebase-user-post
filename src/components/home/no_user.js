import React from 'react';
import {Link} from 'react-router-dom'
import '../../css/redirect.css'

const NoUser = () => {
    return (
        <div className='redirect_wrapper'>
            <div className='back_img'>
                <div className='block'>
                    <div className='main_title'>
                        <p>Wall of</p>
                        <p>Pictures and Stuff</p>
                    </div>
                    <div className='desc'>
                        <p>Post pictures and stuff. Join the club!</p>
                        <p>Please <Link to={`/sign_in`}>sign in</Link></p>
                        <p>New to the group? Sign up <Link to={`/#`}>here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoUser