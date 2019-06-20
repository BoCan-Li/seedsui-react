'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _Bridge = require('./../Bridge');

var _Bridge2 = _interopRequireDefault(_Bridge);

var _Grid = require('./../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// require PrototypeObject.js
var Count = {
  fontSize: '12px',
  color: '#999',
  verticalAlign: '0',
  marginLeft: '4px'
};

var ImgUploader = function (_Component) {
  (0, _inherits3.default)(ImgUploader, _Component);

  function ImgUploader(props) {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, ImgUploader);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ImgUploader.__proto__ || (0, _getPrototypeOf2.default)(ImgUploader)).call(this, props));

    _this.componentDidMount = function () {
      // 初始化图片组件
      _this.instance = new _Bridge2.default.Image({
        onChooseSuccess: _this.chooseSuccess,
        // 以下回调,只有微信有
        onChooseFail: _this.props.onChooseFail,
        onUploadsSuccess: _this.uploadsSuccess,
        onUploadSuccess: _this.uploadSuccess,
        onUploadFail: _this.uploadFail
      });
    };

    _this.convertList = function (imgMap) {
      var list = [];
      if (_Bridge2.default.platform === 'waiqin') {
        for (var img in imgMap) {
          list.push({
            id: img, // 外勤客户端中,id就是name
            name: img, // 外勤客户端用于上传到服务器dir+name拼接时使用
            src: imgMap[img].src,
            thumb: imgMap[img].base64,
            sourceType: imgMap[img].sourceType,
            base64: imgMap[img].path
          });
        }
      } else if (_Bridge2.default.platform === 'dinghuo') {
        for (var _img in imgMap) {
          list.push({
            id: _img,
            name: _img,
            src: 'LocalResource://imageid' + _img,
            thumb: 'LocalResource://imageid' + _img,
            sourceType: imgMap[_img].sourceType
          });
        }
      } else if (_Bridge2.default.platform === 'weixin' || _Bridge2.default.platform === 'weixinwork') {
        for (var _img2 in imgMap) {
          list.push({
            id: _img2,
            name: _img2,
            src: _img2,
            thumb: _img2,
            sourceType: imgMap[_img2].sourceType,
            serverId: imgMap[_img2].serverId
          });
        }
      } else {
        // browser测试
        for (var _img3 in imgMap) {
          list.push({
            id: _img3,
            name: _img3,
            src: _img3,
            thumb: _img3,
            sourceType: imgMap[_img3].sourceType,
            serverId: imgMap[_img3].serverId
          });
        }
      }
      return list;
    };

    _this.filterUploadFail = function (imgMap) {
      // 为已选列表加入serverId
      var list = _this.props.list.map(function (item) {
        if (imgMap[item.id] && !item.serverId) {
          item.serverId = imgMap[item.id].serverId;
        }
        return item;
      });
      // 过滤上传失败的图片
      var failIndexs = [];
      list = list.filter(function (item, index) {
        if (item.serverId) return true;
        failIndexs.push(index + 1);
        return false;
      });
      if (failIndexs && failIndexs.length) {
        _Bridge2.default.showToast('您选择的第' + failIndexs.join(',') + '张图片上传失败, 请重新拍照上传', { mask: false });
      }
      return list;
    };

    _this.chooseSuccess = function (imgMap, res) {
      // 拼接所有图片
      var list = _this.props.list.concat(_this.convertList(imgMap));
      if (_this.props.onChooseSuccess) _this.props.onChooseSuccess(list, res);
      if (_this.props.onChange) _this.props.onChange(list, res);
    };

    _this.uploadsSuccess = function (imgMap) {
      // 过滤掉上传失败的图片
      var list = _this.filterUploadFail(imgMap);
      // Callback
      if (_this.props.onUploadsSuccess) _this.props.onUploadsSuccess(list);
      if (_this.props.onChange) _this.props.onChange(list);
    };

    _this.uploadSuccess = function (imgMap, res) {
      if (_this.props.onUploadSuccess) {
        // 过滤掉上传失败的图片
        var list = _this.filterUploadFail(imgMap);
        _this.props.onUploadSuccess(list, res);
      }
    };

    _this.uploadFail = function (imgMap, res) {
      // imgMap, {id, index, item, errMsg}
      if (_this.props.onUploadFail) {
        // 过滤掉上传失败的图片
        var list = _this.filterUploadFail(imgMap);
        _this.props.onUploadFail(list, res);
      }
    };

    _this.chooseImg = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var allowChoose, _this$props, list, enableSafe, max, sourceType, sizeType, chooseOptions, chooseRepeat, localIds;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!_this.props.onChooseBefore) {
                _context.next = 6;
                break;
              }

              _context.next = 3;
              return _this.props.onChooseBefore();

            case 3:
              allowChoose = _context.sent;

              if (allowChoose) {
                _context.next = 6;
                break;
              }

              return _context.abrupt('return');

            case 6:
              _this$props = _this.props, list = _this$props.list, enableSafe = _this$props.enableSafe, max = _this$props.max, sourceType = _this$props.sourceType, sizeType = _this$props.sizeType, chooseOptions = _this$props.chooseOptions, chooseRepeat = _this$props.chooseRepeat;
              // 是否允许选择重复照片

              localIds = [];

              if (!chooseRepeat) {
                localIds = list.map(function (item) {
                  return item.id;
                });
              }
              _this.instance.choose({
                enableSafe: enableSafe, // 安全上传,第次只能传一张
                max: max,
                currentCount: _this.props.list.length,
                sourceType: sourceType,
                sizeType: sizeType,
                localIds: localIds, // 已选照片, 只有微信生效
                chooseOptions: chooseOptions
              });

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));

    _this.deleteImg = function (item) {
      var list = _this.props.list.filter(function (photo) {
        if (photo.id === item.id) return false;
        return true;
      });
      // Callback
      if (_this.props.onChange) _this.props.onChange(list);
      if (_this.props.onDeleteSuccess) _this.props.onDeleteSuccess(list);
    };

    return _this;
  }
  // 转换成照片格式

  // 微信: 过滤上传失败的图片

  // 图片选择完成

  // 微信: 图片全部上传成功

  // 微信: 单个图片上传成功

  // 微信: 单个图片上传失败, 这里并没有删除上传失败的图片, 是因为全部上传完成后会走onUploadsSuccess, 由uploadsSuccess统一删除

  // 选择照片

  // 删除照片


  (0, _createClass3.default)(ImgUploader, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          style = _props.style,
          caption = _props.caption,
          captionStyle = _props.captionStyle,
          captionClassName = _props.captionClassName,
          captionAfter = _props.captionAfter,
          list = _props.list,
          enableSafe = _props.enableSafe,
          max = _props.max,
          sourceType = _props.sourceType,
          sizeType = _props.sizeType,
          showUpload = _props.showUpload,
          showDelete = _props.showDelete,
          readOnly = _props.readOnly,
          showCount = _props.showCount,
          chooseOptions = _props.chooseOptions,
          onChange = _props.onChange,
          onChooseSuccess = _props.onChooseSuccess,
          onUploadsSuccess = _props.onUploadsSuccess,
          onDeleteSuccess = _props.onDeleteSuccess,
          others = (0, _objectWithoutProperties3.default)(_props, ['className', 'style', 'caption', 'captionStyle', 'captionClassName', 'captionAfter', 'list', 'enableSafe', 'max', 'sourceType', 'sizeType', 'showUpload', 'showDelete', 'readOnly', 'showCount', 'chooseOptions', 'onChange', 'onChooseSuccess', 'onUploadsSuccess', 'onDeleteSuccess']);


      return [caption && _react2.default.createElement(
        'div',
        {
          key: 'iuCaption',
          className: 'grid-title' + (captionClassName ? ' ' + captionClassName : ''),
          style: captionStyle },
        caption,
        showCount ? _react2.default.createElement(
          'span',
          { style: Count },
          '(',
          list.length,
          '/',
          max,
          ')'
        ) : null,
        captionAfter
      ), _react2.default.createElement(_Grid2.default, (0, _extends3.default)({
        key: 'iuGrid',
        onClickDelete: this.props.showDelete ? this.deleteImg : null,
        onClickAdd: this.chooseImg,
        list: list,
        showUpload: list.length < max && this.props.showUpload,
        showDelete: showDelete,
        className: 'grid-album' + (className ? ' ' + className : ''),
        iconClassName: 'icon-full',
        wing: 12,
        space: 12,
        style: style
      }, others))];
    }
  }]);
  return ImgUploader;
}(_react.Component);

ImgUploader.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  caption: _propTypes2.default.node,
  captionStyle: _propTypes2.default.object,
  captionClassName: _propTypes2.default.string,
  captionAfter: _propTypes2.default.node,
  list: _propTypes2.default.array,

  enableSafe: _propTypes2.default.bool,
  max: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  sourceType: _propTypes2.default.array,
  sizeType: _propTypes2.default.oneOfType([// 压缩['original', 'compressed']
  _propTypes2.default.array, _propTypes2.default.string, _propTypes2.default.number]),

  showUpload: _propTypes2.default.bool, // 显示上传按钮
  showDelete: _propTypes2.default.bool, // 显示删除按钮
  readOnly: _propTypes2.default.bool,

  showCount: _propTypes2.default.bool, // 标题显示图片张字
  chooseOptions: _propTypes2.default.object, // 选择照片参数

  onDeleteSuccess: _propTypes2.default.func, // 照片删除完成
  onChange: _propTypes2.default.func, // 照片发生变化
  onChooseBefore: _propTypes2.default.func, // 选择照片之前校验, 返回true则继续, 返回false则停止
  onChooseSuccess: _propTypes2.default.func, // 照片选择完成
  // 以下回调,只有微信有
  onChooseFail: _propTypes2.default.func, // 照片选择错误
  onUploadsSuccess: _propTypes2.default.func, // 照片全部上传完成
  onUploadSuccess: _propTypes2.default.func, // 照片上传完成
  onUploadFail: _propTypes2.default.func // 照片上传失败

};
ImgUploader.defaultProps = {
  enableSafe: false, // 安全上传,第次只能传一张
  max: 5,
  sourceType: ['album', 'camera'],
  sizeType: ['compressed'], // ['original', 'compressed']
  list: [], // 格式[{id: '用于删除标识,订货和微信上传的值', src: '预览地址,外勤客户端上传的地址', thumb: '缩略图'}]
  showUpload: false,
  showDelete: false
};
exports.default = ImgUploader;
module.exports = exports['default'];