import React, { useContext } from 'react';
import {createPortal} from 'react-dom';
import Context from '../Context/instance.js';
import treeData from './instance.data.js';
let flattenData = []

function PickerDistrict({
    portal,
    data = treeData,
    dataFormat = {
      parentName: 'parentid',
      keyName: 'key',
      valueName: 'value',
      childName: 'children'
    },
    split = '-',

    type = 'district', // district | city
    show,
    value, // '北京-东城区'
    valueForKey, // '110000-110101'

    maskAttribute = {},
    submitAttribute = {},
    cancelAttribute = {},
    ...others
}) {
  // context
  const context = useContext(Context) || {};
  // flattenData
  if (JSON.stringify(data).indexOf(dataFormat.childName) !== -1) {
    flattenData = data.flattenTree(dataFormat.parentName, dataFormat.keyName)
  }
  // 根据key或者name获取tabs
  function getTabs (values, propertyName) {
    if (!values || !values.length) return null
    if (!propertyName) return null
    var tabs = []
    var levels = 0 // 层级
    function getRow (list, value) {
      for (let item of list) {
        // 模糊匹配
        if (item[propertyName].indexOf(value) > -1 || value.indexOf(item[propertyName]) > -1) {
          tabs.push(item)
          const children = flattenData.getFlattenTreeChildren(item[dataFormat.keyName], dataFormat.parentName)
          // 下一层级
          levels++
          if (values[levels]) {
            console.log(children, values[levels])
            getRow(children, values[levels])
          }
        }
      }
    }
    const root = flattenData.getFlattenTreeRoots(dataFormat.parentName, dataFormat.keyName)
    getRow(root, values[0])
    // 如果省市区不对,则返回空
    return tabs
  }
  // 选中值
  let tabs = [];
  if (valueForKey) {
    tabs = getTabs(valueForKey.split(split || '-'), dataFormat.keyName)
  } else if (value) {
    tabs = getTabs(value.split(split || '-'), dataFormat.valueName)
  }
  tabs.push({[dataFormat.keyName]: '', [dataFormat.valueName]: '请选择'});
  console.log(tabs)
  return createPortal(
    <div
      {...maskAttribute}
      className={`mask picker-district-mask${maskAttribute.className ? ' ' + maskAttribute.className : ''}${show ? ' active' : ''}`}
    >
      <div
        data-animation="slideUp"
        {...others}
        className={`picker-district${others.className ? ' ' + others.className : ' popup-animation bottom-center'}${show ? ' active' : ''}`}
      >
        <div className="picker-district-header">
          请选择
        </div>
        <div className="picker-district-tabbar">
          {tabs.map((tab, index) => {
            return <div className={`picker-district-tab${index === tabs.length - 1 ? ' active' : ''}`} key={index}>
              {tab[dataFormat.valueName]}
            </div>
          })}
        </div>
        <div className="picker-district-body">
          {/* {data && data.map((item) => {
            return <div className={`picker-district-option${item[dataFormat.keyName] ? ' active' : ''}`}>
              <div className="picker-district-option-icon"></div>
              <div className="picker-district-option-caption">{item[dataFormat.keyName]}</div>
            </div>
          })} */}
          {/* <div className="picker-district-option">
            <div className="picker-district-option-caption">中华人民共和国</div>
            <div className="picker-district-option-icon"></div>
          </div>
          <div className="picker-district-option">
            <div className="picker-district-option-caption">中华人民共和国</div>
            <div className="picker-district-option-icon"></div>
          </div>
          <div className="picker-district-option">
            <div className="picker-district-option-caption">中华人民共和国</div>
            <div className="picker-district-option-icon"></div>
          </div>
          <div className="picker-district-option">
            <div className="picker-district-option-caption">中华人民共和国</div>
            <div className="picker-district-option-icon"></div>
          </div>
          <div className="picker-district-option">
            <div className="picker-district-option-caption">中华人民共和国</div>
            <div className="picker-district-option-icon"></div>
          </div>
          <div className="picker-district-option">
            <div className="picker-district-option-caption">中华人民共和国</div>
            <div className="picker-district-option-icon"></div>
          </div>
          <div className="picker-district-option">
            <div className="picker-district-option-caption">中华人民共和国</div>
            <div className="picker-district-option-icon"></div>
          </div>
          <div className="picker-district-option">
            <div className="picker-district-option-caption">中华人民共和国</div>
            <div className="picker-district-option-icon"></div>
          </div>
          <div className="picker-district-option">
            <div className="picker-district-option-caption">中华人民共和国</div>
            <div className="picker-district-option-icon"></div>
          </div>
          <div className="picker-district-option">
            <div className="picker-district-option-caption">中华人民共和国</div>
            <div className="picker-district-option-icon"></div>
          </div>
          <div className="picker-district-option">
            <div className="picker-district-option-caption">中华人民共和国</div>
            <div className="picker-district-option-icon"></div>
          </div>
          <div className="picker-district-option">
            <div className="picker-district-option-caption">中华人民共和国</div>
            <div className="picker-district-option-icon"></div>
          </div>
          <div className="picker-district-option">
            <div className="picker-district-option-caption">中华人民共和国</div>
            <div className="picker-district-option-icon"></div>
          </div>
          <div className="picker-district-option">
            <div className="picker-district-option-caption">中华人民共和国</div>
            <div className="picker-district-option-icon"></div>
          </div>
          <div className="picker-district-option">
            <div className="picker-district-option-caption">中华人民共和国</div>
            <div className="picker-district-option-icon"></div>
          </div>
          <div className="picker-district-option">
            <div className="picker-district-option-caption">中华人民共和国</div>
            <div className="picker-district-option-icon"></div>
          </div>
          <div className="picker-district-option">
            <div className="picker-district-option-caption">中华人民共和国</div>
            <div className="picker-district-option-icon"></div>
          </div> */}
        </div>
      </div>
    </div>,
    portal || context.portal || document.getElementById('root') || document.body
  );
}

export default PickerDistrict;
