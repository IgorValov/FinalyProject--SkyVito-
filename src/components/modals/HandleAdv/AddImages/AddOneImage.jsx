import React from 'react'
import style from './style.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { imagesSelector } from '../../../../store/selectors/imagesSelector'
import { setAdvImages } from '../../../../store/actionCreators/advImages'
import { putImageToAdv } from '../../../../lib/lib'
import { rerender } from '../../../../store/actionCreators/rerender'
import UiCloseIcon from '../../../UI/UiCloseIcon/UiCloseIcon'

const AddOneImage = ({ background, isNew, adData, setFormValid }) => {
  const images = useSelector(imagesSelector)
  const dispatch = useDispatch()

  const handleImage = (event) => {
    const file = event.target.files[0]
    setFormValid(true)

    if (!isNew) {
      putImageToAdv(adData.id, file, dispatch, setAdvImages)
      dispatch(rerender())
      return
    }

    for (let i = 0; i < images.length; i++) {
      if (!images[i]) {
        images[i] = file
        break
      }
    }

    dispatch(rerender())
    dispatch(setAdvImages(images))
  }

  return (
    <div className={style.imageItem}>
      {background === 'not uploaded' ? (
        <label htmlFor="uploadInput" className={style.imageNotUploaded} />
      ) : (
        <label htmlFor="uploadInput" className={style.imageUploaded} />
      )}
      <input
        id="uploadInput"
        type="file"
        className={style.input}
        onChange={(e) => handleImage(e)}
      />
      <UiCloseIcon />
    </div>
  )
}

export default AddOneImage
