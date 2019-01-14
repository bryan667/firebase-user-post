import React from 'react';
import {Glyphicon} from 'react-bootstrap' 
import {Link} from 'react-router-dom'
import '../../css/footer.css'

const Footer = () => {
    return (
        <footer>
            <div className='flex_container'>
                <div className='glyph'>
                    <Glyphicon glyph='tasks'></Glyphicon>
                    <Glyphicon glyph='phone'></Glyphicon>
                </div>
                <div className='contact'>
                    <h2>Contact Me</h2>
                    <p>Email: <a href='mailto:janbryanmartirez@gmail.com'>janbryanmartirez@gmail.com</a></p>
                    <p>Send me your ideas, bug reports, suggestions! Any feedback would be greatly appreciated. </p>
                </div>
                <div className='links'>
                    <h2>Links</h2>
                    <a href='https://www.facebook.com/groups/the.brogrammers/' 
                        target="_blank"
                        rel="noopener noreferrer"
                    >Brogrammers!</a><br />
                    <a href='https://github.com/bryan667' 
                        target="_blank"
                        rel="noopener noreferrer"
                    >Github</a><br />  
                    <a href='https://www.freecodecamp.org/' 
                        target="_blank"
                        rel="noopener noreferrer"    
                    >FreeCodeCamp</a><br />
                    <a href='https://www.facebook.com/groups/584419352008720/' 
                        target="_blank"
                        rel="noopener noreferrer"    
                    >FreeCodeCamp Tarlac</a><br />
                    <a href='https://www.facebook.com/groups/free.code.camp.manila/' 
                        target="_blank"
                        rel="noopener noreferrer"    
                    >FreeCodeCamp Manila</a><br />
                    <a href='https://www.facebook.com' 
                        target="_blank"
                        rel="noopener noreferrer"    
                    >Facebook</a><br />
                </div>            
                <div className='copyright'>
                    Copyright 2019 Wowe -
                    All Rights Reserved. <Link to='/'>Terms</Link>, <Link to='/'>Privacy</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;