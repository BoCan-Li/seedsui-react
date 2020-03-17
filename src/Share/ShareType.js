import React, { Fragment } from 'react';
import Bridge from './../Bridge';

function ShareType({config = {}, type}) {
  // 点击
  const handlerClick = (e) => {
    var target = e.target;
    e.stopPropagation()
    if (target.classList.contains('wechat')) { // 微信
      Bridge.invoke('shareWechatMessage', config, function (res) {
        if (res.err_msg === 'shareWechatMessage:ok') {
          console.log('分享成功')
        }
      })
    } else if (target.classList.contains('wework')) { // 企业微信
      Bridge.invoke('shareAppMessage', config, function (res) {
        if (res.err_msg === 'shareAppMessage:ok') {
          console.log('分享成功')
        }
      })
    } else if (target.classList.contains('moments')) { // 朋友圈
      Bridge.invoke('shareTimeline', config, function (res) {
        if (res.err_msg === 'shareTimeline:ok') {
          console.log('分享成功')
        }
      })
    }
  }
  return (
    <Fragment>
      <i className={`share-icon ${type}`} onClick={handlerClick}></i>
      <p className="share-caption">
        {type === 'wechat' && '微信好友'}
        {type === 'wework' && '企业微信好友'}
        {type === 'moments' && '微信朋友圈'}
      </p>
    </Fragment>
  );
}

export default ShareType;
