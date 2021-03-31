import React, { forwardRef, useEffect } from 'react'
import Instance from './instance'

const InputRange = forwardRef(
  (
    {
      value = 0,
      min = 0,
      max = 100,
      step = 1,
      disabled,
      inputAttribute = {},
      tooltipAttribute = {},
      onChange,
      ...others
    },
    ref
  ) => {
    const rootRef = useRef(null)
    const inputRef = useRef(null)
    const tooltipRef = useRef(null)
    
    useImperativeHandle(ref, () => {
      return rootRef.current
    })

    useEffect(() => {
      if (rootRef.current) {
        rootRef.current.instance = new Instance(rootRef.current, {
          onChange: handleChange(e)
        })
      }
    }, []) // eslint-disable-line

    function handleChange(e) {
      if (onChange) {
        onChange(e, inputRef.current.value)
      }
    }
    return (
      <div
        ref={rootRef}
        {...others}
        className={`range${others.className ? ' ' + others.className : ''}`}
      >
        <input
          ref={inputRef}
          {...inputAttribute}
          disabled={disabled}
          type="range"
          className={`range-input${inputAttribute.className ? ' ' + inputAttribute.className : ''}`}
          min={min}
          max={max}
          step={step}
          defaultValue={value}
        />
        <div
          ref={tooltipRef}
          {...tooltipAttribute}
          className={`range-tooltip${
            tooltipAttribute.className ? ' ' + tooltipAttribute.className : ''
          }`}
        >
          {value}
        </div>
      </div>
    )
  }
)

export default InputRange
