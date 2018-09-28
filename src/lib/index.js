import './seedsui.less';

import './PrototypeArray.js';
import './PrototypeMath.js';
import './PrototypeObject.js';
import './PrototypeString.js';
import './PrototypeDate.js';
import './PrototypePinyin.js'; // 不常用

// components
import Actionsheet from './Actionsheet';
import Alert from './Alert';
import Article from './Article';
import Attribute from './Attribute';
import Attributes from './Attributes';
import Badge from './Badge';
import BiClock from './BiClock'; // 不常用
import BiDoughnut from './BiDoughnut'; // 不常用
import BiGauge from './BiGauge'; // 不常用
import Button from './Button';
import Calendar from './Calendar'; // 不常用
import Card from './Card';
import Carrousel from './Carrousel';
import Chat from './Chat';
import Checkbox from './Checkbox';
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
import InputStar from './InputStar';
import InputText from './InputText';
import InputVerify from './InputVerify';
import Verify from './Verify';
import Legend from './Legend';
import List from './List';
import ListPull from './ListPull'; // 不常用
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
import PagePull from './PagePull'; // 不常用
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
import Stencil from './Stencil'; // 不常用
import Sticker from './Sticker'; // 不常用
import Tabbar from './Tabbar';
import Ticket from './Ticket'; // 不常用
import Timeline from './Timeline'; // 不常用
import Timepart from './Timepart'; // 不常用
import Titlebar from './Titlebar';
import Toast from './Toast';
import Tree from './Tree'; // 不常用
import Weather from './Weather'; // 不常用

// utils
import Ajax from './Ajax.js'; // 不常用
import Animate from './Animate.js'; // 不常用
import ApiAxios from './ApiAxios.js';
// import Superagent from './ApiSuperagent.js'; // 与Axios同类型,推荐使用Axios
import BackboneRoute from './Route.js'; // 不常用
import DB from './DB.js';
import Clipboard from './Clipboard.js';
import Device from './Device.js';
import EditUtil from './EditUtil.js'; // 不常用
import EventUtil from './EventUtil.js'; // 不常用
import FastClick from './FastClick.js';
import Form from './Form.js'; // 不常用
import Fullscreen from './Fullscreen.js'; // 不常用
import History from './History.js'; // 不常用
import ImgLazy from './ImgLazy';
import MediaUtil from './MediaUtil.js'; // 不常用
import Pubsub from './Pubsub.js'; // 不常用
import ValidateID from './ValidateID.js'; // 不常用
import Validator from './Validator.js'; // 不常用

// bridge
import Bridge from './Bridge';
export {
  // components
  Actionsheet, // 不常用
  Alert,
  Article, // 不常用
  Attribute,
  Attributes,
  Badge,
  BiClock, // 不常用
  BiDoughnut, // 不常用
  BiGauge, // 不常用
  Button,
  Calendar, // 不常用
  Card,
  Carrousel,
  Chat,
  Checkbox,
  Close,
  Container,
  Counter, // 不常用
  Dialog,
  Dot,
  Dragrefresh,
  Dropdown,
  Emoji, // 不常用
  Footer,
  Grid,
  Group,
  Handsign, // 不常用
  Header,
  Icon,
  ImgUploader,
  IndexBar, // 不常用
  InputArea,
  InputCity,
  InputColor, // 不常用
  InputDate,
  InputLocation,
  InputNumber,
  InputPassword,
  InputPhone,
  InputPicker,
  InputPre,
  InputRange, // 不常用
  InputSafe, // 不常用
  InputSelect,
  InputStar,
  InputText,
  InputVerify,
  Verify,
  Legend, // 不常用
  List,
  ListPull,
  Loading,
  Mark,
  Marquee,
  MenuTiled, // 不常用
  MenuTree, // 不常用
  NoNetwork,
  Notice,
  NumBox,
  NumBoxPop,
  NumBoxPopPointer,
  OnOff,
  Page,
  PagePull, // 不常用
  Peg,
  Picker,
  PickerCity,
  PickerDate,
  Popover, // 不常用
  Price,
  Progress,
  Radio,
  SearchBar,
  SearchBarPointer,
  SearchBoard,
  SelectPicker,
  Star,
  Stencil, // 不常用
  Sticker, // 不常用
  Tabbar,
  Ticket,
  Timeline, // 不常用
  Timepart, // 不常用
  Titlebar,
  Toast,
  Tree,
  Weather, // 不常用

  // utils
  Ajax, // 不常用
  Animate, // 不常用
  ApiAxios,
  // Superagent,
  BackboneRoute, // 不常用
  Clipboard,
  DB,
  Device,
  EditUtil, // 不常用
  EventUtil, // 不常用
  FastClick,
  Form, // 不常用
  Fullscreen, // 不常用
  History, // 不常用
  ImgLazy,
  MediaUtil, // 不常用
  Pubsub, // 不常用
  ValidateID, // 不常用
  Validator, // 不常用

  // bridge
  Bridge
};
