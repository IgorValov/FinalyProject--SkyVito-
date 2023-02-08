import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import HeaderWithLogo from '../../components/HeaderWithLogo/HeaderWithLogo'
import AdvImages from './AdvImages/AdvImages'
import SellerInfo from './SellerInfo/SellerInfo'
import MyInfo from './MyInfo/MyInfo'
import UiModal from '../../components/UI/UiModal/UiModal'
import { AnimatePresence, motion } from 'framer-motion'
import { backdropReviews } from '../../lib/constants/animationModal'
import Reviews from '../../components/modals/Reviews/Reviews'
import { useParams } from 'react-router-dom'
import $api from '../../lib/http/http'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '../../store/selectors/authSelector'
import { rerenderSelector } from '../../store/selectors/rerenderSelector'
import { setAdvImages } from '../../store/actionCreators/advImages'
import { getUserSelector } from '../../store/selectors/getUserSelector'
import { getPrettyDateAndTime } from '../../lib/lib'

const AdvDescription = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [isSeller, setIsSeller] = useState(true)
  const [adData, setAdData] = useState({})
  const [images, setImages] = useState([])
  const [showReviews, setShowReviews] = useState(false)
  const [countFeedbacks, setCountFeedbacks] = useState(0)
  const [timeOfPublished, setTimeOfPublished] = useState('')
  const isAuth = useSelector(authSelector)
  const rerender = useSelector(rerenderSelector)
  const me = useSelector(getUserSelector)

  const createArrOfImagesUrls = (data) => {
    const ImageUrls = []
    data.images?.map((el) => {
      ImageUrls.push(el.url)
    })
    return ImageUrls
  }

  const fetchAdData = async () => {
    const { data } = await $api.get(`ads/${id}`)
    data.user.id === me.id ? setIsSeller(false) : setIsSeller(true)
    setAdData(data)

    setImages(createArrOfImagesUrls(data))
    dispatch(setAdvImages(createArrOfImagesUrls(data)))

    const comments = await $api.get(`ads/${id}/comments`)
    const countOfComments = comments.data.length
    setCountFeedbacks(countOfComments)

    setTimeOfPublished(getPrettyDateAndTime(data.created_on))
  }

  useEffect(() => {
    fetchAdData()
  }, [rerender])

  const showReviewsHandle = () => {
    setShowReviews((prevState) => !prevState)
  }

  const PriceShow = () => {
    if (adData.price === undefined) {
      return '------'
    } else {
      return adData.price
    }
  }

  return (
    <div className={style.container}>
      <HeaderWithLogo isAuth={isAuth} />
      <div className={style.block}>
        <AdvImages images={images} adData={adData} isSeller={isSeller} />
        <div className={style.description}>
          <h2 className={style.title}>{adData.title}</h2>
          <div className={style.infoBlock}>
            <p className={style.time}>{'Опубликовано ' + timeOfPublished}</p>
            <p className={style.city}>{adData.city}</p>
            <div
              className={style.feedbacks}
              onClick={showReviewsHandle}
            >{`количество отзывов: ${countFeedbacks}`}</div>
          </div>
          <div className={style.price}>{`${PriceShow()} ₽`}</div>
          {isSeller ? <SellerInfo adData={adData} /> : <MyInfo adData={adData} images={images} />}
        </div>
      </div>
      <p className={style.subtitle}>Описание товара</p>
      <p className={style.productDescription}>{adData.description}</p>
      <AnimatePresence>
        {showReviews && (
          <UiModal>
            <motion.div variants={backdropReviews} initial="hidden" animate="visible" exit="exit">
              <Reviews closeModal={showReviewsHandle} adData={adData} />
            </motion.div>
          </UiModal>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdvDescription
