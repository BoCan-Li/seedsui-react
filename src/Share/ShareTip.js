import React, {useEffect, useContext} from 'react';
import {createPortal} from 'react-dom';
import Bridge from './../Bridge';
import Context from '../../src/Context/instance.js';

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
  const context = useContext(Context) || {};
  const locale = context.locale || {};
  return createPortal(
    <div className={`mask share-mask${maskAttribute.className ? ' ' + maskAttribute.className : ''}${show ? ' active' : ''}`} {...maskAttribute} onClick={handlerClick}>
      <div className="share-tip-arrow"></div>
      <div className={`share-tip`}>
        <p>1.{locale['sharetip_click_on_the_top_right'] || '点击右上角'}</p>
        <p>
          2.{locale['sharetip_click'] || '点击'}
          <img alt="" src="//res.waiqin365.com/d/seedsui/share/tip_friend.png"/>
          {locale['sharetip_sent_to_friend_or'] || '发送给朋友或'}
          <img alt="" src="//res.waiqin365.com/d/seedsui/share/tip_moments.png"/>
          {locale['sharetip_share_to_moments'] || '分享给朋友圈'}
        </p>
      </div>
    </div>,
    portal || context.portal || document.getElementById('root') || document.body
  );
}

export default ShareTip;
