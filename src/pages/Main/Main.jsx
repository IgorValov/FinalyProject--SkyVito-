import React, { useEffect, useState } from 'react'
import Header from './Header/Header'
import style from './style.module.css'
import Search from './Search/Search'
import Ads from '../../components/Ads/Ads'
import $api from '../../lib/http/http'
import AdSkeletons from '../../components/UI/AdSkeletons/AdSkeletons'

const Main = ({ isAuth }) => {
  const [ads, setAds] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortedAds, setSortedAds] = useState([])

  const fetchAllAds = async () => {
    setLoading(true)
    const { data } = await $api.get(`/ads/?sorting=new`)
    setAds(data)
    setLoading(false)
  }
  const getSortedAds = () => {
    if (!searchQuery) {
      setSortedAds(ads)
    } else {
      setSortedAds(
        [...ads].filter((el) => el.title.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }
  }

  useEffect(() => {
    fetchAllAds()
  }, [])

  useEffect(() => {
    getSortedAds()
  }, [ads])

  return (
    <div className={style.container}>
      <Header isAuth={isAuth} />
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSubmit={getSortedAds} />
      {loading ? <AdSkeletons /> : <Ads ads={sortedAds} />}
    </div>
  )
}

export default Main
