import React from 'react'
import styles from './style.module.css'
import Logo from '../../components/Logo/Logo'

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <Logo />
      <h1 className={styles.title}>Такой страницы не существует</h1>
    </div>
  )
}

export default NotFound
