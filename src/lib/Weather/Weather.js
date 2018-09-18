import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bridge from './../Bridge';

export default class Weather extends Component {
  static propTypes = {
    location: PropTypes.string, // location: 'lng,lat|lng,lat|lng,lat' 或 '北京市|上海市'
    className: PropTypes.string,
    style: PropTypes.object,
    icons: PropTypes.object
  };

  static defaultProps = {
    location: '北京市',
    icons: {
			'qing' : 'icon-wea-qing',
			'duoyun' : 'icon-wea-duoyun',
			'zhenyu' : 'icon-wea-zhenyu',
			'leizhenyu' : 'icon-wea-leizhenyu',
			'leizhenyubanyoubingbao' : 'icon-wea-leizhenyubanyoubingbao',
			'yujiaxue' : 'icon-wea-yujiaxue',
			'xiaoyu' : 'icon-wea-xiaoyu',
			'zhongyu' : 'icon-wea-zhongyu',
			'dayu' : 'icon-wea-dayu',
			'baoyu' : 'icon-wea-baoyu',
			'dabaoyu' : 'icon-wea-dabaoyu',
			'tedabaoyu' : 'icon-wea-tedabaoyu',
			'zhenxue' : 'icon-wea-zhenxue',
			'xiaoxue' : 'icon-wea-xiaoxue',
			'zhongxue' : 'icon-wea-zhongxue',
			'daxue' : 'icon-wea-daxue',
			'baoxue' : 'icon-wea-baoxue',
			'wu' : 'icon-wea-wu',
			'dongyu' : 'icon-wea-dongyu',
			'shachenbao' : 'icon-wea-shachenbao',
			'xiaoyuzhuanzhongyu' : 'icon-wea-xiaoyuzhuanzhongyu',
			'zhongyuzhuandayu' : 'icon-wea-zhongyuzhuandayu',
			'dayuzhuanbaoyu' : 'icon-wea-dayuzhuanbaoyu',
			'baoyuzhuandabaoyu' : 'icon-wea-baoyuzhuandabaoyu',
			'dabaoyuzhuantedabaoyu' : 'icon-wea-dabaoyuzhuantedabaoyu',
			'xiaoxuezhuanzhongxue' : 'icon-wea-xiaoxuezhuanzhongxue',
			'zhongxuezhuandaxue' : 'icon-wea-zhongxuezhuandaxue',
			'daxuezhuanbaoxue' : 'icon-wea-daxuezhuanbaoxue',
			'fuchen' : 'icon-wea-fuchen',
			'yangsha' : 'icon-wea-yangsha',
			'qiangshachenbao' : 'icon-wea-qiangshachenbao',
			'mai' : 'icon-wea-mai',
			'yin' : 'icon-wea-yin'
		}
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      detail: {}
    }
  }
  componentDidUpdate (prevProps) {
    if (this.props.location && prevProps.location !== this.props.location) {
      Bridge.getWeather({
        location: this.props.location,
        onSuccess: (results) => {
          this.setState({
            detail: results[0]
          })
        }
      });
    }
  }
  onClick = (e) => {
    e.currentTarget.classList.toggle('expand')
  }
  componentDidMount () {
    if (this.props.location) {
      Bridge.getWeather({
        location: this.props.location,
        onSuccess: (results) => {
          this.setState({
            detail: results[0]
          })
        }
      });
    }
  }
  isNight = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 18 || hour <= 6) return true;
    return false;
  }
  replacePicture = (weatherImg) => {
    if (!this.props.icons) return weatherImg;
    var weatherImgName = weatherImg.substring(weatherImg.lastIndexOf('/')+1, weatherImg.lastIndexOf('.'));
    if (this.isNight()) {
      return this.props.icons[weatherImgName] + ' weather-night';
    }
    return this.props.icons[weatherImgName];
  }
  pm25ToAirQuality = (pm25) => {
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
  }
  getCurrentTemperature = (weather_data) => {
    if (!weather_data || !weather_data.length || !weather_data[0].date) return '0℃';
    const date = weather_data[0].date;// 周二 09月18日 (实时：29℃) 返回 29℃
    return date.substring(date.indexOf('：') + 1, date.indexOf(')'));
  }
  getCurrentTempRange = (weather_data) => {
    if (!weather_data || !weather_data.length || !weather_data[0].temperature) return '0 ~ 0℃';
    return weather_data[0].temperature;
  }
  getCurrentDate = (weather_data) => {
    if (!weather_data || !weather_data.length || !weather_data[0].date) return '日期';
    const date = weather_data[0].date;// 周二 09月18日 (实时：29℃) 返回 29℃
    return date.substring(date.indexOf(' ') + 1, date.indexOf('日') + 1);
  }
  getWeatherName = (weather_data) => {
    if (!weather_data || !weather_data.length || !weather_data[0].weather) return '天气名称';
    return weather_data[0].weather
  }
  getWind = (weather_data) => {
    if (!weather_data || !weather_data.length || !weather_data[0].wind) return '风向级数';
    return weather_data[0].wind
  }
  getCurrentIcon = (weather_data) => {
    if (!weather_data || !weather_data.length || !weather_data[0].dayPictureUrl) return '';
    return this.replacePicture(weather_data[0].dayPictureUrl);
  }
  getIcon = (weather) => {
    if (!weather || !weather.dayPictureUrl) return '';
    return this.replacePicture(weather.dayPictureUrl);
  }
  getWeekDay = (date) => { // 周二 09月18日 (实时：29℃)
    if (!date) return '周一';
    if (date.indexOf(' ') === -1) return date;
    return date.substring(0, date.indexOf(' '));
  }
  render() {
    const {className, style} = this.props;
    const {detail} = this.state;
    return (
      <div ref={(el) => {this.$el = el;}} className={`weather${className ? ' ' + className : ''}`} style={style} onClick={this.onClick}>
        <div className="weather-collapse">
          <p>
            <span>{detail.currentCity || '地区'}</span>
            <span>{this.getWeatherName(detail.weather_data)}</span>
          </p>
          <p>空气{this.pm25ToAirQuality(detail.pm25)}</p>
        </div>
        <div className="weather-topbar">
          <span>{detail.currentCity || '地区'}</span>
          <p className="weather-current-date">{this.getCurrentDate(detail.weather_data)}</p>
        </div>
        <div className="weather-today">
          <div className="weather-today-left">
            <div className="weather-current-temperature">{this.getCurrentTemperature(detail.weather_data)}</div>
            <div className="weather-current-snd">
              <p>{this.getCurrentTempRange(detail.weather_data)}</p>
              <p>空气{this.pm25ToAirQuality(detail.pm25)}</p>
            </div>
          </div>
          <div className="weather-today-right">
            <div className={`weather-current-icon ${this.getCurrentIcon(detail.weather_data)}`}></div>
            <div className="weather-current-snd">
              <p>{this.getWeatherName(detail.weather_data)}</p>
              <p>{this.getWind(detail.weather_data)}</p>
            </div>
          </div>
        </div>
        <ul className="weather-otherday">
        {detail.weather_data && detail.weather_data.map((item, index) => {
          return <li key={`item${index}`}>
            <i className={`weather-icon ${this.getIcon(item)}`}></i>
            <p>{item.temperature}</p>
            <p>{item.weather}</p>
            <p>{this.getWeekDay(item.date)}</p>
          </li>
        })}
        </ul>
      </div>
    );
  }
}
