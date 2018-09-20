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

var _Bridge = require('./../Bridge');

var _Bridge2 = _interopRequireDefault(_Bridge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Weather = function (_Component) {
  (0, _inherits3.default)(Weather, _Component);

  function Weather(props, context) {
    (0, _classCallCheck3.default)(this, Weather);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Weather.__proto__ || (0, _getPrototypeOf2.default)(Weather)).call(this, props, context));

    _this.onClick = function (e) {
      e.currentTarget.classList.toggle('expand');
    };

    _this.isNight = function () {
      var date = new Date();
      var hour = date.getHours();
      if (hour >= 18 || hour <= 6) return true;
      return false;
    };

    _this.replacePicture = function (weatherImg) {
      if (!_this.props.icons) return weatherImg;
      var weatherImgName = weatherImg.substring(weatherImg.lastIndexOf('/') + 1, weatherImg.lastIndexOf('.'));
      if (_this.isNight()) {
        return _this.props.icons[weatherImgName] + ' weather-night';
      }
      return _this.props.icons[weatherImgName];
    };

    _this.pm25ToAirQuality = function (pm25) {
      var airquality = '空气质量';
      if (isNaN(pm25)) return airquality;
      if (pm25 <= 50) {
        airquality = '优';
      } else if (pm25 > 50 && pm25 <= 100) {
        airquality = '良';
      } else if (pm25 > 100 && pm25 <= 150) {
        airquality = '轻度污染';
      } else if (pm25 > 150 && pm25 <= 200) {
        airquality = '中度污染';
      } else if (pm25 > 200 && pm25 <= 300) {
        airquality = '重度污染';
      } else {
        airquality = '严重污染';
      }
      return airquality;
    };

    _this.getCurrentTemperature = function (weather_data) {
      if (!weather_data || !weather_data.length || !weather_data[0].date) return '0℃';
      var date = weather_data[0].date; // 周二 09月18日 (实时：29℃) 返回 29℃
      return date.substring(date.indexOf('：') + 1, date.indexOf(')'));
    };

    _this.getCurrentTempRange = function (weather_data) {
      if (!weather_data || !weather_data.length || !weather_data[0].temperature) return '0 ~ 0℃';
      return weather_data[0].temperature;
    };

    _this.getCurrentDate = function (weather_data) {
      if (!weather_data || !weather_data.length || !weather_data[0].date) return '日期';
      var date = weather_data[0].date; // 周二 09月18日 (实时：29℃) 返回 29℃
      return date.substring(date.indexOf(' ') + 1, date.indexOf('日') + 1);
    };

    _this.getWeatherName = function (weather_data) {
      if (!weather_data || !weather_data.length || !weather_data[0].weather) return '天气名称';
      return weather_data[0].weather;
    };

    _this.getWind = function (weather_data) {
      if (!weather_data || !weather_data.length || !weather_data[0].wind) return '风向级数';
      return weather_data[0].wind;
    };

    _this.getCurrentIcon = function (weather_data) {
      if (!weather_data || !weather_data.length || !weather_data[0].dayPictureUrl) return '';
      return _this.replacePicture(weather_data[0].dayPictureUrl);
    };

    _this.getIcon = function (weather) {
      if (!weather || !weather.dayPictureUrl) return '';
      return _this.replacePicture(weather.dayPictureUrl);
    };

    _this.getWeekDay = function (date) {
      // 周二 09月18日 (实时：29℃)
      if (!date) return '周一';
      if (date.indexOf(' ') === -1) return date;
      return date.substring(0, date.indexOf(' '));
    };

    _this.state = {
      detail: {}
    };
    return _this;
  }

  (0, _createClass3.default)(Weather, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      if (this.props.location && prevProps.location !== this.props.location) {
        _Bridge2.default.getWeather({
          location: this.props.location,
          onSuccess: function onSuccess(results) {
            _this2.setState({
              detail: results[0]
            });
          }
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      if (this.props.location) {
        _Bridge2.default.getWeather({
          location: this.props.location,
          onSuccess: function onSuccess(results) {
            _this3.setState({
              detail: results[0]
            });
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          className = _props.className,
          style = _props.style;
      var detail = this.state.detail;

      return _react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this4.$el = el;
          }, className: 'weather' + (className ? ' ' + className : ''), style: style, onClick: this.onClick },
        _react2.default.createElement(
          'div',
          { className: 'weather-collapse' },
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              'span',
              null,
              detail.currentCity || '地区'
            ),
            _react2.default.createElement(
              'span',
              null,
              this.getWeatherName(detail.weather_data)
            )
          ),
          _react2.default.createElement(
            'p',
            null,
            '\u7A7A\u6C14',
            this.pm25ToAirQuality(detail.pm25)
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'weather-topbar' },
          _react2.default.createElement(
            'span',
            null,
            detail.currentCity || '地区'
          ),
          _react2.default.createElement(
            'p',
            { className: 'weather-current-date' },
            this.getCurrentDate(detail.weather_data)
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'weather-today' },
          _react2.default.createElement(
            'div',
            { className: 'weather-today-left' },
            _react2.default.createElement(
              'div',
              { className: 'weather-current-temperature' },
              this.getCurrentTemperature(detail.weather_data)
            ),
            _react2.default.createElement(
              'div',
              { className: 'weather-current-snd' },
              _react2.default.createElement(
                'p',
                null,
                this.getCurrentTempRange(detail.weather_data)
              ),
              _react2.default.createElement(
                'p',
                null,
                '\u7A7A\u6C14',
                this.pm25ToAirQuality(detail.pm25)
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'weather-today-right' },
            _react2.default.createElement('div', { className: 'weather-current-icon ' + this.getCurrentIcon(detail.weather_data) }),
            _react2.default.createElement(
              'div',
              { className: 'weather-current-snd' },
              _react2.default.createElement(
                'p',
                null,
                this.getWeatherName(detail.weather_data)
              ),
              _react2.default.createElement(
                'p',
                null,
                this.getWind(detail.weather_data)
              )
            )
          )
        ),
        _react2.default.createElement(
          'ul',
          { className: 'weather-otherday' },
          detail.weather_data && detail.weather_data.map(function (item, index) {
            return _react2.default.createElement(
              'li',
              { key: 'item' + index },
              _react2.default.createElement('i', { className: 'weather-icon ' + _this4.getIcon(item) }),
              _react2.default.createElement(
                'p',
                null,
                item.temperature
              ),
              _react2.default.createElement(
                'p',
                null,
                item.weather
              ),
              _react2.default.createElement(
                'p',
                null,
                _this4.getWeekDay(item.date)
              )
            );
          })
        )
      );
    }
  }]);
  return Weather;
}(_react.Component);

Weather.propTypes = {
  location: _propTypes2.default.string, // location: 'lng,lat|lng,lat|lng,lat' 或 '北京市|上海市'
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  icons: _propTypes2.default.object
};
Weather.defaultProps = {
  location: '北京市',
  icons: {
    'qing': 'icon-wea-qing',
    'duoyun': 'icon-wea-duoyun',
    'zhenyu': 'icon-wea-zhenyu',
    'leizhenyu': 'icon-wea-leizhenyu',
    'leizhenyubanyoubingbao': 'icon-wea-leizhenyubanyoubingbao',
    'yujiaxue': 'icon-wea-yujiaxue',
    'xiaoyu': 'icon-wea-xiaoyu',
    'zhongyu': 'icon-wea-zhongyu',
    'dayu': 'icon-wea-dayu',
    'baoyu': 'icon-wea-baoyu',
    'dabaoyu': 'icon-wea-dabaoyu',
    'tedabaoyu': 'icon-wea-tedabaoyu',
    'zhenxue': 'icon-wea-zhenxue',
    'xiaoxue': 'icon-wea-xiaoxue',
    'zhongxue': 'icon-wea-zhongxue',
    'daxue': 'icon-wea-daxue',
    'baoxue': 'icon-wea-baoxue',
    'wu': 'icon-wea-wu',
    'dongyu': 'icon-wea-dongyu',
    'shachenbao': 'icon-wea-shachenbao',
    'xiaoyuzhuanzhongyu': 'icon-wea-xiaoyuzhuanzhongyu',
    'zhongyuzhuandayu': 'icon-wea-zhongyuzhuandayu',
    'dayuzhuanbaoyu': 'icon-wea-dayuzhuanbaoyu',
    'baoyuzhuandabaoyu': 'icon-wea-baoyuzhuandabaoyu',
    'dabaoyuzhuantedabaoyu': 'icon-wea-dabaoyuzhuantedabaoyu',
    'xiaoxuezhuanzhongxue': 'icon-wea-xiaoxuezhuanzhongxue',
    'zhongxuezhuandaxue': 'icon-wea-zhongxuezhuandaxue',
    'daxuezhuanbaoxue': 'icon-wea-daxuezhuanbaoxue',
    'fuchen': 'icon-wea-fuchen',
    'yangsha': 'icon-wea-yangsha',
    'qiangshachenbao': 'icon-wea-qiangshachenbao',
    'mai': 'icon-wea-mai',
    'yin': 'icon-wea-yin'
  }
};
exports.default = Weather;
module.exports = exports['default'];