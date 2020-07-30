// require PrototypeString.js
import React, {forwardRef, useContext} from 'react';
import Context from '../Context/instance.js';

const InputSafe = forwardRef(({
  value = '',
  ...others
}, ref) =>  {
    // context
    const context = useContext(Context) || {};
    const locale = context.locale || function (key) {return key || ''};

    var lvl = value.safeLvl();
    return <ul ref={ref} {...others} className={`input-safe lvl${lvl}${others.className ? ' ' + others.className : ''}`}> 
      <li> 
        <div className="input-safe-progress"></div>
        <span className="input-safe-caption">{locale('low') || '弱'}</span>
      </li> 
      <li> 
        <div className="input-safe-progress"></div>
        <span className="input-safe-caption">{locale('medium') || '中'}</span>
      </li> 
      <li> 
        <div className="input-safe-progress"></div>
        <span className="input-safe-caption">{locale('strong') || '强'}</span>
      </li> 
    </ul>;
})

export default InputSafe
