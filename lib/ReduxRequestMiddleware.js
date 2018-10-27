'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = requestMiddleware;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function requestMiddleware(request) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;

    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState);
        }

        var promise = action.promise,
            types = action.types,
            rest = (0, _objectWithoutProperties3.default)(action, ['promise', 'types']); // eslint-disable-line no-redeclare

        if (!promise) {
          return next(action);
        }

        var _types = (0, _slicedToArray3.default)(types, 3),
            REQUEST = _types[0],
            SUCCESS = _types[1],
            FAILURE = _types[2];

        next((0, _extends3.default)({}, rest, { type: REQUEST }));

        var actionPromise = promise(request);
        actionPromise.then(function (result) {
          return next((0, _extends3.default)({}, rest, { result: result, type: SUCCESS }));
        }, function (error) {
          return next((0, _extends3.default)({}, rest, { error: error, type: FAILURE }));
        }).catch(function (error) {
          console.error('MIDDLEWARE ERROR:', error);
          next((0, _extends3.default)({}, rest, { error: error, type: FAILURE }));
        });

        return actionPromise;
      };
    };
  };
}
module.exports = exports['default'];