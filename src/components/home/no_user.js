import React from 'react';
import {Link} from 'react-router-dom'

const NoUser = () => {
    return (
        <div className='redirect_wrapper'>
            Please <Link to={`/sign_in`}>sign in</Link>
        </div>
    );
};

export default NoUser