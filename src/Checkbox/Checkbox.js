import React, { forwardRef } from 'react'

const Checkbox = forwardRef(
  (
    {
      type, // checkbox或者radio, 不对外开放
      value,
      checked,

      disabled,

      inputAttribute = {},

      caption,
      captionAttribute = {},
      onClick,
      ...others
    },
    ref
  ) => {
    function clickHandler(e, isChecked) {
      if (disabled) return
      if (onClick) onClick(e, isChecked)
    }
    let typeClassPrefix = type === 'radio' ? 'radio' : 'checkbox'
    return (
      <div
        ref={ref}
        {...others}
        onClick={(e) => {
          clickHandler(e, e.target.getAttribute('data-checked') === 'true')
        }}
        disabled={disabled}
        data-checked={checked}
        data-value={value}
        className={`${typeClassPrefix}${others.className ? ' ' + others.className : ''}`}
      >
        <span
          {...inputAttribute}
          className={`${typeClassPrefix}-input${
            inputAttribute.className ? ' ' + inputAttribute.className : ''
          }`}
        />
        {caption && (
          <span
            {...captionAttribute}
            className={`${typeClassPrefix}-caption${
              captionAttribute.className ? ' ' + captionAttribute.className : ''
            }`}
          >
            {caption}
          </span>
        )}
      </div>
    )
  }
)

export default Checkbox
