import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import { useNavigate } from 'react-router-dom'
import ButtonShowTel from '../../../components/UI/ButtonShowTel/ButtonShowTel'
import { useSelector } from 'react-redux'
import { authSelector } from '../../../store/selectors/authSelector'
import { API_URL } from '../../../lib/http/http'
import { monthConverter } from '../../../lib/lib'

const SellerInfo = ({ adData }) => {
  const navigate = useNavigate()
  const isAuth = useSelector(authSelector)
  const [sellerName, setSellerName] = useState('')
  const [since, setSince] = useState('')
  const [tel, setTel] = useState('')
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    setSellerName(adData.user?.name)
    if (adData?.user?.sells_from) setSince(monthConverter(adData.user.sells_from))
    if (adData.user?.avatar) setAvatar(adData.user.avatar)
    setTel(adData.user?.phone)
  }, [adData?.user])

  const backgroundIcon = {
    backgroundImage: `url("${API_URL}/${avatar}")`,
    backgroundSize: 'cover',
    backgroundColor: '#F0F0F0',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }

  return (
    <div className={style.container}>
      <ButtonShowTel tel={tel} isAuth={isAuth} />
      <div className={style.sellerInfo}>
        <div className={style.sellerIcon} style={backgroundIcon} />
        <div className={style.sellerAbout}>
          <p
            className={style.sellerName}
            onClick={() => {
              navigate(`/seller-profile/${adData.id}`)
            }}
          >
            {sellerName}
          </p>
          <p className={style.since}>Продает товары с {since}</p>
        </div>
      </div>
    </div>
  )
}

export default SellerInfo
