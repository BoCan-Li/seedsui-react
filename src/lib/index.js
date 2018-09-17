import './seedsui.less';

import './PrototypeArray.js';
import './PrototypeMath.js';
import './PrototypeObject.js';
import './PrototypeString.js';
import './PrototypeDate.js';
// import './PrototypePinyin.js'; // 不常用

// components
import Actionsheet from './Actionsheet';
import Alert from './Alert';
import Article from './Article';
// import Aside from './Aside'; // 待定
import Attribute from './Attribute';
import Attributes from './Attributes';
import Badge from './Badge';
import BiDoughnut from './BiDoughnut'; // 不常用
import BiGauge from './BiGauge'; // 不常用
import Button from './Button';
import Calendar from './Calendar'; // 不常用
import Card from './Card';
import Carrousel from './Carrousel';
import Chat from './Chat';
import Checkbox from './Checkbox';
import Clock from './Clock';
import Close from './Close';
import Container from './Container';
import Counter from './Counter'; // 不常用
import Dialog from './Dialog';
import Dot from './Dot';
import Dragrefresh from './Dragrefresh';
import Dropdown from './Dropdown';
import Emoji from './Emoji'; // 不常用
import Footer from './Footer';
import Grid from './Grid';
import Group from './Group';
import Handsign from './Handsign'; // 不常用
import Header from './Header';
import Icon from './Icon';
import ImgLazy from './ImgLazy';
import ImgUploader from './ImgUploader';
import IndexBar from './IndexBar';
import InputArea from './InputArea';
import InputCity from './InputCity';
import InputColor from './InputColor'; // 不常用
import InputDate from './InputDate';
import InputLocation from './InputLocation';
import InputNumber from './InputNumber';
import InputPassword from './InputPassword';
import InputPhone from './InputPhone';
import InputPicker from './InputPicker';
import InputPre from './InputPre';
import InputRange from './InputRange';  // 不常用
import InputSafe from './InputSafe'; // 不常用
import InputSelect from './InputSelect';
import InputText from './InputText';
import InputVerify from './InputVerify';
import Legend from './Legend';
import List from './List';
import Loading from './Loading';
import Mark from './Mark';
import Marquee from './Marquee';
import MenuTiled from './MenuTiled';
import MenuTree from './MenuTree';
import NoNetwork from './NoNetwork';
import Notice from './Notice';
import NumBox from './NumBox';
import NumBoxPop from './NumBoxPop';
import NumBoxPopPointer from './NumBoxPopPointer';
import OnOff from './OnOff';
import Page from './Page';
import Peg from './Peg'; // 不常用
import Picker from './Picker';
import PickerCity from './PickerCity';
import PickerDate from './PickerDate';
import Popover from './Popover';
import Price from './Price';
import Progress from './Progress';
import Radio from './Radio';
import SearchBar from './SearchBar';
import SearchBarPointer from './SearchBarPointer';
import SearchBoard from './SearchBoard';
import SelectPicker from './SelectPicker';
import Star from './Star';
import StarGroup from './StarGroup';
import Stencil from './Stencil'; // 不常用
import Sticker from './Sticker'; // 不常用
import Tabbar from './Tabbar';
import Ticket from './Ticket'; // 不常用
import Timeline from './Timeline'; // 不常用
import Timepart from './Timepart'; // 不常用
import Titlebar from './Titlebar';
import Toast from './Toast';
import Tree from './Tree';

// utils
// import Ajax from './Ajax.js'; // 原生的Ajax,如不需要，不要加载
// import Animate from './Animate.js'; // 用于帧率测试一次动画等,如不需要，不要加载
import ApiAxios from './ApiAxios.js';
// import Superagent from './ApiSuperagent.js'; // 与Axios同类型,推荐使用Axios
// import BackboneRoute from './Route.js'; // 用于路由监听,如不需要，不要加载
import DB from './DB.js';
import Clipboard from './Clipboard.js';
import Device from './Device.js';
// import EditUtil from './EditUtil.js'; // 用于富文本,如不需要，不要加载
import EventUtil from './EventUtil.js';
import FastClick from './FastClick.js';
// import Form from './Form.js'; // 用于表单序列化等操作,如不需要，不要加载
// import FormControls from './FormControls.js'; // 用于表单动画控件如小眼睛、安全校验框等,如不需要，不要加载
// import Fullscreen from './Fullscreen.js'; // 用于判断浏览器是否处于全屏状态,如不需要，不要加载
// import History from './History.js'; // 用于路由监听,如不需要，不要加载
// import MediaUtil from './MediaUtil.js'; // 用于视频音频
// import Pubsub from './Pubsub.js'; // 用于订阅发布模式
// import ValidateID from './ValidateID.js'; // 用于身份证信息查询,很大,如不需要,不要加载
// import Validator from './Validator.js'; // 用于表单校验,如不需要,不要加载

// bridge
import Bridge from './Bridge';
export {
  // components
  Actionsheet,
  Alert,
  Article,
  // Aside, // 待定
  Attribute,
  Attributes,
  Badge,
  BiDoughnut,
  BiGauge,
  Button,
  Calendar,
  Card,
  Carrousel,
  Chat,
  Checkbox,
  Clock,
  Close,
  Container,
  Counter,
  Dialog,
  Dot,
  Dragrefresh,
  Dropdown,
  Emoji,
  Footer,
  Grid,
  Group,
  Handsign,
  Header,
  Icon,
  ImgLazy,
  ImgUploader,
  IndexBar,
  InputArea,
  InputCity,
  InputColor,
  InputDate,
  InputLocation,
  InputNumber,
  InputPassword,
  InputPhone,
  InputPicker,
  InputPre,
  InputRange,
  InputSafe,
  InputSelect,
  InputText,
  InputVerify,
  Legend,
  List,
  Loading,
  Mark,
  Marquee,
  MenuTiled,
  MenuTree,
  NoNetwork,
  Notice,
  NumBox,
  NumBoxPop,
  NumBoxPopPointer,
  OnOff,
  Page,
  Peg,
  Picker,
  PickerCity,
  PickerDate,
  Popover,
  Price,
  Progress,
  Radio,
  SearchBar,
  SearchBarPointer,
  SearchBoard,
  SelectPicker,
  Star,
  StarGroup,
  Stencil,
  Sticker,
  Tabbar,
  Ticket,
  Timeline,
  Timepart,
  Titlebar,
  Toast,
  Tree,

  // utils

  // Ajax,
  // Animate,
  ApiAxios,
  // Superagent,
  // BackboneRoute,
  Clipboard,
  DB,
  Device,
  // EditUtil,
  EventUtil,
  FastClick,
  // Form,
  // FormControls,
  // Fullscreen,
  // History,
  // MediaUtil,
  // Pubsub,
  // IDValidator,
  // Validator,

  // bridge
  Bridge
};
