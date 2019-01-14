import React from 'react';
import {showError} from '../ui/misc'
import {Modal, Button} from 'react-bootstrap'
import '../../css/edit_modal.css'

const EditModal = ({post, onChange, closePost, savePost}) => {
    return (
        <Modal show={post.show} onHide={()=> closePost()}>
            <Modal.Header>
                <div>{'Edit Post'}</div>
            </Modal.Header>
            <Modal.Body>
                <textarea 
                    id='editModal'
                    onChange={(e)=> onChange(e)}
                    className={'textarea_edit'}
                    value={post.value}
                ></textarea>
                {showError(post)}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=> closePost()}>Cancel</Button>
                <Button onClick={()=> savePost()} 
                    bsStyle="primary">
                Save Post
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditModal;