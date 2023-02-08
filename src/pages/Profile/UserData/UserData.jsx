import React, { useState } from 'react'
import style from './style.module.css'
import UiButton from '../../../components/UI/UiButton/UiButton'
import TitledInput from './TitledInput/TitledInput'
import { useDispatch, useSelector } from 'react-redux'
import { getUserSelector, userAvatarSelector } from '../../../store/selectors/getUserSelector'
import $api, { $fileUpload, API_URL } from '../../../lib/http/http'
import { getUserSuccess } from '../../../store/actionCreators/getUser'

const UserData = () => {
  const userData = useSelector(getUserSelector)
  const userAvatar = useSelector(userAvatarSelector)
  const initialAvatar = {
    backgroundImage: `url("${API_URL}/${userAvatar}")`,
    backgroundSize: 'cover',
    backgroundColor: '#F0F0F0',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }

  const [firstName, setFirstName] = useState(userData.name || '')
  const [lastName, setLastName] = useState(userData.surname || '')
  const [city, setCity] = useState(userData.city || '')
  const [phone, setPhone] = useState(userData.phone || '')
  const [avatar, setAvatar] = useState(initialAvatar)
  const [somethingChanged, setSomethingChanged] = useState(false)

  const dispatch = useDispatch()

  const changeInputHandler = (event) => {
    setSomethingChanged(true)
    switch (event.target.name) {
      case 'firstName': {
        setFirstName(event.target.value)
        break
      }
      case 'lastName': {
        setLastName(event.target.value)
        break
      }
      case 'city': {
        setCity(event.target.value)
        break
      }
      case 'phone': {
        setPhone(event.target.value)
        break
      }
    }
  }

  const changePhoto = async (event) => {
    const files = event.target.files
    const formData = new FormData()
    formData.append('file', files[0])
    const response = await $fileUpload.post('/user/avatar', formData)
    const photo = response.data.avatar
    const background = {
      backgroundImage: `url("${API_URL}/${photo}")`,
      backgroundSize: 'cover',
      backgroundColor: '#F0F0F0',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }
    setAvatar(background)
    setSomethingChanged(true)
  }

  const fetchNewUserData = async (event) => {
    event.preventDefault()
    const fetchData = {
      role: 'user',
      email: userData.email,
      name: firstName,
      surname: lastName,
      phone,
      city
    }
    try {
      const { data } = await $api.patch('/user', JSON.stringify(fetchData))
      dispatch(getUserSuccess(data))
      setSomethingChanged(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>Настройки профиля</h2>
      <div className={style.container}>
        <div className={style.imageBlock}>
          <div className={style.photo} style={avatar} />
          <label htmlFor="uploadInput" className={style.uploadLabel}>
            Заменить
          </label>
          <input
            type="file"
            id="uploadInput"
            className={style.changeButton}
            onChange={(e) => changePhoto(e)}
          />
        </div>
        <div className={style.inputsBlock}>
          <div className={style.firstAndLastNameBlock}>
            <TitledInput value={firstName} onChange={(e) => changeInputHandler(e)} name="firstName">
              Имя
            </TitledInput>
            <TitledInput value={lastName} onChange={(e) => changeInputHandler(e)} name="lastName">
              Фамилия
            </TitledInput>
          </div>
          <TitledInput value={city} onChange={(e) => changeInputHandler(e)} name="city">
            Город
          </TitledInput>
          <TitledInput
            value={phone}
            onChange={(e) => changeInputHandler(e)}
            width={'614px'}
            type={'tel'}
            name="phone"
          >
            Телефон
          </TitledInput>
          <div className={style.emptySpace} />
          <UiButton onClick={fetchNewUserData} disabled={!somethingChanged}>
            Сохранить
          </UiButton>
        </div>
      </div>
    </div>
  )
}

export default UserData
