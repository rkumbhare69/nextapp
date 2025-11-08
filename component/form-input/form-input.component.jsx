
import { Fragment } from 'react';
import style from './form-input.module.scss';

const FormInput = ({ labelText, labelClass, error, inputValue, name, ...otherInputProps }) => {

    return (
        <Fragment>
            <input
                id={name}
                name={name}
                className={`${style.formInput} ${error && style.error}`}
                {...otherInputProps} />
            <label htmlFor={name} className={`${style.formInputLabel} ${(inputValue.length) > 0 ? style.shrink : ''}`}>
                {labelText}
            </label >
            {error &&
                <div className={style.errorMessage}>{error} </div>
            }
        </Fragment>
    )

}

export default FormInput;