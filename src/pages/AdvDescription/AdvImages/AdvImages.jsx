import React from 'react'
import style from './style.module.css'

import { API_URL } from '../../../lib/http/http'
import AdvOneImage from './AdvOneImage'
import { useSelector } from 'react-redux'
import { imagesSelector } from '../../../store/selectors/imagesSelector'

const AdvImages = ({ adData, isSeller }) => {
  const images = useSelector(imagesSelector)

  while (images.length < 6) images.push('')

  const smallImages = images.slice(1, 6)

  const bigImg = images[0]
  const bigImgBackground = {
    backgroundImage: `url("${API_URL}/${bigImg}")`,
    backgroundSize: 'cover',
    backgroundColor: '#F0F0F0',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.bigImg} style={bigImgBackground} />
        <div className={style.smallImagesContainer}>
          {smallImages.map((el) => (
            <AdvOneImage key={Math.random() * 10000} id={adData.id} url={el} isSeller={isSeller} />
          ))}
        </div>
      </div>
    </>
  )
}

export default AdvImages
