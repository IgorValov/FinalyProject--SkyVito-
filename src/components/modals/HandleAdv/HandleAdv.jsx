import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import UiCloseButton from '../../UI/UiCloseButton/UiCloseButton'
import AddImages from './AddImages/AddImages'
import UiButton from '../../UI/UiButton/UiButton'
import $api, { $fileUpload } from '../../../lib/http/http'
import { createFormData } from '../../../lib/lib'
import { useDispatch, useSelector } from 'react-redux'
import { imagesSelector } from '../../../store/selectors/imagesSelector'
import { setAdvImages } from '../../../store/actionCreators/advImages'
import { rerender } from '../../../store/actionCreators/rerender'

const HandleAdv = ({ closeModal, title, isNew, adData, oldImages }) => {
  const [formValid, setFormValid] = useState(false)
  const [newTitle, setNewTitle] = useState(adData?.title || '')
  const [description, setDescription] = useState(adData?.description || '')
  const [price, setPrice] = useState(adData?.price || '')

  const dispatch = useDispatch()
  const images = useSelector(imagesSelector)

  useEffect(() => {
    const maxNumberOfPhoto = 5
    const prettyArr = oldImages || []
    while (prettyArr.length < maxNumberOfPhoto) prettyArr.push('')
    while (prettyArr.length > maxNumberOfPhoto) prettyArr.pop()
    dispatch(setAdvImages(prettyArr))
  }, [])

  const handleChanges = (event) => {
    const value = event.target.value
    switch (event.target.name) {
      case 'title':
        setNewTitle(value)
        break
      case 'description':
        setDescription(value)
        break
      case 'price':
        setPrice(value)
        break
    }
    if (newTitle) setFormValid(true)
  }

  const createImagesRequest = async (images) => {
    const formData = createFormData(images)

    const queryTitle = new URLSearchParams()
    queryTitle.set('title', `${newTitle}`)
    const queryDescription = new URLSearchParams()
    queryDescription.set('description', `${description}`)
    const queryPrice = new URLSearchParams()
    queryPrice.set('price', `${price}`)
    if (!images.find((el) => el !== '')) {
      await $api.post(`/adstext`, { title: newTitle, description, price })
    } else {
      await $fileUpload.post(`ads/?${queryTitle}&${queryDescription}&${queryPrice}`, formData)
    }
    closeModal()
  }

  const changeDescription = async () => {
    const data = {
      title: newTitle,
      description,
      price
    }
    await $api.patch(`/ads/${adData.id}`, JSON.stringify(data))
    closeModal()
    dispatch(rerender())
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.title}>{title}</h2>
        <UiCloseButton onClick={() => closeModal()} />
      </div>
      <div className={style.description}>
        <p>Название</p>
        <input
          className={style.nameInput}
          value={newTitle}
          name="title"
          placeholder="Введите название"
          onChange={(e) => handleChanges(e)}
        />
      </div>
      <div className={style.description}>
        <p>Описание</p>
        <textarea
          className={style.descriptionArea}
          value={description}
          name="description"
          placeholder="Введите описание"
          onChange={(e) => handleChanges(e)}
        />
      </div>
      <div className={style.ImgBlock}>
        <div className={style.signBlock}>
          <p>Фотографии товара</p>
          <p className={style.postSign}>не более 5 фотографий</p>
        </div>

        <AddImages name="images" isNew={isNew} adData={adData} setFormValid={setFormValid} />
      </div>
      <div className={style.priceBlock}>
        <p>Цена</p>
        <div className={style.priceInputField}>
          <input
            className={style.priceInput}
            value={price}
            name="price"
            onChange={(e) => handleChanges(e)}
          />
          <p>₽</p>
        </div>
      </div>
      <div className={style.buttonPosition}>
        {isNew ? (
          <UiButton disabled={!formValid} onClick={() => createImagesRequest(images)}>
            Опубликовать
          </UiButton>
        ) : (
          <UiButton disabled={!formValid} onClick={changeDescription}>
            Сохранить
          </UiButton>
        )}
      </div>
    </div>
  )
}

export default HandleAdv
