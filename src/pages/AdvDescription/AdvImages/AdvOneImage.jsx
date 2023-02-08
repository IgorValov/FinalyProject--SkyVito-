import React from 'react'
import style from './style.module.css'
import UiCloseIcon from '../../../components/UI/UiCloseIcon/UiCloseIcon'
import $api, { API_URL } from '../../../lib/http/http'
import { useDispatch } from 'react-redux'
import { rerender } from '../../../store/actionCreators/rerender'
import { setAdvImages } from '../../../store/actionCreators/advImages'

const AdvOneImage = ({ id, url, isSeller }) => {
  const dispatch = useDispatch()

  const deleteImage = async () => {
    const queryUrl = new URLSearchParams()
    queryUrl.set('file_url', `${url}`)
    const response = await $api.delete(`/ads/${id}/image/?${queryUrl}`)
    const imagesUrls = response.data.images.map((el) => el.url)
    dispatch(setAdvImages(imagesUrls))
    dispatch(rerender())
  }

  return (
    <div key={Math.random() * 10000} className={style.smlImg}>
      <div
        className={style.smallImg}
        style={{
          background: `#F0F0F0 url("${API_URL}/${url}") no-repeat center`,
          backgroundSize: 'cover'
        }}
      />
      {!isSeller && <UiCloseIcon onClick={deleteImage} />}
    </div>
  )
}

export default AdvOneImage
