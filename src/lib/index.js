import './seedsui.less';

import './utils/array.js';
import './utils/math.js';
import './utils/object.js';
import './utils/string.js';
import './utils/dateutil.js';

// components
import Actionsheet from './components/Actionsheet';
import Alert from './components/Alert';
import Article from './components/Article';
// import Aside from './components/Aside'; // 待定
import Attribute from './components/Attribute';
import Attributes from './components/Attributes';
import Badge from './components/Badge';
import BiDoughnut from './components/BiDoughnut'; // 不常用
import BiGauge from './components/BiGauge/BiGauge.jsx'; // 不常用
import Button from './components/Button';
import Calendar from './components/Calendar'; // 不常用
import Card from './components/Card';
import Carrousel from './components/Carrousel';
import Chat from './components/Chat';
import Checkbox from './components/Checkbox';
import Clock from './components/Clock';
import Close from './components/Close';
import Container from './components/Container';
import Counter from './components/Counter'; // 不常用
import Dialog from './components/Dialog';
import Dot from './components/Dot';
import Dragrefresh from './components/Dragrefresh';
import Dropdown from './components/Dropdown';
import Emoji from './components/Emoji'; // 不常用
import Footer from './components/Footer';
import Grid from './components/Grid';
import Group from './components/Group';
import Handsign from './components/Handsign'; // 不常用
import Header from './components/Header';
import Icon from './components/Icon';
import ImgLazy from './components/ImgLazy';
import ImgUploader from './components/ImgUploader';
import InputArea from './components/InputArea';
import InputCity from './components/InputCity';
import InputColor from './components/InputColor'; // 不常用
import InputDate from './components/InputDate';
import InputLocation from './components/InputLocation';
import InputNumber from './components/InputNumber';
import InputPassword from './components/InputPassword';
import InputPhone from './components/InputPhone';
import InputPicker from './components/InputPicker';
import InputPre from './components/InputPre';
import InputSafe from './components/InputSafe'; // 不常用
import InputSelect from './components/InputSelect';
import InputText from './components/InputText';
import InputVerify from './components/InputVerify';
import Legend from './components/Legend';
import List from './components/List';
import Loading from './components/Loading';
import Mark from './components/Mark';
import Marquee from './components/Marquee';
import Mask from './components/Mask';
import MenuTiled from './components/MenuTiled';
import MenuTree from './components/MenuTree';
import NoNetwork from './components/NoNetwork';
import Notice from './components/Notice';
import NumBox from './components/NumBox';
import NumBoxPop from './components/NumBoxPop';
import NumBoxPopPointer from './components/NumBoxPopPointer';
import OnOff from './components/OnOff';
import Page from './components/Page';
import Peg from './components/Peg'; // 不常用
import Picker from './components/Picker';
import PickerCity from './components/PickerCity';
import PickerDate from './components/PickerDate';
import Popover from './components/Popover';
import Price from './components/Price';
import Progress from './components/Progress';
import Radio from './components/Radio';
import SearchBar from './components/SearchBar';
import SearchBarPointer from './components/SearchBarPointer';
import SearchBoard from './components/SearchBoard';
import SelectPicker from './components/SelectPicker';
import Star from './components/Star';
import StarGroup from './components/StarGroup';
import Stencil from './components/Stencil'; // 不常用
import Sticker from './components/Sticker'; // 不常用
import Tabbar from './components/Tabbar';
import Ticket from './components/Ticket'; // 不常用
import Timeline from './components/Timeline'; // 不常用
import Timepart from './components/Timepart'; // 不常用
import Titlebar from './components/Titlebar';
import Toast from './components/Toast';
import Tree from './components/Tree';

// utils
// import Ajax from './utils/ajax.js'; // 原生的Ajax,如不需要，不要加载
// import Animate from './utils/Animate'; // 用于帧率测试一次动画等,如不需要，不要加载
import Axios from './utils/api-axios.js';
// import Superagent from './utils/api-superagent.js'; // 与Axios同类型,推荐使用Axios
// import BackboneRoute from './utils/backbone-route.js'; // 用于路由监听,如不需要，不要加载
import Clipboard from './utils/clipboard.js';
import DB from './utils/db.js';
import Device from './utils/device.js';
// import Edit from './utils/edit.js'; // 用于富文本,如不需要，不要加载
import EventUtil from './utils/eventutil.js';
import FastClick from './utils/fastclick.js';
// import Form from './utils/form.js'; // 用于表单序列化等操作,如不需要，不要加载
// import Formcontrols from './utils/formcontrols.js'; // 用于表单动画控件如小眼睛、安全校验框等,如不需要，不要加载
// import Fullscreen from './utils/fullscreen.js'; // 用于判断浏览器是否处于全屏状态,如不需要，不要加载
// import History from './utils/history.js'; // 用于路由监听,如不需要，不要加载
import Math from './utils/math.js';
// import Media from './utils/media.js'; // 用于视频音频
// import Pinyin from './utils/pinyin.js'; // 用于汉字转拼音,很大,如不需要,不要加载
// import Pubsub from './utils/pubsub.js'; // 用于订阅发布模式
// import IDValidator from './utils/validator.id.js'; // 用于身份证信息查询,很大,如不需要,不要加载
// import Validator from './utils/validator.js'; // 用于表单校验,如不需要,不要加载

// bridge
import Bridge from './bridge/index.js';
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
  InputSafe,
  InputSelect,
  InputText,
  InputVerify,
  Legend,
  List,
  Loading,
  Mark,
  Marquee,
  Mask,
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
  Axios,
  // Superagent,
  // BackboneRoute,
  Clipboard,
  DB,
  Device,
  // Edit,
  EventUtil,
  FastClick,
  // Form,
  // Formcontrols,
  // Fullscreen,
  // History,
  Math,
  // Media,
  // Pinyin,
  // Pubsub,
  // IDValidator,
  // Validator,

  // bridge
  Bridge
};
