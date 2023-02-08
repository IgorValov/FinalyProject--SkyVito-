import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import HeaderWithLogo from '../../components/HeaderWithLogo/HeaderWithLogo'
import ButtonShowTel from '../../components/UI/ButtonShowTel/ButtonShowTel'
import Ads from '../../components/Ads/Ads'
import { useParams } from 'react-router-dom'
import $api, { API_URL } from '../../lib/http/http'
import { monthConverter } from '../../lib/lib'
import { useSelector } from 'react-redux'
import { authSelector } from '../../store/selectors/authSelector'

const SellerProfile = () => {
  const { id } = useParams()
  const initialProfileData = {
    id: 0,
    avatar: '',
    city: '',
    name: '',
    phone: '',
    sells_from: ''
  }
  const initialBackground = {
    backgroundImage: `url("")`,
    backgroundSize: 'cover',
    backgroundColor: '#F0F0F0',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }

  const [profileData, setProfileData] = useState(initialProfileData)
  const [avatar, setAvatar] = useState(initialBackground)
  const [allAds, setAllAds] = useState([])
  const [ads, setAds] = useState([])
  const isAuth = useSelector(authSelector)

  const fetchProfileData = async () => {
    const { data } = await $api.get(`/ads/${id}`)
    const { user } = await data
    setProfileData(user)
  }
  const fetchAllAds = async () => {
    const { data } = await $api.get(`/ads/?sorting=new`)
    setAllAds(data)
  }

  useEffect(() => {
    fetchProfileData()
    fetchAllAds()
  }, [])

  useEffect(() => {
    if (profileData.avatar !== null)
      setAvatar({
        backgroundImage: `url("${API_URL}/${profileData.avatar}")`,
        backgroundSize: 'cover',
        backgroundColor: '#F0F0F0',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      })
  }, [profileData])

  useEffect(() => {
    const ads = allAds.filter((el) => el.user?.id === profileData?.id)
    setAds(ads)
  }, [profileData, allAds])

  return (
    <div className={style.container}>
      <HeaderWithLogo isAuth={isAuth} />
      <p className={style.title}>Профиль продавца</p>
      <div className={style.profileBlock}>
        <div className={style.sellerPhoto} style={avatar} />
        <div className={style.aboutBlock}>
          <div className={style.infoBlock}>
            <p className={style.name}>{profileData.name}</p>
            <p className={style.city}>{profileData.city}</p>
            <p className={style.since}>Продает товары с {monthConverter(profileData.sells_from)}</p>
          </div>
          <ButtonShowTel isAuth={isAuth} tel={profileData.phone} />
        </div>
      </div>
      <div className={style.productBlock}>
        <p className={style.subtitle}>Товары продавца</p>
        <Ads ads={ads} />
      </div>
    </div>
  )
}

export default SellerProfile
