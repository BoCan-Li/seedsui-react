'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('./../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Price = require('./../Price');

var _Price2 = _interopRequireDefault(_Price);

var _Mark = require('./../Mark');

var _Mark2 = _interopRequireDefault(_Mark);

var _Clipboard = require('./../Clipboard');

var _Clipboard2 = _interopRequireDefault(_Clipboard);

var _Bridge = require('./../Bridge');

var _Bridge2 = _interopRequireDefault(_Bridge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Attributes = function (_Component) {
  (0, _inherits3.default)(Attributes, _Component);

  function Attributes(props, context) {
    var _arguments = arguments;
    (0, _classCallCheck3.default)(this, Attributes);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Attributes.__proto__ || (0, _getPrototypeOf2.default)(Attributes)).call(this, props, context));

    _this.onCopyToClipboard = function (text) {
      var onCopy = _this.props.onCopy;

      _Clipboard2.default.copy(text, {
        onSuccess: function onSuccess(msg) {
          if (onCopy) onCopy(text, msg);
        },
        onError: function onError(msg) {
          if (onCopy) onCopy(text, msg);
        }
      });
    };

    _this.onClick = function (item, index, item2, index2) {
      // eslint-disable-line
      if (_this.props.onClick) _this.props.onClick(_arguments);
    };

    _this.getValueDOM = function (item, index) {
      // 价格
      if (item.price) {
        var priceValue = item.value || '';
        if (typeof item.price === 'string') {
          priceValue = item.price;
        }
        return _react2.default.createElement(_Price2.default, { digits: item.priceDigits, key: 'price' + index, style: item.priceStyle, className: item.priceClassName ? item.priceClassName : 'capitalize', price: priceValue, unit: item.priceUnit || '' });
        // 按钮
      } else if (item.html) {
        // html
        var htmlValue = item.value || '';
        if (typeof item.html === 'string') {
          htmlValue = item.html;
        }
        return _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: htmlValue } });
      }
      return item.value;
    };

    _this.getSuffixDOM = function (item, index) {
      if (!item.suffix) return null;
      return _react2.default.createElement(
        'span',
        { className: item.suffixClassName, style: item.suffixStyle, key: 'suffix' + index },
        item.suffix
      );
    };

    _this.getOpDOM = function (item, index) {
      // 复制
      if (item.copy) {
        var copyValue = item.value || '';
        if (typeof item.copy === 'string') {
          copyValue = item.copy;
        }
        return _react2.default.createElement(
          _Button2.default,
          { key: index, className: 'rbtn sm', style: { borderRadius: '3px' }, args: copyValue, onClick: _this.onCopyToClipboard },
          '\u590D\u5236'
        );
      }
      // 电话
      if (item.tel) {
        var telValue = item.value || '';
        if (typeof item.tel === 'string') {
          telValue = item.tel;
        }
        return _react2.default.createElement(
          'a',
          { key: index, className: 'ricon', onClick: function onClick() {
              _Bridge2.default.tel(telValue);
            } },
          _react2.default.createElement('i', { className: 'icon bg-tel' })
        );
      }
      // 标签
      if (item.mark) {
        return _react2.default.createElement(
          _Mark2.default,
          { className: item.markClassName, style: item.markStyle },
          item.mark
        );
      }
      // 按钮
      if (item.button) {
        var buttonValue = item.value || '';
        if (typeof item.button === 'string') {
          buttonValue = item.button;
        }
        return _react2.default.createElement(
          _Button2.default,
          { key: 'button' + index, style: item.buttonStyle, className: item.buttonClassName, onClick: function onClick(e) {
              e.stopPropagation();if (item.buttonClick) item.buttonClick(item, index);
            } },
          buttonValue
        );
      }
    };

    _this.getCol2ValueDOM = function (item, index) {
      var dom = [];
      dom.push(_this.getValueDOM(item, index));
      if (item.suffix) dom.push(_this.getSuffixDOM(item, index));
      var opDOM = _this.getOpDOM(item, index);
      if (opDOM) dom.push(opDOM);
      return dom;
    };

    _this.getRowClassName = function () {
      var rowClassName = _this.props.rowClassName;

      return 'attribute' + (rowClassName ? ' ' + rowClassName : ' attribute-margin');
    };

    return _this;
  }
  // 点击行

  // 获得值DOM

  // 获得操作DOM

  // 获得2列的value的DOM

  // 获得一行的className


  (0, _createClass3.default)(Attributes, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          showValidValue = _props.showValidValue,
          showValidName = _props.showValidName,
          col = _props.col,
          list = _props.list,
          className = _props.className,
          style = _props.style,
          rowStyle = _props.rowStyle,
          colClassName = _props.colClassName,
          colStyle = _props.colStyle,
          cellClassName = _props.cellClassName,
          cellStyle = _props.cellStyle,
          nameClassName = _props.nameClassName,
          nameStyle = _props.nameStyle,
          valueClassName = _props.valueClassName,
          valueStyle = _props.valueStyle,
          rowAfter = _props.rowAfter,
          rowAfterExclude = _props.rowAfterExclude,
          children = _props.children;

      var attrsDOM = [];

      var _loop = function _loop(_i) {
        if (col == 2) {
          // eslint-disable-line
          attrsDOM.push(_react2.default.createElement(
            'div',
            { key: 'row' + _i, className: _this2.getRowClassName(), style: rowStyle, onClick: function onClick() {
                _this2.onClick(list[_i], _i, list[_i + 1], _i + 1);
              } },
            _react2.default.createElement(
              'div',
              { className: 'attribute-half' + (colClassName ? ' ' + colClassName : ''), style: colStyle },
              _react2.default.createElement(
                'div',
                { className: 'attribute-left' + (cellClassName ? ' ' + cellClassName : '') + (nameClassName ? ' ' + nameClassName : ''), style: (0, _assign2.default)({}, cellStyle, nameStyle) },
                list[_i].name
              ),
              _react2.default.createElement(
                'div',
                { className: 'attribute-right' + (cellClassName ? ' ' + cellClassName : '') + (valueClassName ? ' ' + valueClassName : ''), style: (0, _assign2.default)({}, cellStyle, valueStyle) },
                _this2.getCol2ValueDOM(list[_i], _i)
              )
            ),
            list[_i + 1] && _react2.default.createElement(
              'div',
              { className: 'attribute-half' + (colClassName ? ' ' + colClassName : ''), style: colStyle },
              _react2.default.createElement(
                'div',
                { className: 'attribute-left' + (cellClassName ? ' ' + cellClassName : '') + ' ' + (nameClassName ? nameClassName : ''), style: (0, _assign2.default)({}, cellStyle, nameStyle) },
                list[_i + 1].name ? list[_i + 1].name : ''
              ),
              _react2.default.createElement(
                'div',
                { className: 'attribute-right' + (cellClassName ? ' ' + cellClassName : '') + '  ' + (valueClassName ? valueClassName : ''), style: (0, _assign2.default)({}, cellStyle, valueStyle) },
                _this2.getCol2ValueDOM(list[_i + 1], _i + 1)
              )
            )
          ), rowAfter && rowAfterExclude !== _i ? _react2.default.createElement(
            'div',
            { key: 'rowafter' + _i },
            rowAfter
          ) : null);
          _i += 2;
        } else {
          var isShow = true;
          if (showValidValue && !list[_i].value) isShow = false;
          if (showValidName && !list[_i].name) isShow = false;
          if (list[_i].hasOwnProperty('show')) isShow = list[_i].show;
          if (isShow) {
            attrsDOM.push(_react2.default.createElement(
              'div',
              { key: 'row' + _i, className: _this2.getRowClassName(), style: rowStyle, onClick: function onClick() {
                  _this2.onClick(list[_i], _i);
                } },
              _react2.default.createElement(
                'div',
                { className: 'attribute-left' + (cellClassName ? ' ' + cellClassName : '') + (nameClassName ? ' ' + nameClassName : ''), style: (0, _assign2.default)({}, cellStyle, nameStyle) },
                list[_i].name
              ),
              _react2.default.createElement(
                'div',
                { className: 'attribute-right' + (cellClassName ? ' ' + cellClassName : '') + (valueClassName ? ' ' + valueClassName : ''), style: (0, _assign2.default)({}, cellStyle, valueStyle) },
                _this2.getValueDOM(list[_i], _i),
                list[_i].suffix && _this2.getSuffixDOM(list[_i], _i)
              ),
              _this2.getOpDOM(list[_i], _i)
            ), rowAfter && rowAfterExclude !== _i ? _react2.default.createElement(
              'div',
              { key: 'rowafter' + _i },
              rowAfter
            ) : null);
          }
          _i++;
        }
        i = _i;
      };

      for (var i = 0; i < list.length;) {
        _loop(i);
      }
      return _react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'attributes' + (className ? ' ' + className : ''), style: style },
        attrsDOM,
        children
      );
    }
  }]);
  return Attributes;
}(_react.Component);

Attributes.propTypes = {
  showValidValue: _propTypes2.default.bool, // 值合法时显示
  showValidName: _propTypes2.default.bool, // name合法时显示

  col: _propTypes2.default.oneOfType([// 列数, 默认1
  _propTypes2.default.string, _propTypes2.default.number]),
  list: _propTypes2.default.array,
  // [
  //   {
  //     name: string,
  //     value: string,
  //     copy: bool | string,
  //     tel: bool | string,
  //     price: bool | string,
  //     priceClassName: string,
  //     priceStyle: object,
  //     button: bool | string,
  //     buttonClassName: string,
  //     buttonStyle: object,
  //     buttonClick: func,
  //     show: bool,
  //     mark: string,
  //     markClassName: string,
  //     markStyle: object,
  //     suffix: node // value后缀
  //     suffixClassName: string,
  //     suffixStyle: object,
  //   }
  // ]
  className: _propTypes2.default.string, // align(左右对齐布局) | start(左端对齐) | between(两端对齐)
  style: _propTypes2.default.object,

  rowClassName: _propTypes2.default.string, // 行className
  rowStyle: _propTypes2.default.object,

  colClassName: _propTypes2.default.string, // 2列的情况,列className
  colStyle: _propTypes2.default.object,

  cellClassName: _propTypes2.default.string, // 列className
  cellStyle: _propTypes2.default.object,

  nameClassName: _propTypes2.default.string, // name的className
  nameStyle: _propTypes2.default.object,
  valueClassName: _propTypes2.default.string, // value的className
  valueStyle: _propTypes2.default.object,

  rowAfter: _propTypes2.default.node,
  rowAfterExclude: _propTypes2.default.number,
  children: _propTypes2.default.node,
  onCopy: _propTypes2.default.func,
  onClick: _propTypes2.default.func // 点击行
};
Attributes.defaultProps = {
  list: [],
  rowAfterExclude: -1
};
exports.default = Attributes;
module.exports = exports['default'];