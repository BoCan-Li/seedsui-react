'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var loggerMiddleware = function loggerMiddleware(store) {
  return function (next) {
    return function (action) {
      console.log('日志:dispatching', action);
      var result = next(action);
      console.log('日志:next state', store.getState());
      return result;
    };
  };
};
exports.default = loggerMiddleware;
module.exports = exports['default'];