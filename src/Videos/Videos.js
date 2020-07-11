import React, {forwardRef} from 'react';
import Bridge from './../Bridge';

const Videos = forwardRef(({
  onChoose,
  ...others
}, ref) =>  {
  function click (e, item, index) {
    if (!item.src) {
      Bridge.showToast('没有src', {mask: false})
    }
    if (Bridge.platform === 'wechat' || Bridge.platform === 'wework' || Bridge.platform === 'wq') {
      Bridge.perviewFile(item.src)
    } else {
      
    }
  }
  function choose (e) {

  }
  return (<Photos
    ref={ref}
    {...others}
    onClick={others.onClick ? click : null}
    onChoose={others.onChoose ? choose : null}
    type="video"
  />);
})

export default Videos
