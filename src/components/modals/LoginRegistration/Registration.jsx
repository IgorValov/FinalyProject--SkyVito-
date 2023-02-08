import React, { useEffect, useState } from 'react'
import UiButton from '../../UI/UiButton/UiButton'
import Logo from '../../Logo/Logo'
import styles from './style.module.css'
import { motion } from 'framer-motion'
import UiCloseButton from '../../UI/UiCloseButton/UiCloseButton'
import $api from '../../../lib/http/http'
import { login } from '../../../store/actionCreators/auth'
import { useDispatch } from 'react-redux'
import { fetchGetUser } from '../../../store/thunks/getUserThunk'
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner'

export function Registration({ closeModal }) {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userCity, setUserCity] = useState('')
  const [emailVisited, setEmailVisited] = useState(false)
  const [passwordVisited, setPasswordVisited] = useState(false)
  const [emailError, setEmailError] = useState('Логин не может быть пустым')
  const [passwordError, setError] = useState('Пароль не может быть пустым')
  const [formValid, setFormValid] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)

  const passwordHandler = (event) => {
    switch (event.target.name) {
      case 'password':
        setPassword(event.target.value)
        break
      case 'passwordRepeat':
        setPasswordRepeat(event.target.value)
        break
    }
    if (event.target.value.length < 8 || event.target.value.length > 16) {
      setError('Пароль должен быть от 8 до 16 символов')
      if (!event.target.value) {
        setError('Пароль не может быть пустым')
      }
    } else {
      setError('')
    }
  }

  const emailHandler = (event) => {
    const email = event.target.value
    setEmail(email)
    email ? setEmailError('') : setEmailError('E-mail не может быть пустым')
    const regex = /.+@.+\..+/i
    regex.test(String(email).toLowerCase())
      ? setEmailError('')
      : setEmailError('Некорректный e-mail')
  }

  const blurHandler = (event) => {
    switch (event.target.name) {
      case 'email':
        setEmailVisited(true)
        break
      case 'password':
        setPasswordVisited(true)
        break
    }
  }

  const unnecessaryInputHandler = (event) => {
    const value = event.target.value
    const name = event.target.name
    switch (name) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
        break
      case 'userCity':
        setUserCity(value)
        break
    }
  }

  useEffect(() => {
    emailError || passwordError ? setFormValid(false) : setFormValid(true)
  }, [emailError, passwordError])

  const comparePasswords = (event) => {
    event.preventDefault()
    if (!passwordRepeat) {
      setError('Повторите пароль')
      return
    }
    password === passwordRepeat ? createUser() : setError('Пароли не совпадают')
  }

  async function createUser() {
    setLoginLoading(true)
    const userData = {
      email,
      password,
      name: firstName,
      surname: lastName,
      city: userCity
    }
    const tokensData = {
      email,
      password
    }
    try {
      const response = await $api.post('/auth/register', JSON.stringify(userData))
      const tokens = await $api.post('/auth/login', JSON.stringify(tokensData))
      localStorage.setItem('accessToken', tokens.data.access_token)
      localStorage.setItem('refreshToken', tokens.data.refresh_token)
      dispatch(login())
      dispatch(fetchGetUser())
      closeModal()
    } catch (error) {
      setError('Не получилось, описание в консоли')
      console.log(error.message)
    } finally {
      setLoginLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className={styles.container}
    >
      <div className={styles.loginModalBlock}>
        <div className={styles.inputBlock}>
          <Logo />
          <UiCloseButton onClick={closeModal} />

          {emailVisited && emailError && <div className={styles.loginError}>{emailError}</div>}
          <input
            className={styles.input}
            onChange={emailHandler}
            value={email}
            onBlur={blurHandler}
            name="email"
            placeholder="email"
            type="text"
          />

          {passwordVisited && passwordError && (
            <div className={styles.passwordError}>{passwordError}</div>
          )}
          <input
            className={styles.input}
            onChange={(event) => passwordHandler(event)}
            value={password}
            onBlur={blurHandler}
            name="password"
            placeholder="Пароль"
            type="password"
          />

          <input
            className={styles.input}
            onChange={(event) => passwordHandler(event)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') comparePasswords(event)
            }}
            name="passwordRepeat"
            placeholder="Повторите пароль"
            type="password"
          />

          <input
            className={styles.input}
            onChange={(event) => unnecessaryInputHandler(event)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') comparePasswords(event)
            }}
            value={firstName}
            name="firstName"
            placeholder="Имя (необязательно)"
            type="firstName"
          />

          <input
            className={styles.input}
            onChange={(event) => unnecessaryInputHandler(event)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') comparePasswords(event)
            }}
            value={lastName}
            name="lastName"
            placeholder="Фамилия (необязательно)"
            type="lastName"
          />

          <input
            className={styles.input}
            onChange={(event) => unnecessaryInputHandler(event)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') comparePasswords(event)
            }}
            value={userCity}
            name="userCity"
            placeholder="Город (необязательно)"
            type="userCity"
          />
        </div>
        <div className={styles.buttonBlock}>
          <UiButton disabled={!formValid} onClick={comparePasswords}>
            Зарегистрироваться
          </UiButton>
        </div>
        {loginLoading && <LoadingSpinner />}
      </div>
    </motion.div>
  )
}
