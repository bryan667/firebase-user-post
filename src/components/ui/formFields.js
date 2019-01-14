import React from 'react'
import {showError} from './misc'

const FormField = ({id, formData, change}) => {

    const renderTemplate = () => {
        let formTemplate = null
        
        switch(formData.element) {
            case('input'):
                formTemplate = (
                    <div>
                        {formData.showLabel ?
                            <div className='label_inputs'>
                                {formData.config.label}
                            </div>
                        : null
                        }
                        <input
                            {...formData.config}
                            value={formData.value}
                            onChange={(event) => {
                                change({event, id})
                            
                            } }
                            autoComplete="on"
                        ></input>
                        {showError(formData)}
                    </div>
                )
            break;
                                        
            default:
                formTemplate = null

        }

        return formTemplate
    }

    return (
        <div>
            {renderTemplate()}
        </div>
    )
}

export default FormField