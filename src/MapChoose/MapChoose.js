import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useContext,
  useState,
  useEffect
} from 'react'
import { createPortal } from 'react-dom'
import MapUtil from './../MapUtil'
import Page from './../Page'
import Header from './../Header'
import Container from './../Container'
import Footer from './../Footer'
import Notice from './../Notice'
import Bridge from './../Bridge'
import Wrapper from './Wrapper'
import Close from './Close'
import Location from './Location'
import helper from './helper'
import Context from './../Context/instance.js'

const MapChoose = forwardRef(
  (
    {
      ak, // 百度地图key
      show = true, // 百度地图不能移除DOM, 再渲染
      portal,
      caption,
      autoLocation,
      onHide,
      onChange,
      // 其它属性
      center = '江苏省,南京市',
      // 标记点
      address, // 初始化标记地址, 传入地址是为了初始化point时, 不用地址逆解析
      point, // 初始化标记点, [118.798128, 31.968592] => 南京南站
      // 子元素
      header,
      children
    },
    ref
  ) => {
    // 创建ref, useRef每次都会返回相同的引用, 所以用createRef
    const rootRef = useRef(null)
    const wrapperRef = useRef(null)
    useImperativeHandle(ref, () => {
      return rootRef.current
    })
    // context
    const context = useContext(Context) || {}
    const locale =
      context.locale ||
      function (remark) {
        return remark || ''
      }

    const [errMsg, setErrMsg] = useState('')
    let [addr, setAddr] = useState(address || '')
    let [data, setData] = useState(null)

    useEffect(() => {
      if (!window.BMap && !ak) {
        setErrMsg(locale('请传入百度地图ak', 'hint_map_ak'))
        return
      }
      MapUtil.load({
        ak: ak,
        success: () => {
          initData()
        },
        fail: () => {
          setErrMsg(locale('地图库加载失败, 请稍后再试', 'hint_map_failed_load'))
        }
      })
      // 移除组件时注销
      return () => {
        helper.destroy()
      }
    }, []) // eslint-disable-line

    // 隐藏时, 移除标注
    // useEffect(() => {
    //   if (show === false) {
    //     helper.destroy();
    //   }
    // }, [show])

    // 初始化地图
    function initData() {
      if (!window.BMap) {
        // 如果有高德地图, 则加上 || !window.AMap
        setErrMsg(locale('地图库加载失败, 请稍后再试', 'hint_map_failed_load'))
        return
      }
      console.log('初始化地图' + center)
      if (!wrapperRef.current) {
        setErrMsg(locale('地图容器不存在', 'hint_map_no_container'))
        return
      }
      // 拖拽结束回调
      helper.onDragEnd = function (res) {
        addr = res && res.address ? res.address : ''
        setAddr(addr)
        setData(res)
      }
      // 初始化地图
      helper.initMap(wrapperRef.current, center, (result) => {
        if (typeof result === 'string') {
          setErrMsg(result)
          return
        }
        // 自动定位
        if (!point && autoLocation) {
          locationHandler()
        }
      })
    }

    // 立即定位
    function locationHandler() {
      Bridge.debug = true
      Bridge.getLocation({
        type: 'gcj02',
        success: async (data) => {
          // 客户端中不需要getAddress
          if (data.address) {
            helper.drawMarker([data.longitude, data.latitude])
            setAddr(addr)
            setData(data)
            return
          }
          // 其它平台, 绘制标记后地址逆向解析, 并回调self.onDragEnd
          helper.initMarker([data.longitude, data.latitude], (result) => {
            addr = result && result.address ? result.address : ''
            setAddr(addr)
            setData(result)
          })
        },
        fail: (res) => {
          Bridge.showToast(res.errMsg, { mask: false })
        }
      })
    }

    // 提交
    function submitHandler() {
      if (onChange) {
        if (data && data.point && data.point.length === 2) {
          data.longitude = data.point[0]
          data.latitude = data.point[1]
        }
        onChange({ target: rootRef.current }, addr, data)
      }
    }

    // 绘制标记点
    useEffect(() => {
      if (point && point.length === 2 && show) {
        if (!address) {
          console.log('初始化标记')
          helper.initMarker(point, (result) => {
            addr = result && result.address ? result.address : ''
            setAddr(addr)
            setData(result)
          })
        } else {
          console.log('更新标记')
          helper.drawMarker(point)
        }
      }
    }, [point]) // eslint-disable-line

    // 更新地址
    useEffect(() => {
      setAddr(address)
    }, [address]) // eslint-disable-line

    // 标题
    useEffect(() => {
      if (caption && show) {
        Bridge.setTitle(caption)
      }
    }, [caption])

    // 中断绘制
    useEffect(() => {
      if (show) {
        if (errMsg) {
          helper.abort = true
        } else {
          helper.abort = false
        }
      }
    }, [errMsg])

    const DOM = (
      <Page ref={rootRef} className={show ? '' : 'hide'}>
        {header && <Header>{header}</Header>}
        <Container>
          <Wrapper ref={wrapperRef} />
          {onHide && <Close onClick={onHide} />}
          <Location onClick={locationHandler} />
          {children}
        </Container>
        <Footer className="map-footer">
          <div className="map-footer-content">
            <p className="map-footer-content-caption">{locale('当前位置', 'current_location')}</p>
            <p className="map-footer-content-sndcaption">{addr}</p>
          </div>
          {addr && (
            <span className="map-footer-submit" onClick={submitHandler}>
              {locale('确定', 'ok')}
            </span>
          )}
        </Footer>
        {errMsg && <Notice caption={errMsg} />}
      </Page>
    )
    if (portal) {
      return createPortal(DOM, portal)
    }
    return DOM
  }
)

export default MapChoose
