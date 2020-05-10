import React, {forwardRef} from 'react';

const Radio = forwardRef(({
  value,
  checked,

  inputAttribute = {},

  caption,
  captionAttribute = {},
  onClick,
  ...others
}, ref) =>  {
  return <div ref={ref} {...others} onClick={(e) => {if (onClick) onClick(e, e.target.getAttribute('data-checked') === 'true')}} data-checked={checked} data-name={value} className={`radio${others.className ? ' ' + others.className : ''}`}>
    <span {...inputAttribute} className={`radio-input${inputAttribute.className ? ' ' + inputAttribute.className : ''}`}/>
    {caption && <span {...captionAttribute} className={`radio-caption${captionAttribute.className ? ' ' + captionAttribute.className : ''}`}>{caption}</span>}
  </div>
})

export default Radio
