import React from 'react'
import style from './style.module.css'
import { API_URL } from '../../../../lib/http/http'

const Review = ({ reviewData }) => {
  const background = {
    backgroundImage: `url("${API_URL}/${reviewData.author?.avatar}")`,
    backgroundSize: 'cover',
    backgroundColor: '#F0F0F0',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }
  return (
    <div className={style.wrapper}>
      <div className={style.icon} style={background} />
      <div className={style.container}>
        <div className={style.about}>
          <p className={style.author}>{reviewData.author.name}</p>
          <p className={style.date}>{reviewData.created_on}</p>
        </div>
        <div className={style.reviewBlock}>
          <p className={style.reviewTitle}>Комментарий</p>
          <p className={style.reviewText}>{reviewData.text}</p>
        </div>
      </div>
    </div>
  )
}

export default Review
