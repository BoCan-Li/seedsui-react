import React, {forwardRef} from 'react';
import Star from './../Star';
import Context from '../Context/instance.js';

const InputStar = forwardRef(({
  min = 0,
  max = 5,
  value = 0,
  onChange,
  onError, // ({e, {errMsg: '错误信息', select: '当前选中', min: '最小值', value: '矫正后的值'}})
  ...others
}, ref) =>  {
  // context
  const context = useContext(Context) || {};
  const locale = context.locale || function (remark) {return remark || ''};

  function changeHandler (e, argNum) {
    let num = argNum;
    if (num < min) {
      if (onError) {
        onError(e, {
          errMsg: `${locale('不能小于', 'hint_cannot_be_less_than')}${min}${locale('颗星', 'star')}`,
          select: num,
          min: min,
          value: min,
          event: e
        });
      }
      num = min;
    }
    if (onChange) onChange(e, num);
  }
  const stars = [];
  for (var i = 1; i <= max; i++) {
    stars.push(i);
  }
  let current = value
  if (current < min) current = min
  return (
    <div ref={ref} {...others} className={`input-star${others.className ? ' ' + others.className : ''}`}>
      {stars.map((index) => (
        <Star onClick={(e) => {changeHandler(e, index);}} key={index} className={index <= current ? 'active' : ''}/>
      ))}
    </div>
  );
})

export default InputStar
