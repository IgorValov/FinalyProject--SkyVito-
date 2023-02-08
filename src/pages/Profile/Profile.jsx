import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import UserData from './UserData/UserData'
import Ads from '../../components/Ads/Ads'
import HeaderWithLogo from '../../components/HeaderWithLogo/HeaderWithLogo'
import { useSelector } from 'react-redux'
import { userNameSelector } from '../../store/selectors/getUserSelector'
import $api from '../../lib/http/http'

const Profile = () => {
  const name = useSelector(userNameSelector)
  const [ads, setAds] = useState([])

  const getMyAds = async () => {
    const { data } = await $api.get('/ads/me/?sorting=new')
    setAds(data)
  }

  useEffect(() => {
    getMyAds()
  }, [])

  return (
    <div className={style.container}>
      <HeaderWithLogo isAuth={true} />
      <h1 className={style.greetings}>{`Здравствуйте, ${name}!`}</h1>
      <UserData />
      <p className={style.subtitle}>Мои товары</p>
      <Ads ads={ads} />
    </div>
  )
}

export default Profile
