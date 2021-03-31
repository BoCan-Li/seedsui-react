import React, { forwardRef, useContext } from 'react'
import { createPortal } from 'react-dom'
import locale from './../locale' // 国际化数据

const Loading = forwardRef(
  (
    {
      portal,
      type = 'floating',
      maskAttribute = {},
      iconAttribute,
      captionAttribute = {},
      children,
      caption = locale('加载中...', 'loading'),
      ...others
    },
    ref
  ) => {
    let content = null
    if (type === 'custom') {
      // 自定义样式
      content = (
        <div
          {...others}
          className={`loading-custom${others.className ? ' ' + others.className : ''}`}
        >
          {iconAttribute && (
            <span
              {...iconAttribute}
              className={`loading-custom-icon${
                iconAttribute.className ? ' ' + iconAttribute.className : ''
              }`}
            ></span>
          )}
          {caption && (
            <p
              {...captionAttribute}
              className={`loading-custom-caption${
                captionAttribute.className ? ' ' + captionAttribute.className : ''
              }`}
            >
              {caption}
            </p>
          )}
        </div>
      )
    } else if (type === 'filling') {
      // 填料环
      content = (
        <div
          {...others}
          className={`loading-filling active${others.className ? ' ' + others.className : ''}`}
        >
          <div className="loading-filling-icon"></div>
        </div>
      )
    } else if (type === 'floating') {
      // 流光
      content = (
        <div
          {...others}
          className={`loading-floating animated${others.className ? ' ' + others.className : ''}`}
        >
          <div className="loading-floating-icon">
            <div className="loading-floating-blade"></div>
            <div className="loading-floating-blade"></div>
            <div className="loading-floating-blade"></div>
            <div className="loading-floating-blade"></div>
            <div className="loading-floating-blade"></div>
            <div className="loading-floating-blade"></div>
            <div className="loading-floating-blade"></div>
            <div className="loading-floating-blade"></div>
            <div className="loading-floating-blade"></div>
            <div className="loading-floating-blade"></div>
            <div className="loading-floating-blade"></div>
            <div className="loading-floating-blade"></div>
          </div>
          {caption && (
            <div
              {...captionAttribute}
              className={`loading-floating-caption${
                captionAttribute.className ? ' ' + captionAttribute.className : ''
              }`}
            >
              {caption}
            </div>
          )}
        </div>
      )
    }
    if (portal) {
      return createPortal(
        <div
          ref={ref}
          {...maskAttribute}
          className={
            'loading-mask mask active' +
            (maskAttribute.className ? ' ' + maskAttribute.className : '')
          }
        >
          {content}
          {children}
        </div>,
        portal
      )
    }
    return (
      <div
        ref={ref}
        {...maskAttribute}
        className={
          'loading-mask mask active' +
          (maskAttribute.className ? ' ' + maskAttribute.className : '')
        }
      >
        {content}
        {children}
      </div>
    )
  }
)

export default Loading
