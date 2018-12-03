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

var _Bridge = require('./../Bridge');

var _Bridge2 = _interopRequireDefault(_Bridge);

var _Player = require('./../Player');

var _Player2 = _interopRequireDefault(_Player);

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

    _this.onClickIconBox = function (e, item, index) {
      if (_this.props.onClickIconBox) {
        _this.props.onClickIconBox(item, index, _this.getArgs(e));
        e.stopPropagation();
      }
      // 如果是视频则自带预览功能,不需要预览
      if (_this.props.type === 'video' || item.type === 'video') {
        return;
      }
      // 如果有点击事件,则不走预览
      if (item.onClick) {
        item.onClick(item, index, _this.getArgs(e));
        return;
      }
      // 如果没有src则认为不是相册,不需要预览
      if (!item.src || item.preview === false || _this.props.preview === false) {
        return;
      }
      // 预览
      if (_this.props.list) {
        var imgs = _this.props.list.map(function (n) {
          return n.src;
        });
        if (!imgs) return;
        _Bridge2.default.previewImage({
          urls: imgs,
          current: imgs[index] || imgs[0],
          index: index || 0
        });
      }
      e.stopPropagation();
    };

    _this.onClickCell = function (e, item, index) {
      // onClickCell
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
    type: 'video', // 视频或者图片
    caption: '',
    onClick: function() {},
    iconBadgeCaption: ''
  }] */


  (0, _createClass3.default)(Grid, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          type = _props.type,
          className = _props.className,
          style = _props.style,
          col = _props.col,
          list = _props.list,
          cellClassName = _props.cellClassName,
          cellStyle = _props.cellStyle,
          iconBoxClassName = _props.iconBoxClassName,
          iconBoxStyle = _props.iconBoxStyle,
          iconClassName = _props.iconClassName,
          iconStyle = _props.iconStyle,
          iconDefaultImgClassName = _props.iconDefaultImgClassName,
          iconDefaultImgStyle = _props.iconDefaultImgStyle,
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
              'span',
              { onClick: function onClick(e) {
                  _this2.onClickIconBox(e, item, index);
                }, className: 'grid-iconbox' + (iconBoxClassName ? ' ' + iconBoxClassName : '') + (item.className ? ' ' + item.className : ''), style: (0, _assign2.default)(iconBoxStyle ? iconBoxStyle : {}, item.style ? item.style : {}) },
              type !== 'video' && item.type !== 'video' && (item.iconSrc || item.iconClassName || item.thumb) && _react2.default.createElement(_Icon2.default, {
                base: item.thumb ? 'img' : 'icon',
                src: item.iconSrc ? item.iconSrc : item.thumb ? item.thumb : '',
                lazyLoad: lazyLoad,
                onClick: function onClick(e) {
                  _this2.onClickIcon(e, item, index);
                },
                className: '' + (iconClassName || '') + (item.iconClassName ? ' ' + item.iconClassName : ''),
                style: (0, _assign2.default)(iconStyle, item.iconStyle ? item.iconStyle : {}),
                defaultImgClassName: iconDefaultImgClassName,
                defaultImgStyle: iconDefaultImgStyle,
                badgeClassName: iconBadgeClassName,
                badgeCaption: item.iconBadgeCaption,
                closeClassName: 'grid-close close-icon-clear color-cancel' + (closeClassName ? ' ' + closeClassName : ''),
                onClickClose: onClickDelete ? function (e) {
                  _this2.onClickDelete(e, item, index);
                } : null
              }),
              (type === 'video' || item.type === 'video') && item.src && _react2.default.createElement(_Player2.default, {
                args: item,
                src: item.src,
                poster: item.iconSrc ? item.iconSrc : item.thumb ? item.thumb : '',
                className: '' + (iconClassName || '') + (item.iconClassName ? ' ' + item.iconClassName : ''),
                style: (0, _assign2.default)(iconStyle, item.iconStyle ? item.iconStyle : {}),
                onClick: item.onClick
              })
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
            'span',
            { onClick: function onClick(e) {
                _this2.onClickAdd(e);
              }, className: 'grid-iconbox grid-iconbox-add' + (iconBoxClassName ? ' ' + iconBoxClassName : ''), style: iconBoxStyle },
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
  type: _propTypes2.default.string, // video 视频
  preview: _propTypes2.default.bool, // 是否预览, 默认为true
  lazyLoad: _propTypes2.default.bool, // 图标是否懒人加载
  style: _propTypes2.default.object,
  className: _propTypes2.default.string, // grid-album | grid-bordered
  space: _propTypes2.default.number, // 上下间距
  wing: _propTypes2.default.number, // 左右间距
  col: _propTypes2.default.oneOfType([// 一行列数
  _propTypes2.default.string, _propTypes2.default.number]),
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

  iconBoxClassName: _propTypes2.default.string, // 图标容器Class
  iconBoxStyle: _propTypes2.default.object, // 图标容器Style

  iconClassName: _propTypes2.default.string,
  iconStyle: _propTypes2.default.object,
  iconDefaultImgClassName: _propTypes2.default.string,
  iconDefaultImgStyle: _propTypes2.default.object,

  iconBadgeClassName: _propTypes2.default.string,

  onClickCell: _propTypes2.default.func,
  onClickIconBox: _propTypes2.default.func,
  onClickIcon: _propTypes2.default.func,

  closeClassName: _propTypes2.default.string,
  onClickDelete: _propTypes2.default.func,

  onClickAdd: _propTypes2.default.func };
Grid.defaultProps = {
  iconBadgeClassName: 'top right',
  list: [],
  args: null,
  iconStyle: {},
  space: 0,
  wing: 0,
  col: '3'
};
exports.default = Grid;
module.exports = exports['default'];