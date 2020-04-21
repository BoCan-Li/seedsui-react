import React, { useEffect, forwardRef, createRef, useImperativeHandle } from 'react';
import Instance from './instance';
import Button from './../Button';

// 函数组件因为没有实例, 所以也没有ref, 必须通过forwardRef回调ref
const ListPull = forwardRef(({
  list, // [{container: node, lButtons: [{value: '按钮文字', className: 'warn', style: object}], rButtons: 同lButtons}]
  onClick,
  onShowedLeft,
  onShowedRight,
  ...others
}, ref) =>  {
  // 创建ref, useRef每次都会返回相同的引用, 所以用createRef
  const refEl = createRef(null)
  const instance = createRef(null)
  useImperativeHandle(ref, () => ({
    $el: refEl,
    instance: instance
  }));

  useEffect(() => {
    if (!refEl || !refEl.current) return;
    instance.current = new Instance(refEl.current, {
      onClick: (s) => {
        const e = s.event;
        const index = e.target.getAttribute('data-index');
        const option = list[index];
        let item = null;
        const i = e.target.getAttribute('data-i');
        const direction = e.target.getAttribute('data-direction');
        if (i && direction) {
          if (direction === 'left') {
            item = option.lButtons[i];
          } else {
            item = option.rButtons[i];
          }
        }
        if (onClick) onClick(item, index, option, s)
      },
      onShowedLeft: onShowedLeft,
      onShowedRight: onShowedRight
    });
  }, []) // eslint-disable-line
  
  return (
    <ul ref={refEl} className={`list-pull${others.className ? ' ' + others.className : ''}`}>
      {list.map((item, index) => {
        return <li key={`button${index}`} data-index={`${index}`} className="border-b list-pull-li">
          {item.lButtons && item.lButtons.length && <div className="list-pull-left">
            {item.lButtons.map((button, i) => {
              return <Button key={`button${i}`} data-index={`${index}`} data-i={`${i}`} data-direction="left" className={`list-pull-button${button.className ? ' ' + button.className : ''}`} style={button.style}>{button.caption}</Button>
            })}
          </div>}
          <div className="list-pull-handler" data-index={`${index}`}>
            {item.container}
          </div>
          {item.rButtons && item.rButtons.length && <div className="list-pull-right">
            {item.rButtons.map((button, i) => {
              return <Button key={`button${i}`} data-index={`${index}`} data-i={`${i}`} data-direction="right" className={`list-pull-button${button.className ? ' ' + button.className : ''}`} style={button.style}>{button.caption}</Button>
            })}
          </div>}
        </li>
      })}
    </ul>
  );
})

export default ListPull
