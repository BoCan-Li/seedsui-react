import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {cityChange, addrChange, defaultChange, phoneChange, telChange, nameChange, ageChange, init} from 'store/modules/form';
import bridge from 'components/seedsui/utils/bridge';
import Page from 'components/seedsui/Page/Page.jsx';
import Container from 'components/seedsui/Container/Container.jsx';
import Header from 'components/seedsui/Header/Header.jsx';
import Titlebar from 'components/seedsui/Titlebar/Titlebar.jsx';
import Button from 'components/seedsui/Button/Button.jsx';
import InputText from 'components/seedsui/InputText/InputText.jsx';
import InputPhone from 'components/seedsui/InputPhone/InputPhone.jsx';
import InputCity from 'components/seedsui/InputCity/InputCity.jsx';
import InputPre from 'components/seedsui/InputPre/InputPre.jsx';
import Group from 'components/seedsui/Group/Group.jsx';
import List from 'components/seedsui/List/List.jsx';
import Switch from 'components/seedsui/Switch/Switch.jsx';
import Toast from 'components/seedsui/Toast/Toast.jsx';
import Attribute from 'components/seedsui/Attribute/Attribute.jsx';
import NumBox from 'components/seedsui/NumBox/NumBox.jsx';

@withRouter
@connect(state => ({
  area: state.form.area, // 地区名称
  city: state.form.city, // 城市名称
  id: state.form.id, // 收货地址id
  is_default: state.form.is_default, // 是否设置为默认地址
  mss_area: state.form.mss_area, // 地区编码
  mss_city: state.form.mss_city, // 城市编码
  mss_province: state.form.mss_province, // 省编码
  province: state.form.province, // 省名称
  receive_addr: state.form.receive_addr, // 收货详细地址
  receive_name: state.form.receive_name, // 收货人
  receive_phone: state.form.receive_phone, // 收货手机号
  receive_tel: state.form.receive_tel, // 收货电话
  age: state.form.age, // 年龄
}), {
  cityChange,
  addrChange,
  defaultChange,
  phoneChange,
  telChange,
  nameChange,
  ageChange,
  init
})
export default class form extends Component {
  static propTypes = {
    cityChange: PropTypes.func,
    addrChange: PropTypes.func,
    defaultChange: PropTypes.func,
    phoneChange: PropTypes.func,
    telChange: PropTypes.func,
    nameChange: PropTypes.func,
    ageChange: PropTypes.func,
    init: PropTypes.func,
    area: PropTypes.string, // 地区名称
    city: PropTypes.string, // 城市名称
    id: PropTypes.string, // 收货地址id
    is_default: PropTypes.string, // 是否设置为默认地址
    mss_area: PropTypes.string, // 地区编码
    mss_city: PropTypes.string, // 城市编码
    mss_province: PropTypes.string, // 省编码
    province: PropTypes.string, // 省名称
    receive_addr: PropTypes.string, // 收货详细地址
    receive_name: PropTypes.string, // 收货人
    receive_phone: PropTypes.string, // 收货手机号
    receive_tel: PropTypes.string, // 收货电话
    age: PropTypes.string, // 年龄
  };
  constructor (props) {
    super(props);
    this.state = {
      toastMsg: '',
      toastShow: false,
      isFirst: false
    }
  }
  componentDidMount = () => {
    // 初始化
    this.props.init();
    // 注册给客户端调用的返回事件
    bridge.addBackPress();
  }
  componentWillUnmount = () => {
    window.clearTimeout(this.timeout);
  }
  validate = () => {
    const {
      province, // 省名称
      receive_addr, // 收货详细地址
      receive_name, // 收货人
      receive_phone, // 收货手机号
    } = this.props;
    if (!receive_name) {
      return '请填写收货人';
    }
    if (!receive_phone) {
      return '请填写联系手机';
    }
    if (!/^([1][34578][0-9]{9})$/.test(receive_phone)) {
      return '请填写正确的手机号码';
    }
    if (!province) {
      return '请选择地区';
    }
    if (!receive_addr) {
      return '请填写详细地址';
    }
    return '';
  }
  onSubmit = () => {
    var msg = this.validate();
    if (msg) {
      this.showMsg(msg);
      return;
    }
    const {
      area, // 地区名称
      city, // 城市名称
      id, // 收货地址id
      is_default, // 是否设置为默认地址
      mss_area, // 地区编码
      mss_city, // 城市编码
      mss_province, // 省编码
      province, // 省名称
      receive_addr, // 收货详细地址
      receive_name, // 收货人
      receive_phone, // 收货手机号
      receive_tel, // 收货电话
      age, // 年龄
    } = this.props;
    const params = {
      area,
      city,
      id,
      is_default,
      mss_area,
      mss_city,
      mss_province,
      province,
      receive_addr,
      receive_name,
      receive_phone,
      receive_tel,
      age
    };
    console.log(params);
  }
  showMsg = (msg) => {
    if (this.timeout) window.clearTimeout(this.timeout);
    this.setState({
      toastMsg: msg,
      toastShow: true
    });
    this.timeout = setTimeout(() => {
      this.setState({
        toastShow: false
      });
    }, 2000);
  }
  render() {
    const {
      cityChange, addrChange, defaultChange, phoneChange, telChange, nameChange, ageChange,
      area, // 地区名称
      city, // 城市名称
      // id, // 收货地址id
      is_default, // 是否设置为默认地址
      // mss_area, // 地区编码
      // mss_city, // 城市编码
      // mss_province, // 省编码
      province, // 省名称
      receive_addr, // 收货详细地址
      receive_name, // 收货人
      receive_phone, // 收货手机号
      receive_tel, // 收货电话
      age, //年龄
    } = this.props;
    const {id} = this.props.match.params;
    return (
      <Page>
        <Header>
          <Titlebar caption={id ? '编辑收货地址' : '增加收货地址'}/>
        </Header>
        <Container>
          <Group>
            <Attribute name="收货人:" required="*" className="attribute-padding align border-b" requiredStyle={{left: '-18px'}} nameStyle={{color: '#333'}} style={{padding: '0 12px 0 30px'}}>
              <InputText placeholder="点击输入" valueBindProp value={receive_name} onChange={nameChange}/>
            </Attribute>
            <Attribute name="联系手机:" required="*" className="attribute-padding align border-b" requiredStyle={{left: '-18px'}} nameStyle={{color: '#333'}} style={{padding: '0 12px 0 30px'}}>
              <InputPhone  placeholder="点击输入"valueBindProp value={receive_phone} onChange={phoneChange}/>
            </Attribute>
            <Attribute name="固定电话:" className="attribute-padding align border-b" requiredStyle={{left: '-18px'}} nameStyle={{color: '#333'}} style={{padding: '0 12px 0 30px'}}>
              <InputPhone placeholder="点击输入" valueBindProp value={receive_tel} onChange={telChange}/>
            </Attribute>
            <Attribute name="选择地区:" required="*" className="attribute-padding align border-b" requiredStyle={{left: '-18px'}} nameStyle={{color: '#333'}} style={{padding: '0 12px 0 30px'}}>
              <InputCity placeholder="点击选择地区" valueBindProp value={`${province}${city ? '-' + city : ''}${area ? '-' + area : ''}`} onChange={cityChange}/>
            </Attribute>
            <Attribute name="详细地址:" required="*" className="attribute-padding align border-b" requiredStyle={{left: '-18px'}} nameStyle={{color: '#333'}} style={{padding: '0 12px 0 30px'}}>
              <InputPre placeholder="点击输入" valueBindProp value={receive_addr} onChange={addrChange}/>
            </Attribute>
            <Attribute name="年龄:" className="attribute-padding align border-b" requiredStyle={{left: '-18px'}} nameStyle={{color: '#333'}} style={{padding: '0 12px 0 30px'}}>
              <NumBox digits={2} placeholder="点击输入" valueBindProp value={age} onChange={ageChange}/>
            </Attribute>
          </Group>
          <Group>
            <List className="oneline" caption="设置为默认收货地址" rcaption={<Switch readOnly={this.state.isFirst} className="reverse" checked={is_default === '0'} onClick={(isChecked) => {defaultChange(isChecked ? '1' : '0')}}/>}/>
          </Group>
          <Button onClick={this.onSubmit} className="block wingmargin-lg spacemargin-lg primary" style={{borderRadius: '4px'}}>保存</Button>
        </Container>
        <Toast caption={this.state.toastMsg} show={this.state.toastShow} position="middle" propagation={false}/>
      </Page>
    );
  }
}
