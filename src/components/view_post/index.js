import React, { Component } from 'react';
import {Button, Glyphicon } from 'react-bootstrap'
import ReactLoading from 'react-loading'

import {validateFunction, showError, convertArray, reverseArray, previewFile, removeImage, reset} from '../ui/misc'
import EditModal from './edit_modal'
import ImageModal from './image_modal'
import RemoveModal from './remove_modal'
import ImageUploader from './image_uploader'
import UserImage from './user_image'
import {firebase, firebasePosts} from '../../firebase-db'
import retrieveUserData from '../../high-order-comp/user_data'
import '../../css/view_post.css'


class ViewPost extends Component {

    state = {
        formError: true,
        userData: '',
        disabled: false,
        reload: false,
        postsLoading: true,
        previousLength: 0,
        scrollHeight: 0,
        itemsToDisplay: 10,
        posts: [],
        image:{
            isUploading:false,
            file: '',
            previewResult: '',
            error: '',
        },
        imageModal: {
            src: '',
            display: 'none',
        },
        editModal: {
            id: '',
            value: '',
            show: false,
            index: '',
            validation: {
                required: true,
            },
            valid: false,
            validationMessage: '',
        },
        removeModal: {
            id: '',
            value: '',
            show: false,
            index: '',
        },
        textarea1: {
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            validationMessage: '',
        }
    }

    static getDerivedStateFromProps(props,state) {
        return state = {
            userData: props.userData
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll)

        firebasePosts.limitToLast(this.state.itemsToDisplay).on('value', ((snap)=> {
            const arrayPosts = convertArray(snap)

            this.setState({
                posts: reverseArray(arrayPosts),
                postsLoading: false
            })
        }))
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    editPost = (post, index, modalName) => {
        const tempElement = {...this.state[modalName]}
        tempElement.id = post.id
        tempElement.value = post.post        
        tempElement.index = index
        tempElement.show = true

        this.setState({
            [modalName]: tempElement
        })

        if (modalName !== 'removeModal' ) {
            this.errorCheck(tempElement)
        }
    }

    closePost = (modalName) => {
        const tempElement = {...this.state[modalName]}
        tempElement.id = ''
        tempElement.value = ''
        tempElement.index = ''
        tempElement.show = false

        this.setState({
            [modalName]: tempElement
        })
    }

    deletePost = () => {
        const tempElement = {...this.state.removeModal}
        const tempPost = this.state.posts
        firebasePosts.child(tempElement.id).remove().then(()=>{
            tempElement.show = false
            tempPost.splice(tempElement.index, 1)

            this.setState({ 
                posts: tempPost,
                removeModal: tempElement,
                reload: true
            })

            setTimeout(()=> {
                this.setState({
                    reload: false
                })
            }, 0)
        })        
    }

    savePost = () => {
        const tempElement = {...this.state.editModal}
        this.errorCheck(tempElement)

        if (this.state.formError === false) {
            firebasePosts.orderByKey().equalTo(tempElement.id).once('value', ((snap)=> {
                const tempArr=[]
                snap.forEach((child)=> {
                    tempArr.push(child)
                });
                tempArr[0].ref.update({post: tempElement.value})
            })).then(()=> {
                const tempPost = this.state.posts
                tempPost[tempElement.index].post = tempElement.value

                this.setState({ 
                    post: tempPost
                })
                this.closePost('editModal')
            })
        }
    }

    onScroll =(event)=> {
        let body = event.srcElement.body

        if (this.state.posts.length !== this.state.previousLength) {
            if (body.scrollHeight - body.scrollTop <= body.clientHeight + 5) {
                let addItems = this.state.itemsToDisplay + 5
                this.setState({
                    itemsToDisplay: addItems,
                    postsLoading: true,
                    scrollHeight: body.scrollHeight,
                    previousLength: this.state.posts.length
                })

                firebasePosts.limitToLast(addItems).once('value').then((snap)=> {
                    const arrayPosts = convertArray(snap)
                    this.setState({
                        posts: reverseArray(arrayPosts),
                        postsLoading: false,
                    })
                })
            }
        }
    }

    errorCheck(tempElement) {
        let validateResult = validateFunction(tempElement)
        tempElement.valid = validateResult[0]
        tempElement.validationMessage = validateResult[1]

        this.setState({
            [tempElement.id]: tempElement,
            formError: !tempElement.valid
        })

        return !tempElement.valid
    }

    updateForm = (event) => {
        const tempElement = this.state[event.target.id]
        tempElement.value = event.target.value
        this.errorCheck(tempElement)
    }

    submitPost =()=> {
        const tempState = {...this.state}
        const errorCheck = this.errorCheck(tempState.textarea1)
        const date = new Date().toUTCString()

        const dataToSubmit = {
            fullName: `${tempState.userData.firstName} ${tempState.userData.lastName}`,
            email: tempState.userData.email,
            post: tempState.textarea1.value,
            timeStamp: date,
            imageURL: ''
        }

        if (errorCheck === false) {
            if (tempState.image.file) {
                const extra = new Date().getTime()
                const name = Math.random().toString(36).substring(2, 15)+extra

                const imageURL = firebase.storage().ref(`images/${name}`)
                .put(tempState.image.file).then((snap) => {
                    const url = snap.ref.getDownloadURL().then((url)=> {
                        return url;
                    })
                    return url
                })

                imageURL.then((url)=> {
                    dataToSubmit.imageURL = url
                    firebasePosts.push(dataToSubmit).then(()=> {
                        console.log("Message posted!")
                        this.reloadUserImg()
                    }).catch(e=>{
                        console.log("Unable to post. Something went wrong.")
                        this.reloadUserImg()
                    })
                })
            } else {
                firebasePosts.push(dataToSubmit).then(()=> {
                    console.log("Message posted!")
                    this.reloadUserImg()
                }).catch(e=>{
                    console.log("Unable to post. Something went wrong.")
                    this.reloadUserImg()
                })
            }

            tempState.image.isUploading = false
            tempState.image.previewResult = ''
            tempState.image.file = ''
            tempState.image.error = ''
            tempState.textarea1.value = ''
    
            this.setState({
                image: tempState.image,
                textarea1: tempState.textarea1,
                disabled: true,
                reload: true,
            })
        }
    }

    reloadUserImg = () => {
        this.setState({
            disabled: false,
            reload: false
        })
    }

    uploadAgain = () => {
        const tempImage = this.state.image

        removeImage(tempImage, (tempImage)=> {
            this.setState({
                image: tempImage
            })
        })

        reset(tempImage, (tempImage)=> {
            this.setState({
                image: tempImage
            })
        })
    }

    previewFile = (event) => {
        const tempImage = this.state.image
        previewFile(event, tempImage, (tempImage) => {
            this.setState({
                image: tempImage
            })
        })
    }

    feedModal = (event) => {
        const tempModal = this.state.imageModal
        tempModal.src = event.target.src
        tempModal.display = 'block'
        this.setState({
            imageModal: tempModal
        })
    }

    closeModal = () => {
        const tempModal = this.state.imageModal
        tempModal.src = ''
        tempModal.display = 'none'
        this.setState({
            imageModal: tempModal
        })
    }

    mapPosts = (posts) => (
        posts ?
            posts.map((items, i)=>(
                <div key={i}>
                    <div className='posts_div'>
                        <div className='user_detail'>
                            {!this.state.reload ? 
                                <UserImage 
                                    email={items.email}
                                />
                            :
                            <div className='img_profile'>
                                <div className='spinner_wrap'>
                                    <ReactLoading 
                                    className='spinner'
                                    type={'spin'} 
                                    color={'blue'} 
                                    height={'10%'} 
                                    width={'10%'} />
                                </div>
                            </div>
                            }
                            <div className='right'>
                                <h2 className='full_name'>{`${items.fullName} (${items.email})`}</h2>
                                <div className='timestamp'>{items.timeStamp}</div>
                            </div>
                            {(items.email === this.state.userData.email) ?
                                <div className='edit_wrap'>
                                    <Button onClick={()=> this.editPost(items, i, 'editModal')}>
                                        <Glyphicon glyph="edit"/> 
                                    </Button>
                                    <Button onClick={()=> this.editPost(items, i, 'removeModal')}>
                                        <Glyphicon glyph="remove"/> 
                                    </Button>
                                </div>
                                :
                                null
                            }
                        </div>
                        <p>{items.post}</p>
                        {items.imageURL ? 
                            <div className='img_post_wrapper'>
                                <img src={items.imageURL}
                                alt='wow much'
                                className='img_post'
                                onClick={(event) => this.feedModal(event)}
                                ></img>
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
            ))
        :
        null
    )

    render() {
        const { disabled, postsLoading, imageModal, editModal, removeModal} = this.state

        return (
            <div className='posts_block'>
                    <ImageModal 
                        src={imageModal.src}
                        display={imageModal.display}    
                        closeModal={()=> this.closeModal()}
                    />
                    <EditModal 
                        post={editModal}
                        onChange={(event)=> this.updateForm(event)}
                        closePost={()=> this.closePost('editModal')}
                        savePost={()=> this.savePost()}
                    />
                    <RemoveModal 
                        post={removeModal}
                        deletePost={()=> this.deletePost()}
                        closePost={()=> this.closePost('removeModal')}
                    />
                <div className='top'>
                    <form className='form_block'>
                        <ImageUploader
                            tag={"Insert Image"}
                            previewFile={(e)=> this.previewFile(e)}                            
                            uploadAgain={()=> this.uploadAgain()}
                            error={this.state.image.error}
                            previewResult={this.state.image.previewResult}
                            isUploading={this.state.image.isUploading}
                        />
                        <div className='textarea_block'>
                            <textarea
                                id='textarea1'
                                placeholder='post here'
                                value={this.state.textarea1.value}
                                onChange={(event)=> this.updateForm(event)}
                                disabled={disabled}
                            ></textarea>
                        {showError(this.state.textarea1)}
                        <div className='button_wrap'>
                            <Button bsStyle="primary" 
                                disabled={disabled}
                                onClick={() => this.submitPost()}
                            >
                                {disabled? 'Posting..' : 'Post' }
                            </Button>
                        </div>
                        </div>
                    </form>
                </div>
                <div>
                    <div className='posts_area'>
                        {this.mapPosts(this.state.posts)}
                        {postsLoading ? 
                            <div className='post_loading'>
                                <ReactLoading 
                                className='spinner'
                                type={'spin'} 
                                color={'blue'} 
                                height={'10%'} 
                                width={'10%'} />
                            </div>      
                        : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default retrieveUserData(ViewPost);