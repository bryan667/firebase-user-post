import React from 'react';
import {Modal, Button} from 'react-bootstrap'

const RemoveModal = ({post, closePost, deletePost}) => {
    return (
        <Modal show={post.show} onHide={()=> closePost()}>
            <Modal.Body>
                Delete this post?
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=> closePost()}>Cancel</Button>
                <Button onClick={()=> deletePost()} 
                    bsStyle="primary">
                Delete Post
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RemoveModal;