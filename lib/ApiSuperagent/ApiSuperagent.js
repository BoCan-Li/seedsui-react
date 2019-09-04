'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methods = ['get', 'post', 'put', 'patch', 'del'];

var Api = function () {
  function Api(req) {
    var _this = this;

    (0, _classCallCheck3.default)(this, Api);

    this.baseURL = '';
    this.setBaseURL = function (baseURL) {
      _this.baseURL = baseURL;
    };
    this.formatUrl = function () {
      var adjustedPath = path[0] !== '/' ? '/' + path : path;
      return _this.baseURL + adjustedPath;
    };
    methods.forEach(function (method) {
      return _this[method] = function (path) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            params = _ref.params,
            data = _ref.data,
            head = _ref.head,
            form = _ref.form;

        return new _promise2.default(function (resolve, reject) {
          var request = _superagent2.default[method](_this.formatUrl(path));
          // request.timeout(10000);
          if (form) {
            request.type('form');
          }

          if (params) {
            request.query(params);
          }

          if (__SERVER__ && req.get('cookie')) {
            request.set('cookie', req.get('cookie'));
          }

          if (head) {
            // 设置头部
            (0, _keys2.default)(head).map(function (key) {
              var value = head[key];
              request.set(key, value);
            });
          }

          if (form) {
            request.send(form);
          }

          if (data) {
            request.send(data);
          }

          request.end(function (err) {
            var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var body = res.body;

            try {
              body = JSON.parse(res.text);
            } catch (error) {
              console.log('解析老协议错误！');
            }
            // 如果code不等于1，则走reject
            /* let promise = resolve(body);
            if (body && body.code && body.code.toString() !== '1' && body.code.toString() !== '204000001') promise = reject(body || err);
            return err ? reject(body || err) : promise; */
            // 继续处理
            return err ? reject(body || err) : resolve(body);
          });
        });
      };
    });
  }

  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */


  (0, _createClass3.default)(Api, [{
    key: 'empty',
    value: function empty() {}
  }]);
  return Api;
}();

exports.default = Api;
module.exports = exports['default'];