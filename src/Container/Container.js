import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import ImgLazy from './../ImgLazy'

const Container = forwardRef(
  (
    {
      lazyLoad, // scroll 滚动加载 | queue 队列加载
      children,
      ...others
    },
    ref
  ) => {
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return rootRef.current
    })

    // 图片懒加载
    const lazyInstance = useRef(null)
    useEffect(() => {
      if (lazyLoad !== 'scroll' && lazyLoad !== 'queue') return
      if (lazyInstance.current) {
        lazyInstance.current.load()
      } else {
        lazyInstance.current = new ImgLazy({
          overflowContainer: rootRef.current,
          load: lazyLoad
        })
        lazyInstance.current.load()
      }
    }, [children]) // eslint-disable-line

    return (
      <article
        ref={rootRef}
        {...others}
        className={`container${others.className ? ' ' + others.className : ''}`}
      >
        {children}
      </article>
    )
  }
)

export default Container
