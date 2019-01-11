import React, { Component } from 'react';
import {Button, Glyphicon } from 'react-bootstrap'
import ReactLoading from 'react-loading'
import {validateFunction, showError, convertArray, reverseArray} from '../ui/misc'
import EditModal from './edit_modal'
import ImageModal from './image_modal'
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
            fileName: '',
            url: '',
        },
        textarea: {
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            validationMessage: '',
        },
        imageModal: {
            src: '',
            display: 'none',
        },
        editModal: {
            show: false,
            id: '',
            post: ''
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
                            <div className='edit_wrap'>
                                <Button onClick={()=> this.editPost(items)}>
                                    <Glyphicon glyph="edit"/> 
                                </Button>
                            </div>
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

    editPost = (post) => {
        this.setState({
            editModal: {
                id: post.id,
                post: post.post,
                show: true,
            }
        })
    }

    closePost = () => {
        this.setState({
            editModal: {
                id: '',
                post: '',
                show: false,
            }
        })
    }

    savePost = () => {

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
            textarea: tempElement,
            formError: !tempElement.valid
        })
    }

    updateForm = (event) => {
        const tempElement = this.state.textarea
        tempElement.value = event.target.value

        this.errorCheck(tempElement)
    }

    submitPost =()=> {
        const tempState = {...this.state}
        this.errorCheck(tempState.textarea)

        if (this.state.formError === false) {
            const date = new Date().toUTCString()

            const dataToSubmit = {
                fullName: `${tempState.userData.firstName} ${tempState.userData.lastName}`,
                email: tempState.userData.email,
                post: tempState.textarea.value,
                timeStamp: date,
                imageURL: tempState.image.url
            }

            firebasePosts.push(dataToSubmit).then(()=> {
                alert("Message posted!")
            }).catch(e=>{
                alert("Unable to post. Something went wrong.")
            })

            tempState.image.fileName = ''
            tempState.image.url = ''
            tempState.textarea.value = ''

            this.setState({
                image: tempState.image,
                textarea: tempState.textarea,
                disabled: true,
                reload: true,
            })

            setTimeout(()=> {
                this.setState({
                    reload: false
                })
            }, 1)

            setTimeout(()=> {
                this.setState({
                    disabled: false
                })
            }, 1500)
        }
    }

    storeFilename(imageFilename, imageURL) {
        const imageData = {...this.state.image}
        imageData.fileName = imageFilename
        imageData.url = imageURL

        this.setState({image: imageData})
    }

    removeImage = () => {
        firebase.storage().ref('images').child(this.state.image.fileName).delete().then(()=> {
            console.log(`file has been deleted: ${this.state.image.fileName}`)
        }).catch(function(error) {
            console.log('Uh-oh, an error occurred!')
        });

        const imageData = {...this.state.image}
        imageData.fileName = ''
        imageData.url = ''

        this.setState({image: imageData})
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

    render() {
        const { disabled, postsLoading, imageModal, editModal} = this.state

        return (
            <div className='posts_block'>
                    <ImageModal 
                        src={imageModal.src}
                        display={imageModal.display}    
                        closeModal={()=> this.closeModal()}
                    />
                    <EditModal 
                        id={editModal.id}
                        post={editModal.post}
                        editPost={editModal.show}
                        closePost={this.closePost}
                        savePost={this.savePost}
                    />
                <div className='top'>
                    <form className='form_block'>
                        <ImageUploader
                            tag={"Insert Image"}
                            fileName={this.state.image.fileName}
                            url={this.state.image.url}
                            passFile={(filename, url)=> this.storeFilename(filename, url)}
                            removeImage={()=> this.removeImage()}
                            reset={()=> this.reset()}
                        />
                        <div className='textarea_block'>
                            <textarea
                                placeholder='post here'
                                value={this.state.textarea.value}
                                onChange={(event)=> this.updateForm(event)}
                                disabled={disabled}
                            ></textarea>
                        {showError(this.state.textarea)}
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
                            <div>
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