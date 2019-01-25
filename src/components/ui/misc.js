import React from 'react'

export const validateFunction = (element) => {
    let error = [true, '']

    if(element.validation.email){
        const regex1 = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const valid = regex1.test(element.value.trim())
        const message = `${!valid ? 'Must be a valid email':''}`
        error = !valid ? [valid,message] : error
    }
    
    if(element.validation.required) {
        const valid = element.value.trim() !== ''
        const message = `${!valid ? 'This field is required':''}`
        error = !valid ? [valid,message] : error
    }

    return error
}

export const showError = (formData) => {
    let errorMessage =         
    <div className='error_label'>
        {
            formData.validation && !formData.valid ? formData.validationMessage : null
        }
    </div>
    return errorMessage
}

export const convertArray = (snap) => {
    const data = []
    snap.forEach((childSnap) => {
        data.push({
            ...childSnap.val(),
            id: childSnap.key
        })
    })
    return data

}

export const reverseArray = (array) => {
    let reversedArray = []

    for (let i = array.length - 1 ; i >= 0 ; i--) {
        reversedArray.push(array[i])
    }

    return reversedArray
}

//=================================================================
//                          IMAGE UPLOADS
//=================================================================


export const previewFile = (event, tempImage, cb) => {
    const file = event.target.files[0]
    const reader  = new FileReader()
    const maxSize = 1024 * 300

    if (file) {
        reader.readAsDataURL(file)
        const fileSize = file.size
        const imageTest = /^image/i.test(file.type)

        if (fileSize < maxSize) {
            tempImage.isUploading = true
            tempImage.previewResult = ''        
            cb(tempImage)

            reader.addEventListener('load', () => {
                if (imageTest === true) {
                    tempImage.file = file
                    tempImage.isUploading = false
                    tempImage.previewResult = reader.result
                    tempImage.error = ''
                    cb(tempImage)
                } else {
                    tempImage.isUploading = false
                    tempImage.error = 'File is not an image'
                    cb(tempImage)
                }
            }, false)

        } else {
            tempImage.error = `File is too large. Max image size is 300kb`
            cb(tempImage)
        }
    } else {
        tempImage.error = ''
        cb(tempImage)
    }
}

export const removeImage = (tempImage, cb) => {
    tempImage.file = ''
    cb(tempImage)
}

export const reset = (tempImage, cb) => {
    tempImage.isUploading = false
    tempImage.previewResult = ''
    tempImage.error = ''
    cb(tempImage)
}