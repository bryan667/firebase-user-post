import React from 'react';
import '../../css/image_modal.css'

const ImageModal = ({src, display, closeModal}) => {

    return (
        <React.Fragment>
            <div id="myModal" className="modal"
                style={{
                    display: display
                }}
            >
                <span className="close" onClick={()=> closeModal()}>&times;</span>
                <img className="modal-content" id="img01" alt='test' src={src}></img>
                <div id="caption"></div>
            </div>
        </React.Fragment>
    );
};

export default ImageModal;