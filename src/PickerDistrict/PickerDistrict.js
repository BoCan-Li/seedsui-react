import React, { useContext } from 'react';
import {createPortal} from 'react-dom';
import Context from '../Context/instance.js';

function PickerDistrict({
    portal,
    data,
    dataFormat, // {keyName: 'key', valueName: 'value', childName: 'children'}
    split,

    type, // district | city
    show,
    value, // '北京-东城区'
    valueForKey, // '110000-110101'

    maskAttribute = {},
    ...others
  }) {
  // context
  const context = useContext(Context) || {};
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
          <div className="picker-district-tab active">北京</div>
          <div className="picker-district-tab">东城</div>
        </div>
        <div className="picker-district-body">
          <div className="picker-district-option active">
            <div className="picker-district-option-icon"></div>
            <div className="picker-district-option-caption">中华人民共和国</div>
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
          </div>
          <div className="picker-district-option">
            <div className="picker-district-option-caption">中华人民共和国</div>
            <div className="picker-district-option-icon"></div>
          </div>
        </div>
      </div>
    </div>,
    portal || context.portal || document.getElementById('root') || document.body
  );
}

export default PickerDistrict;
