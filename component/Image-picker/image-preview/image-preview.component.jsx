import Image from 'next/image';

import style from './image-preview.module.scss';

const ImagePreview = ({ pickedImage }) => {
    return (
        <div className={style.preview}>
            {!pickedImage &&
                <span>No image selected!</span>
            }
            {pickedImage &&
                <Image src={pickedImage} alt='Your selected image file' fill />
            }
        </div>
    )
}
export default ImagePreview;