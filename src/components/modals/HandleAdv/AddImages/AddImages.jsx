import React from 'react'
import style from './style.module.css'
import AddOneImage from './AddOneImage'
import { useSelector } from 'react-redux'
import { imagesSelector } from '../../../../store/selectors/imagesSelector'
import { rerenderSelector } from '../../../../store/selectors/rerenderSelector'

const AddImages = ({ isNew, adData, setFormValid }) => {
  const images = useSelector(imagesSelector)
  const rerender = useSelector(rerenderSelector)

  while (images.length > 5) images.pop()

  const background = (el) => {
    if (el) {
      return 'uploaded'
    } else {
      return 'not uploaded'
    }
  }

  return (
    <div className={style.images}>
      {rerender &&
        images.map((el) => (
          <AddOneImage
            key={Math.random() * 10000}
            background={background(el)}
            isNew={isNew}
            adData={adData}
            setFormValid={setFormValid}
          />
        ))}
    </div>
  )
}

export default AddImages
