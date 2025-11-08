
import ImagePreview from './image-preview/image-preview.component';

import style from './image-picker.module.scss';

const ImagePicker = ({ name, onClickPickImageButton, pickedImage, ...otherInputProps }) => {
    return (
        <div className={`${style.group} ${style.pickedImageGroup}`}>
            <input type="file"
                id={name}
                name={name}
                className={style.fileInput}
                accept='image/png, image/jpg, image/jpeg'
                {...otherInputProps} />
            <button type='button'
                className={style.pickImageButton}
                onClick={onClickPickImageButton}>
                Pick a Image
            </button>
            <ImagePreview pickedImage={pickedImage} />
        </div>
    )
}
export default ImagePicker;