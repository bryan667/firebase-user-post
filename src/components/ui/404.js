import React from 'react';

const NotFound404 = () => {

    const pic = 'https://firebasestorage.googleapis.com/v0/b/fir-user-post-fc347.appspot.com/o/images%2Fa4230d98-5db2-403b-82d3-6ec24b769594.png?alt=media&token=66c53b02-94f9-4501-8853-c6b2c072255a'

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