import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import UiCloseButton from '../../UI/UiCloseButton/UiCloseButton'
import UiButton from '../../UI/UiButton/UiButton'
import Review from './Review/Review'
import $api from '../../../lib/http/http'

const Reviews = ({ closeModal, adData }) => {
  const [formValid, setFormValid] = useState(false)
  const [newReview, setNewReview] = useState('')
  const [updateReviews, setUpdateReviews] = useState(1)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    newReview ? setFormValid(true) : setFormValid(false)
  }, [newReview])

  const addNewReview = async () => {
    const data = {
      text: newReview
    }
    await $api.post(`/ads/${adData.id}/comments`, JSON.stringify(data))
    setNewReview('')
    setUpdateReviews((prev) => prev + 1)
  }

  const getAllReviews = async () => {
    const response = await $api.get(`ads/${adData.id}/comments`)
    setReviews(response.data)
  }

  useEffect(() => {
    getAllReviews()
  }, [updateReviews])

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <p className={style.title}>Отзывы о товаре</p>
        <UiCloseButton onClick={() => closeModal()} />
      </div>
      <div className={style.container}>
        <div className={style.inputSection}>
          <p>Добавить отзыв</p>
          <textarea
            className={style.input}
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addNewReview()
            }}
          />
          <UiButton disabled={!formValid} onClick={addNewReview}>
            Опубликовать
          </UiButton>
          <div className={style.reviewsSection}>
            {reviews.map((el) => (
              <Review key={Math.random() * 10000} reviewData={el} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reviews
