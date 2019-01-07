import React from 'react';
import {Link} from 'react-router-dom'
import retrieveUserData from '../../high-order-comp/user_data'

const Home = ({user, userData})=> {
    return (
        <div>
            {user!=null ? 
                <div>
                    {console.log(userData)}
                    {userData.imageURL ?
                        <img src={userData.imageURL} alt='awyis'></img>
                    :
                    null
                    }
                    <div>{`Welcome ${userData.firstName} ${userData.lastName}!`}</div>           
                    <div>{`logged in as ${userData.email}`}</div>
                </div>
            :
                <div>
                    Please <Link to={`/sign_in`}>sign In</Link>
                </div>
            }
        </div>
    );
}

export default retrieveUserData(Home);