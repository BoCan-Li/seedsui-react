// require PrototypeString.js
import React, { forwardRef, useContext } from 'react'
import Context from '../Context/instance.js'

const InputSafe = forwardRef(({ value = '', ...others }, ref) => {
  // context
  const context = useContext(Context) || {}
  const locale =
    context.locale ||
    function (remark) {
      return remark || ''
    }

  var lvl = value.safeLvl()
  return (
    <ul
      ref={ref}
      {...others}
      className={`input-safe lvl${lvl}${others.className ? ' ' + others.className : ''}`}
    >
      <li>
        <div className="input-safe-progress"></div>
        <span className="input-safe-caption">{locale('弱', 'low')}</span>
      </li>
      <li>
        <div className="input-safe-progress"></div>
        <span className="input-safe-caption">{locale('中', 'medium')}</span>
      </li>
      <li>
        <div className="input-safe-progress"></div>
        <span className="input-safe-caption">{locale('强', 'strong')}</span>
      </li>
    </ul>
  )
})

export default InputSafe
