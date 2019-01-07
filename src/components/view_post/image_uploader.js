import React, { Component } from 'react'
import { firebase } from '../../firebase-db'
import FileUploader from 'react-firebase-file-uploader'

class ImageUploader extends Component {

    state = {
        isUploading:false,
    }

    handleUploadStart = () => {
        this.setState({
            isUploading:true
        })
    }

    handleUploadError = () => {
        this.setState({
            isUploading:false
        })
     }

    handleUploadSuccess = (filename) => {
        firebase.storage().ref('images')
        .child(filename).getDownloadURL()
        .then( url => {
            this.props.passFile(filename, url)

            this.setState({
                isUploading:false,
            })
        })
    }
    
    reset = () => {
        this.setState({
            name:'',
            isUploading:false,
            fileURL:''
        });
    }

    uploadAgain = () => {
        this.reset()
        this.props.removeImage()
    }

    render() {
        return (
            <div>
                { !this.props.url ?
                    <div>
                        <div>{this.props.tag}</div>
                        <FileUploader
                            accept="image/*"
                            name="image"
                            randomizeFilename
                            storageRef={firebase.storage().ref('images')}
                            onUploadStart={ this.handleUploadStart }
                            onUploadError={ this.handleUploadError }
                            onUploadSuccess={ this.handleUploadSuccess }
                        />
                    </div>
                    :null
                }
                { this.state.isUploading ?
                    <div
                        style={{textAlign:'center',margin:'30px 0'}}
                    >
                        <div>Loading...</div>
                    </div>
                :null
                }
                { this.props.url ?
                    <div className='image_preview'>
                        <div className="image_upload_container">
                            <img
                                style={{
                                    width:'100%'
                                }}
                                src={this.props.url}
                                alt={this.props.fileName}
                            />
                            <div className="remove" style={{cursor:'pointer'}} onClick={()=>this.uploadAgain()}>
                                Remove
                            </div>
                        </div>
                    </div>
                :null
                }
            </div>
        );
    }
}

export default ImageUploader;