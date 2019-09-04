'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _DB = require('./../DB');

var _DB2 = _interopRequireDefault(_DB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchBoard = function (_Component) {
  (0, _inherits3.default)(SearchBoard, _Component);

  function SearchBoard(props, context) {
    (0, _classCallCheck3.default)(this, SearchBoard);

    // 初始化标签
    var _this = (0, _possibleConstructorReturn3.default)(this, (SearchBoard.__proto__ || (0, _getPrototypeOf2.default)(SearchBoard)).call(this, props, context));

    _this.onClear = function () {
      _DB2.default.removeStore(_this.props.dbKey);
      _this.setState({
        tags: []
      });
      if (_this.props.onClear) _this.props.onClear();
    };

    _this.add = function (item) {
      if (!item.value) return;
      var tags = _DB2.default.getStore(_this.props.dbKey) || [];
      // 删除重复项
      for (var i in tags) {
        if (tags[i].value === item.value) {
          tags.splice(i, 1);
          break;
        }
      }
      // 添加到第一项
      tags.unshift(item);
      _DB2.default.setStore(_this.props.dbKey, tags);
      _this.setState({
        tags: tags
      });
    };

    _this.state = {
      tags: _DB2.default.getStore(_this.props.dbKey) || []
    };
    return _this;
  }
  // 清空历史记录

  // 新增历史记录


  (0, _createClass3.default)(SearchBoard, [{
    key: 'render',
    value: function render() {
      var tags = this.state.tags;
      var _props = this.props,
          style = _props.style,
          className = _props.className,
          show = _props.show,
          expandCaption = _props.expandCaption,
          expandTags = _props.expandTags,
          _onClick = _props.onClick,
          onClickExpand = _props.onClickExpand,
          children = _props.children;

      var isHide = false;
      if (this.props.showValidTags && tags.length === 0) {
        isHide = true;
      }
      var DOM = null;
      if (!isHide) {
        DOM = _react2.default.createElement(
          'div',
          { className: 'searchboard ' + (className ? ' ' + className : '') + (show ? '' : ' hide'), style: style },
          tags.length > 0 && _react2.default.createElement(
            'div',
            { className: 'searchboard-caption' },
            _react2.default.createElement(
              'div',
              { className: 'searchboard-caption-title' },
              '\u641C\u7D22\u5386\u53F2'
            ),
            _react2.default.createElement(
              'div',
              { className: 'searchboard-caption-ricon', onClick: this.onClear },
              _react2.default.createElement('i', { className: 'searchboard-icon-trash' }),
              _react2.default.createElement(
                'span',
                null,
                '\u6E05\u9664'
              )
            )
          ),
          tags.map(function (item, index) {
            return _react2.default.createElement(
              'div',
              { className: 'searchboard-tag', onClick: function onClick() {
                  if (_onClick) _onClick(item, index);
                }, key: index },
              item.value
            );
          }),
          expandCaption && _react2.default.createElement(
            'div',
            { className: 'searchboard-caption' },
            _react2.default.createElement(
              'div',
              { className: 'searchboard-caption-title' },
              expandCaption
            )
          ),
          expandTags && expandTags.map(function (item, index) {
            return _react2.default.createElement(
              'div',
              { className: 'searchboard-tag', onClick: function onClick() {
                  if (onClickExpand) onClickExpand(item, index);
                }, key: index },
              item.value
            );
          }),
          children
        );
      }
      return DOM;
    }
  }]);
  return SearchBoard;
}(_react.Component);

SearchBoard.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  dbKey: _propTypes2.default.string, // 存储到db中的key
  show: _propTypes2.default.bool,
  showValidTags: _propTypes2.default.bool, // 如果没有历史记录是否隐藏面板
  onClick: _propTypes2.default.func,
  onClear: _propTypes2.default.func,
  expandCaption: _propTypes2.default.string, // 扩展标题
  expandTags: _propTypes2.default.array, // 扩展标签, 格式: {value: 'xx'}
  onClickExpand: _propTypes2.default.func,
  children: _propTypes2.default.node
};
SearchBoard.defaultProps = {
  show: true,
  showValidTags: true,
  className: 'border-b',
  dbKey: 'app_search_history'
};
exports.default = SearchBoard;
module.exports = exports['default'];