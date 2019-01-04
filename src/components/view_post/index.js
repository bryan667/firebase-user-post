import React, { Component } from 'react';
import {Button} from 'react-bootstrap'
import {validateFunction, showError, convertArray, reverseArray} from '../ui/misc'
import ImageUploader from './image_uploader'
import {firebase, firebasePosts} from '../../firebase-db'
import retrieveUserData from '../../high-order-comp/user_data'
import '../../css/view_post.css'


class ViewPost extends Component {

    state = {
        formError: true,
        userData: '',
        disabled: false,
        image:{
            value:'',
            fileName: '',
            validation:{
                required: false,
            },
            valid:false,
        },
        textarea: {
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            validationMessage: '',
        },
        posts: [],
        previousLength: 0,
        scrollHeight: 0,
        itemsToDisplay: 10,
        postsLoading: true,
    }

    static getDerivedStateFromProps(props,state) {
        return state = {
            userData: props.userData
        }
    }

    componentDidMount() {
        firebasePosts.limitToLast(this.state.itemsToDisplay).on('value', ((snap)=> {
            const arrayPosts = convertArray(snap)
            document.querySelector('.posts_area').scrollTop = 0
            this.setState({
                posts: reverseArray(arrayPosts),
                postsLoading: false
            })
        }))
    }

    mapPosts = (posts) => (
        posts ?
            posts.map((items, i)=>(
                <div key={i}>
                    <div className='posts_div'>
                        <h4><b>{`${items.fullName} (${items.email})`}</b></h4>
                        <p>{items.post}</p>
                        <b>{items.timeStamp}</b>
                    </div>
                    <hr />
                </div>
            ))
        :
        null
    )

    onScroll(event) {
        if (this.state.posts.length !== this.state.previousLength) {
            if (event.target.scrollHeight - event.target.scrollTop <= event.target.clientHeight) {
                let addItems = this.state.itemsToDisplay + 5
                this.setState({
                    itemsToDisplay: addItems,
                    postsLoading: true,
                    scrollHeight: event.target.scrollHeight,
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
        const tempElement = this.state.textarea
        this.errorCheck(tempElement)

        if (this.state.formError === false) {

            this.setState({
                disabled: true
            })

            const tempState = this.state
            const date = new Date().toUTCString()

            const dataToSubmit = {
                fullName: `${tempState.userData.firstName} ${tempState.userData.lastName}`,
                email: tempState.userData.email,
                post: tempState.textarea.value,
                timeStamp: date,
            }

            firebasePosts.push(dataToSubmit).then(()=> {
                alert("Message posted!")
            }).catch(e=>{
                alert("Unable to post. Something went wrong.")
            })

            setTimeout(()=> {
                this.setState({
                    disabled: false
                })
            }, 1500)
        }
    }

    storeFilename(imageFilename) {
        const imageData = this.state.image
        imageData.fileName = imageFilename

        this.setState({image: imageData})
    }

    removeImage = () => {

        firebase.storage().ref('images').child(this.state.image.fileName).delete().then(()=> {
            console.log(`file has been deleted: ${this.state.image.fileName}`)
        }).catch(function(error) {
            console.log('Uh-oh, an error occurred!')
        });

        const imageData = {...this.state.image}
        imageData.value = '';
        imageData.valid = false;

        this.setState({
            image: imageData
        })
    }

    render() {
        const { disabled, postsLoading} = this.state

        return (
            <div className='textarea_block'>
                <form>
                    {console.log(this.state.image.fileName)}
                    <ImageUploader
                        tag={"Insert Image"}
                        filename={(filename)=> this.storeFilename(filename)}
                        removeImage={()=> this.removeImage()}
                    />
                    <textarea
                        placeholder='post here'
                        onChange={(event)=> this.updateForm(event)}
                        disabled={disabled}
                    ></textarea>
                    {showError(this.state.textarea)}
                    <div className='textarea_button'>                
                        <Button bsStyle="primary" 
                        disabled={disabled}
                        onClick={() => this.submitPost()}
                        >
                        {disabled? 'Posting..' : 'Post' }
                        </Button>
                    </div>
                </form>
                <hr />
                <div className='posts_area'
                    onScroll={(event) => this.onScroll(event)}
                >
                    <hr />
                    {this.mapPosts(this.state.posts)}
                    {postsLoading ? 
                        <h2>Loading... </h2>      
                    : null}
                </div>
            </div>
        );
    }
}

export default retrieveUserData(ViewPost);