import React from 'react';
import {Modal, Button} from 'react-bootstrap'

const EditModal = ({id, post, editPost, closePost}) => {
    return (
        <Modal show={editPost} onHide={()=> closePost()}>
            <Modal.Body>
                <div>{`postID: ${id}`}</div>
                <textarea defaultValue={post}></textarea>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=> closePost()}>Cancel</Button>
                <Button onClick={()=> closePost()} 
                    bsStyle="primary">
                Save Post
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditModal;