import React, {forwardRef, useRef, useImperativeHandle, Fragment, useState} from 'react';
import Checkbox from './../Checkbox';
import Radio from './../Radio';

const SelectGroup = forwardRef(({
  // Input
  onClick,
  onChange,

  // Picker
  multiple = false,
  list = [], // [{id: '', name: ''}]
  selected,
  pickerProps = {},
  ...others
}, ref) =>  {
  // 过滤非法数据
  list = list.filter(item => {
    if (!item || (!item.id && !item.name)) return false;
    return true;
  });

  // 构建选中项
  let selectedMap = {};
  function updateSelectedMap () {
    for (let item of list) {
      if (selected && selected.length) { // selected匹配选中项
        for (let selectedItem of selected) {
          if (item.id === selectedItem.id) {
            selectedMap[item.id] = item;
          }
        }
      } else if (others.value && others.value.split(pickerProps.split || ',').indexOf(item.name) !== -1) { // value匹配选中项
        selectedMap[item.id] = item;
      }
    }
  }
  updateSelectedMap();
  // 判断是否选中
  function isSelected (currentItem) {
    if (selectedMap[currentItem.id]) return true;
    return false;
  }
  // 点击事件
  function clickHandler (e, checked, item, index) {
    if (!others.readOnly) { // 非只读时才能修改选中值
      if (multiple) { // 多选
        if (selectedMap[item.id]) {
          delete selectedMap[item.id];
        } else {
          selectedMap[item.id] = item;
        }
      } else { // 单选
        selectedMap = {
          [item.id]: item
        }
      }
    }
    // 构建value
    let value = [];
    for (let selectedMapPropertyName in selectedMap) {
      value.push(selectedMap[selectedMapPropertyName].name);
    }
    value = value.join(pickerProps.split || ',');

    if (!others.readOnly && onChange) onChange(e, value, Object.values(selectedMap));
    if (onClick) onClick(e, value);
  }
  return <div ref={ref} className={`inputselect-checkbox-group${others.className ? ' ' + others.className : ''}`}>
    {list.map((item, index) => {
      return <div className={`inputselect-checkbox-item`} key={index}>
        {multiple && <Checkbox
          disabled={others.disabled}
          caption={item.name}
          checked={isSelected(item)}
          onClick={(e, checked) => clickHandler(e, checked, item, index)}/>
        }
        {!multiple && <Radio
          disabled={others.disabled}
          caption={item.name}
          checked={isSelected(item)}
          onClick={(e, checked) => clickHandler(e, checked, item, index)}/>
        }
      </div>
    })}
  </div>
})

export default SelectGroup
