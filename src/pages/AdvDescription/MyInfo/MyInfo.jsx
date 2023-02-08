import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import UiButton from '../../../components/UI/UiButton/UiButton'
import { AnimatePresence, motion } from 'framer-motion'
import { backdropNewADV } from '../../../lib/constants/animationModal'
import HandleAdv from '../../../components/modals/HandleAdv/HandleAdv'
import UiModal from '../../../components/UI/UiModal/UiModal'
import { useSelector } from 'react-redux'
import {
  userAvatarSelector,
  userNameSelector,
  userSinceSelector
} from '../../../store/selectors/getUserSelector'
import { monthConverter } from '../../../lib/lib'
import $api, { API_URL } from '../../../lib/http/http'
import { useNavigate } from 'react-router-dom'

const MyInfo = ({ adData, images }) => {
  const [showEditAdv, setShowEditAdv] = useState(false)
  const [sinceDate, setSinceDate] = useState('')
  const firstName = useSelector(userNameSelector)
  const since = useSelector(userSinceSelector)
  const avatar = useSelector(userAvatarSelector)
  const navigate = useNavigate()

  useEffect(() => {
    const prettyDate = monthConverter(since)
    setSinceDate(prettyDate)
  }, [since])

  const showEditAdvHandle = () => {
    setShowEditAdv((prevState) => !prevState)
  }

  const deleteAdv = async () => {
    await $api.delete(`/ads/${adData.id}`)
    navigate('/')
  }

  const backgroundIcon = {
    backgroundImage: `url("${API_URL}/${avatar}")`,
    backgroundSize: 'cover',
    backgroundColor: '#F0F0F0',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }

  return (
    <div className={style.container}>
      <div className={style.buttonBlock}>
        <UiButton onClick={showEditAdvHandle}>Редактировать</UiButton>
        <UiButton onClick={deleteAdv}>Снять с публикации</UiButton>
      </div>
      <div className={style.myInfo}>
        <div className={style.myIcon} style={backgroundIcon} />
        <div className={style.about}>
          <p className={style.name} onClick={() => navigate('/profile')}>
            {firstName}
          </p>
          <p className={style.since}>Продает товары с {sinceDate}</p>
        </div>
      </div>
      <AnimatePresence>
        {showEditAdv && (
          <UiModal>
            <motion.div variants={backdropNewADV} initial="hidden" animate="visible" exit="exit">
              <HandleAdv
                closeModal={showEditAdvHandle}
                title="Редактировать объявление"
                isNew={false}
                adData={adData}
                oldImages={images}
              />
            </motion.div>
          </UiModal>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MyInfo
