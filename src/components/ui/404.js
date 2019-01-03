import React from 'react';

const NotFound404 = () => {

    const pic = 'https://firebasestorage.googleapis.com/v0/b/team-db-b1e44.appspot.com/o/players%2F848c1d63-8060-4f7d-a42f-0ca93e5eecfb.png?alt=media&token=cd227b3f-5d39-4d4d-b9c1-c13b364c5ea6'

    return (
        <div>
            <div className='not_found_container'>
                <div style={{
                    background: `url(${pic}) no-repeat`,
                    padding: '200px 200px 200px 200px',
                    margin: 'auto',
                    width:'0%'
                }}>
                </div>
                <div>Sorry. Page not found :(</div>
            </div>
        </div>
    );
};

export default NotFound404;