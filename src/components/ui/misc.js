import React from 'react'
import {Link} from 'react-router-dom'

export const Tag = (props) => {
    const template = <div
        style={{
            background: props.bck,
            fontSize: props.size,
            color: props.color,
            padding: '5px 10px',
            display: 'inline-block',
            fontFamily: 'Righteous',
            ...props.add
        }}
        >{props.children}</div>

    if (props.linkto) {
        return (
                <Link to={props.linkto}>
                    {template}
                </Link>
        )

    }   else {
        return template
    }

}

export const firebaseForEach = (snap) => {
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