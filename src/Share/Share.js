import React, { useState } from 'react';
import Bridge from './../Bridge';
import ShareChoose from './ShareChoose';
import ShareTip from './ShareTip';
import ShareType from './ShareType';

function Share({
  children,
  type, // 点击单个图标分享, wework企业微信和wq外勤客户端JSBridge才生效wechat | wework | moments
  shareTo = ['wechat', 'wework', 'moments'],
  config = {
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: '', // 分享图标
  },
  originConfig,
  ...others
}) {
  if (Bridge.platform !== 'wework' && Bridge.platform !== 'wechat' && Bridge.platform !== 'wq' && Bridge.platform !== 'dinghuo' && Bridge.platform !== 'waiqin') {
    console.log('Share: 此平台无法使用分享功能')
    return null;
  }
  if (!config || !config.link) {
    console.log('Share: 没有设置config')
    return null;
  }
  // 定义state
  const [show, setShow] = useState(false);
  // 显隐弹窗
  const handlerClick = () => {
    if (Bridge.platform === 'dinghuo' || Bridge.platform === 'waiqin') {
      Bridge.shareText({
        title: config.title,
        desc: config.desc,
        link: config.link,
        text: `${config.link}`
      });
    } else {
      setShow(true)
    }
  }
  return (
    <div {...others} onClick={handlerClick}>
      {children}
      {/* 微信, 点击显示提示弹窗 */}
      {Bridge.platform === 'wechat' && <ShareTip
          show={show}
          config={config}
          originConfig={originConfig}
          onHide={() => setShow(false)}
        />
      }
      {/* 企业微信和外勤客户端JSBridge, 点击显示选择弹窗 */}
      {(Bridge.platform === 'wework' || Bridge.platform === 'wq') && !type && <ShareChoose
          show={show}
          config={config}
          shareTo={shareTo}
          onHide={() => setShow(false)}
        />
      }
      {/* 企业微信和外勤客户端JSBridge, 单项显示 */}
      {(Bridge.platform === 'wework' || Bridge.platform === 'wq') && type && <ShareType
        type={type}
        config={config}
      />}
      {/* 订货客户端和外勤客户端cordova, 点击直接弹窗 */}
    </div>
  );
}

export default Share;
