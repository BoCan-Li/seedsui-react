'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var Count = {
  fontSize: '12px',
  color: '#999',
  verticalAlign: '0',
  marginLeft: '4px'
};

var ImgUploader = function (_Component) {
  (0, _inherits3.default)(ImgUploader, _Component);

  function ImgUploader(props) {
    (0, _classCallCheck3.default)(this, ImgUploader);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ImgUploader.__proto__ || (0, _getPrototypeOf2.default)(ImgUploader)).call(this, props));

    _this.componentDidMount = function () {
      // 初始化图片组件
      _this.setState({
        instance: new _Bridge2.default.Image({
          onChooseSuccess: _this.chooseSuccess,
          onUploadsSuccess: _this.uploadsSuccess,
          onUploadFail: _this.uploadFail
        })
      });
    };

    _this.convertList = function (imgMap) {
      var list = [];
      if (_Bridge2.default.platform === 'waiqin') {
        for (var img in imgMap) {
          list.push({
            id: img, // 外勤客户端中,id就是name
            src: imgMap[img].src,
            thumb: imgMap[img].base64,
            sourceType: imgMap[img].sourceType,
            name: img,
            base64: imgMap[img].path
          });
        }
      } else if (_Bridge2.default.platform === 'dinghuo') {
        for (var _img in imgMap) {
          list.push({
            id: _img,
            src: 'LocalResource://imageid' + _img,
            thumb: 'LocalResource://imageid' + _img,
            sourceType: imgMap[_img].sourceType
          });
        }
      } else if (_Bridge2.default.platform === 'weixin' || _Bridge2.default.platform === 'weixinwork') {
        for (var _img2 in imgMap) {
          list.push({
            id: _img2,
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
            name: _img3, // 外勤客户端用于上传到服务器dir+name拼接时使用
            src: _img3,
            thumb: _img3,
            sourceType: imgMap[_img3].sourceType,
            serverId: imgMap[_img3].serverId
          });
        }
      }
      return list;
    };

    _this.onChange = function (imgMap, op) {
      var currentList = _this.convertList(imgMap);
      // 过滤原有list中和现在list中相同的图片
      var prevList = _this.props.list.filter(function (item) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)(currentList), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var current = _step.value;

            if (current.id === item.id) return false;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return true;
      });
      var list = currentList.concat(prevList);
      // Callback
      if (_this.props.onChange) _this.props.onChange(list, op);
    };

    _this.chooseSuccess = function (imgMap) {
      _this.onChange(imgMap, { op: 'chooseSuccess' });
      if (_this.props.onChooseSuccess) _this.props.onChooseSuccess(_this.convertList(imgMap));
    };

    _this.uploadsSuccess = function (imgMap) {
      _this.onChange(imgMap, { op: 'uploadsSuccess' });
      if (_this.props.onUploadsSuccess) _this.props.onUploadsSuccess(_this.convertList(imgMap));
    };

    _this.uploadFail = function (index) {
      // 删除上传错误的一项
      var list = Object.clone(_this.props.list);
      list.splice(index, 1);
      // Callback
      if (_this.props.onChange) _this.props.onChange(list);
      // 上传失败,则重新鉴权
      _Bridge2.default.config({
        onError: function onError(res) {
          _Bridge2.default.showToast(res.msg, { mask: false });
        }
      });
    };

    _this.chooseImg = function () {
      var _this$props = _this.props,
          enableSafe = _this$props.enableSafe,
          max = _this$props.max,
          sourceType = _this$props.sourceType,
          sizeType = _this$props.sizeType,
          watermark = _this$props.watermark;

      _this.state.instance.choose({
        enableSafe: enableSafe, // 安全上传,第次只能传一张
        max: max,
        currentCount: _this.props.list.length,
        sourceType: sourceType,
        sizeType: sizeType,
        watermark: watermark
      });
    };

    _this.deleteImg = function (item) {
      var list = _this.props.list.filter(function (photo) {
        if (photo.id === item.id) return false;
        return true;
      });
      // Callback
      if (_this.props.onChange) _this.props.onChange(list, { op: 'deleteSuccess' });
      if (_this.props.onDeleteSuccess) _this.props.onDeleteSuccess(list);
    };

    _this.state = {
      instance: null
    };
    return _this;
  }

  (0, _createClass3.default)(ImgUploader, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          list = _props.list,
          className = _props.className,
          style = _props.style,
          caption = _props.caption,
          captionClassName = _props.captionClassName,
          captionStyle = _props.captionStyle,
          max = _props.max,
          showCount = _props.showCount,
          showDelete = _props.showDelete;

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
        ) : null
      ), _react2.default.createElement(_Grid2.default, {
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
      })];
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
  watermark: _propTypes2.default.object, // 增加水印

  onChange: _propTypes2.default.func, // 照片发生变化
  onChooseSuccess: _propTypes2.default.func, // 照片选择完成
  onUploadsSuccess: _propTypes2.default.func, // 照片上传完成
  onDeleteSuccess: _propTypes2.default.func // 照片删除完成
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