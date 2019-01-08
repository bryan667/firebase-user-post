import React from 'react';
import ReactLoading from 'react-loading';
import {Link} from 'react-router-dom'
import retrieveUserData from '../../high-order-comp/user_data'
import '../../css/home.css'

const Home = ({user, userData})=> {
    return (
        <div className='home_main'>
            <div className='home_container'>
                {user!=null ? 
                    <React.Fragment>
                        <div className='image'>
                            <div className='image_wrapper'>
                            {userData.imageURL ?
                                <img src={userData.imageURL} alt='awyis'></img>
                            :
                                <div className='spinner_wrapper'>
                                    <ReactLoading 
                                    className='spinner'
                                    type={'spin'} 
                                    color={'blue'} 
                                    height={'10%'} 
                                    width={'10%'} />
                                </div>
                            }
                            </div>
                        </div>
                        <div className='info'>
                            <div>{`Welcome ${userData.firstName} ${userData.lastName}!`}</div>           
                            <div>{`logged in as ${userData.email}`}</div>
                        </div>

                        <div className='intro'>
                            <h1>Intro</h1>
                            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                        </div>

                        <div className='description'>
                            <h1>Description</h1>
                            <p>""Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?""</p>
                        </div>
                    </React.Fragment>
                :
                    <div>
                        Please <Link to={`/sign_in`}>sign In</Link>
                    </div>
                }
            </div>
        </div>
    );
}

export default retrieveUserData(Home);