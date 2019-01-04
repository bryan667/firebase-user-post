import React, { Component } from 'react'
import { firebase } from '../../firebase-db'
import FileUploader from 'react-firebase-file-uploader'

class ImageUploader extends Component {

    state = {
        name:'',
        isUploading:false,
        fileURL:''
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

        this.setState({
            name:filename,
            isUploading:false
        });

        firebase.storage().ref('images')
        .child(filename).getDownloadURL()
        .then( url => {
            this.setState({fileURL: url })
        })

        this.props.filename(filename)
     }

    static getDerivedStateFromProps(props,state){
        if(props.defaultImg){
            return state = {
                name:props.defaultImgName,
                fileURL:props.defaultImg
            }
        }
        return null
    }


    uploadAgain = () => {
        this.setState({
            name:'',
            isUploading:false,
            fileURL:''
        });
        this.props.removeImage()
    }

    render() {
        return (
            <div>
                { !this.state.fileURL ?
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
                { this.state.fileURL ?
                    <div className='image_preview'>
                        <div className="image_upload_container">
                            <img
                                style={{
                                    width:'100%'
                                }}
                                src={this.state.fileURL}
                                alt={this.state.name}
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