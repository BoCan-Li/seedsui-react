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

var _Icon = require('./../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Close = require('./../Close');

var _Close2 = _interopRequireDefault(_Close);

var _Bridge = require('./../Bridge');

var _Bridge2 = _interopRequireDefault(_Bridge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Grid = function (_Component) {
  (0, _inherits3.default)(Grid, _Component);

  function Grid(props) {
    (0, _classCallCheck3.default)(this, Grid);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Grid.__proto__ || (0, _getPrototypeOf2.default)(Grid)).call(this, props));

    _this.getSpaceStyle = function () {
      var _this$props = _this.props,
          className = _this$props.className,
          space = _this$props.space,
          wing = _this$props.wing;

      if (!space && !wing) return {
        ulStyle: {},
        cellStyle: {}
      };
      // 有边框的单元格
      if (className && className.hasClass('grid-bordered')) {
        return {
          ulStyle: {
            padding: '0'
          },
          cellStyle: {
            padding: space + 'px ' + wing + 'px'
          }
        };
      }
      // 无边框的单元格
      if (className && className.hasClass('between')) {
        // between对齐模式
        return {
          ulStyle: {
            padding: space / 2 + 'px 0px'
          },
          cellStyle: {
            padding: space / 2 + 'px ' + wing + 'px ' + space / 2 + 'px 0'
          }
        };
      }
      return { // around对齐模式
        ulStyle: {
          padding: space / 2 + 'px ' + wing / 2 + 'px'
        },
        cellStyle: {
          padding: space / 2 + 'px ' + wing / 2 + 'px'
        }
      };
    };

    _this.getLiStyle = function () {
      return _this.getSpaceStyle().cellStyle;
    };

    _this.getUlStyle = function () {
      return _this.getSpaceStyle().ulStyle;
    };

    _this.getArgs = function (e) {
      var args = _this.props.args;
      if (args !== undefined) {
        if (typeof args === 'string' && args === '$event') {
          args = e;
        } else if (Array.isArray(args) && args.indexOf('$event') > -1) {
          args[args.indexOf('$event')] = e;
        }
      } else {
        args = e;
      }
      return args;
    };

    _this.onClickIcon = function (e, item, index) {
      if (_this.props.onClickIcon) {
        _this.props.onClickIcon(item, index, _this.getArgs(e));
        e.stopPropagation();
      }
    };

    _this.onClickContent = function (e, item, index) {
      if (_this.props.onClickContent) {
        _this.props.onClickContent(item, index, _this.getArgs(e));
        e.stopPropagation();
      }
    };

    _this.onClickCell = function (e, item, index) {
      // 如果有src,说明需要预览
      if (item.src && item.preview !== false && _this.props.list) {
        var imgs = _this.props.list.map(function (n) {
          return n.src;
        });
        if (!imgs) return;
        _Bridge2.default.previewImage({
          urls: imgs,
          current: imgs[index] || imgs[0],
          index: index || 0
        });
        e.stopPropagation();
      }
      if (_this.props.onClickCell) {
        _this.props.onClickCell(item, index, _this.getArgs(e));
        e.stopPropagation();
      }
    };

    _this.onClickDelete = function (e, item, index) {
      if (_this.props.onClickDelete) {
        _this.props.onClickDelete(item, index, _this.getArgs(e));
        e.stopPropagation();
      }
    };

    _this.onClickAdd = function (e) {
      if (_this.props.onClickAdd) {
        _this.props.onClickAdd(_this.getArgs(e));
        e.stopPropagation();
      }
    };

    _this.state = {};
    return _this;
  }
  /* list: [{
    iconClassName: '',
    iconStyle: {},
    iconSrc: '',
    preview: true | false, // 是否支持预览,默认true
    thumb: '', // 缩略图
    src: '', // 预览地址
    caption: '',
    onClick: function() {},
    iconBadgeCaption: '',
    showClose: false
  }] */


  (0, _createClass3.default)(Grid, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          style = _props.style,
          col = _props.col,
          list = _props.list,
          cellClassName = _props.cellClassName,
          cellStyle = _props.cellStyle,
          contentClassName = _props.contentClassName,
          contentStyle = _props.contentStyle,
          iconClassName = _props.iconClassName,
          iconStyle = _props.iconStyle,
          lazyLoad = _props.lazyLoad,
          iconBadgeClassName = _props.iconBadgeClassName,
          closeClassName = _props.closeClassName,
          onClickDelete = _props.onClickDelete,
          captionClassName = _props.captionClassName,
          captionStyle = _props.captionStyle,
          sndcaptionClassName = _props.sndcaptionClassName,
          sndcaptionStyle = _props.sndcaptionStyle,
          showUpload = _props.showUpload;

      var children = _react2.default.Children.toArray(this.props.children);
      var dom = null;
      dom = _react2.default.createElement(
        'ul',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'grid' + (className ? ' ' + className : ''), 'data-col': col, style: (0, _assign2.default)(this.getUlStyle(), style) },
        list.length > 0 && list.map(function (item, index) {
          if (!item) return null;
          return _react2.default.createElement(
            'li',
            { onClick: function onClick(e) {
                _this2.onClickCell(e, item, index);
              }, key: index, className: 'grid-cell' + (cellClassName ? ' ' + cellClassName : ''), style: (0, _assign2.default)({}, _this2.getLiStyle(), cellStyle) },
            _react2.default.createElement(
              'a',
              { onClick: function onClick(e) {
                  _this2.onClickContent(e, item, index);
                }, className: 'grid-iconbox' + (contentClassName ? ' ' + contentClassName : '') + (item.className ? ' ' + item.className : ''), style: (0, _assign2.default)(contentStyle ? contentStyle : {}, item.style ? item.style : {}) },
              (item.iconSrc || item.iconClassName) && _react2.default.createElement(_Icon2.default, { badgeClassName: iconBadgeClassName, badgeCaption: item.iconBadgeCaption, onClick: function onClick(e) {
                  _this2.onClickIcon(e, item, index);
                }, lazyLoad: lazyLoad, className: 'grid-icon' + (iconClassName ? ' ' + iconClassName : '') + (item.iconClassName ? ' ' + item.iconClassName : ''), style: (0, _assign2.default)(iconStyle, item.iconStyle ? item.iconStyle : {}), src: item.iconSrc ? item.iconSrc : '' }),
              item.thumb && _react2.default.createElement('img', { alt: '', src: item.thumb, onClick: function onClick(e) {
                  _this2.onClickIcon(e, item, index);
                } }),
              onClickDelete && _react2.default.createElement(_Close2.default, { onClick: function onClick(e) {
                  _this2.onClickDelete(e, item, index);
                }, className: 'grid-close' + (closeClassName ? ' ' + closeClassName : ''), iconClassName: 'close-icon-clear color-cancel' })
            ),
            item.caption && _react2.default.createElement(
              'label',
              { className: 'grid-caption' + (captionClassName ? ' ' + captionClassName : ''), style: captionStyle },
              item.caption
            ),
            item.sndcaption && _react2.default.createElement(
              'label',
              { className: 'grid-sndcaption' + (sndcaptionClassName ? ' ' + sndcaptionClassName : ''), style: sndcaptionStyle },
              item.sndcaption
            )
          );
        }),
        showUpload === true && _react2.default.createElement(
          'li',
          { className: 'grid-cell', style: this.getLiStyle() },
          _react2.default.createElement(
            'a',
            { onClick: function onClick(e) {
                _this2.onClickAdd(e);
              }, className: 'grid-iconbox grid-iconbox-add' + (contentClassName ? ' ' + contentClassName : ''), style: contentStyle },
            _react2.default.createElement(_Icon2.default, { className: 'grid-icon-add' })
          )
        ),
        children.length > 0 && children.map(function (item, index) {
          if (!item) return null;
          return _react2.default.createElement(
            'li',
            { key: index, className: 'grid-cell' + (cellClassName ? ' ' + cellClassName : ''), style: (0, _assign2.default)({}, _this2.getLiStyle(), cellStyle) },
            item
          );
        })
      );
      return dom;
    }
  }]);
  return Grid;
}(_react.Component);

Grid.propTypes = {
  args: _propTypes2.default.any,
  lazyLoad: _propTypes2.default.bool, // 图标是否懒人加载
  style: _propTypes2.default.object,
  className: _propTypes2.default.string, // grid-album | grid-bordered
  space: _propTypes2.default.number, // 上下间距
  wing: _propTypes2.default.number, // 左右间距
  col: _propTypes2.default.string, // 一行列数
  showUpload: _propTypes2.default.bool,
  list: _propTypes2.default.array, // 单元格，见下方示例
  children: _propTypes2.default.node, // 也可以直接放子元素，grid将自动排列

  cellClassName: _propTypes2.default.string, // 单元格Class
  cellStyle: _propTypes2.default.object, // 单元格Style

  caption: _propTypes2.default.node,
  captionClassName: _propTypes2.default.string,
  captionStyle: _propTypes2.default.object,

  sndcaption: _propTypes2.default.node,
  sndcaptionClassName: _propTypes2.default.string,
  sndcaptionStyle: _propTypes2.default.object,

  contentClassName: _propTypes2.default.string, // 单元格内容Class
  contentStyle: _propTypes2.default.object, // 单元格内容Style

  iconClassName: _propTypes2.default.string,
  iconStyle: _propTypes2.default.object,

  badgeClassName: _propTypes2.default.string,

  onClick: _propTypes2.default.func,
  onClickCell: _propTypes2.default.func,
  onClickContent: _propTypes2.default.func,
  onClickIcon: _propTypes2.default.func,
  onClickDelete: _propTypes2.default.func,
  onClickAdd: _propTypes2.default.func };
Grid.defaultProps = {
  list: [],
  args: null,
  iconStyle: {},
  space: 0,
  wing: 0,
  col: '3'
};
exports.default = Grid;
module.exports = exports['default'];