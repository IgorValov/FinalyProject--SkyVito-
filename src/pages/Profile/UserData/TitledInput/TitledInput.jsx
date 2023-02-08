import React, { useState } from 'react'
import style from './style.module.css'

const TitledInput = ({ children, ...props }) => {
  const [titleColor, setTitleColor] = useState({ color: '#C4C4C4' })

  const focusedTitleColor = () => {
    setTitleColor({ color: '#009ee4' })
  }
  const unfocusedTitleColor = () => {
    setTitleColor({ color: '#C4C4C4' })
  }

  return (
    <div className={style.inputBlock}>
      <div className={style.inputTitle} style={titleColor}>
        {children}
      </div>
      <input
        className={style.input}
        style={{ width: props.width }}
        onFocus={focusedTitleColor}
        onBlur={unfocusedTitleColor}
        onChange={props.onChange}
        type={props.type}
        name={props.name}
        value={props.value}
      />
    </div>
  )
}

export default TitledInput
