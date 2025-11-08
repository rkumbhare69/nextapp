
import { Fragment } from 'react';
import style from './form-textarea.module.scss';

const FormTextArea = ({ labelText, labelClass, error, inputValue, name, ...otherInputProps }) => {
    return (
        <Fragment>
            <textarea
                id={name}
                name={name}
                className={`${style.formInput} ${error && style.error}`}
                {...otherInputProps}>
            </textarea>
            <label className={`${style.formInputLabel} ${(inputValue.length) > 0 ? style.shrink : ''}`}>
                {labelText}
            </label >
            {error &&
                <div className={style.errorMessage}>{error} </div>
            }
        </Fragment>
    )
}
export default FormTextArea;