import React, {useEffect} from 'react';
import {createPortal} from 'react-dom';
import Bridge from './../Bridge';

function ShareTip({ portal, show, config = {}, originConfig, maskAttribute = {}, onHide }) {
  // 生命周期
  useEffect(() => {
    // componentDidMount和componentDidUpdate
    return () => {
      // componentWillUnmount
      // 更新分享
      if (originConfig) {
        wx.updateAppMessageShareData({ // eslint-disable-line
          ...originConfig,
          success: () => {
            console.log('还原好友分享成功')
          },
          fail: (res = {}) => {
            console.log(res.errMsg || '还原好友分享失败, 请稍后再试', {mask: false});
          }
        })
        wx.updateTimelineShareData({ // eslint-disable-line
          ...originConfig,
          success: () => {
            console.log('还原朋友圈分享成功')
          },
          fail: (res = {}) => {
            console.log(res.errMsg || '还原朋友圈分享失败, 请稍后再试', {mask: false});
          }
        })
      }
    }
  });

  // useEffect(() => {
  //   // componentDidUpdate: 更新usernmae
  // }, [state.username]);

  // 更新分享
  wx.updateAppMessageShareData({ // eslint-disable-line
    ...config,
    success: () => {
      console.log('更新好友分享成功')
    },
    fail: (res = {}) => {
      Bridge.showToast(res.errMsg || '更新好友分享失败, 请稍后再试', {mask: false});
    }
  })
  wx.updateTimelineShareData({ // eslint-disable-line
    ...config,
    success: () => {
      console.log('更新朋友圈分享成功')
    },
    fail: (res = {}) => {
      Bridge.showToast(res.errMsg || '更新朋友圈分享失败, 请稍后再试', {mask: false});
    }
  })
  // 点击
  const handlerClick = (e) => {
    var target = e.target;
    e.stopPropagation()
    if (target.classList.contains('share-mask')) {
      if (onHide) onHide(e);
    }
  }
  // context
  const contextPortal = null; // useContext(PortalContext) || 
  return createPortal(
    <div className={`mask share-mask${maskAttribute.className ? ' ' + maskAttribute.className : ''}${show ? ' active' : ''}`} {...maskAttribute} onClick={handlerClick}>
      <div className="share-tip-arrow"></div>
      <div className={`share-tip`}>
        <p>1.点击右上角</p>
        <p>
          2.点击
          <img alt="" src="https://img11.360buyimg.com/jdphoto/s40x40_jfs/t1/35965/17/691/472/5cac50b9E361b21d5/e4382d0bb30e4114.png"/>
          发送给朋友或
          <img alt="" src="https://img11.360buyimg.com/jdphoto/s42x42_jfs/t1/18600/16/14988/1794/5cac50b9E10d2024d/6675b7460c377bfe.png"/>
          分享给朋友圈
        </p>
      </div>
    </div>,
    portal || contextPortal || document.getElementById('root') || document.body
  );
}

export default ShareTip;
