'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bridge = exports.Validator = exports.ValidateID = exports.Pubsub = exports.MediaUtil = exports.jsonp = exports.ImgLazy = exports.History = undefined;
exports.FullScreen = exports.Form = exports.FastClick = exports.EventUtil = exports.EditUtil = exports.Device = exports.DB = exports.Clipboard = exports.CanvasUtil = exports.BackboneRoute = exports.ApiAxios = exports.Animate = exports.Ajax = exports.Weather = exports.VideoUploader = exports.Tree = exports.Toast = exports.Titlebar = exports.Timepart = exports.Timeline = exports.Ticket = exports.Tabbar = exports.Sticker = exports.Stencil = exports.Star = exports.SelectPicker = exports.SearchBoard = exports.RouteComment = exports.Radio = exports.Progress = exports.Price = exports.Popover = exports.Player = exports.PickerDate = exports.PickerCity = exports.Picker = exports.Peg = exports.PagePull = exports.Page = exports.OnOff = exports.NumBoxPopPointer = exports.NumBoxPop = exports.NumBox = exports.Notice = exports.NoNetwork = exports.MenuTree = exports.MenuTiled = exports.Marquee = exports.Mark = exports.Loading = exports.ListPull = exports.List = exports.Legend = exports.InputWaiqin = exports.InputText = exports.InputStar = exports.InputSelect = exports.InputSafe = exports.InputRange = exports.InputPre = exports.InputPicker = exports.InputPhone = exports.InputPassword = exports.InputNumber = exports.InputLocation = exports.InputDate = exports.InputColor = exports.InputCity = exports.InputArea = exports.IndexBar = exports.ImgUploader = exports.Icon = exports.Header = exports.Handsign = exports.Group = exports.Grid = exports.Footer = exports.Emoji = exports.Dropdown = exports.Dragrefresh = exports.Dot = exports.Dialog = exports.Counter = exports.Container = exports.Close = exports.Checkbox = exports.Chat = exports.Carrousel = exports.Card = exports.Calendar = exports.Button = exports.BiGauge = exports.BiDoughnut = exports.BiClock = exports.Badge = exports.Attributes = exports.Attribute = exports.Article = exports.Alert = exports.Actionsheet = undefined;

require('./PrototypeArray.js');

require('./PrototypeMath.js');

require('./PrototypeObject.js');

require('./PrototypeString.js');

require('./PrototypeDate.js');

require('./PrototypePinyin.js');

var _Actionsheet = require('./Actionsheet');

var _Actionsheet2 = _interopRequireDefault(_Actionsheet);

var _Alert = require('./Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _Article = require('./Article');

var _Article2 = _interopRequireDefault(_Article);

var _Attribute = require('./Attribute');

var _Attribute2 = _interopRequireDefault(_Attribute);

var _Attributes = require('./Attributes');

var _Attributes2 = _interopRequireDefault(_Attributes);

var _Badge = require('./Badge');

var _Badge2 = _interopRequireDefault(_Badge);

var _BiClock = require('./BiClock');

var _BiClock2 = _interopRequireDefault(_BiClock);

var _BiDoughnut = require('./BiDoughnut');

var _BiDoughnut2 = _interopRequireDefault(_BiDoughnut);

var _BiGauge = require('./BiGauge');

var _BiGauge2 = _interopRequireDefault(_BiGauge);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

var _Carrousel = require('./Carrousel');

var _Carrousel2 = _interopRequireDefault(_Carrousel);

var _Chat = require('./Chat');

var _Chat2 = _interopRequireDefault(_Chat);

var _Checkbox = require('./Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Close = require('./Close');

var _Close2 = _interopRequireDefault(_Close);

var _Container = require('./Container');

var _Container2 = _interopRequireDefault(_Container);

var _Counter = require('./Counter');

var _Counter2 = _interopRequireDefault(_Counter);

var _Dialog = require('./Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Dot = require('./Dot');

var _Dot2 = _interopRequireDefault(_Dot);

var _Dragrefresh = require('./Dragrefresh');

var _Dragrefresh2 = _interopRequireDefault(_Dragrefresh);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _Emoji = require('./Emoji');

var _Emoji2 = _interopRequireDefault(_Emoji);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Grid = require('./Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Group = require('./Group');

var _Group2 = _interopRequireDefault(_Group);

var _Handsign = require('./Handsign');

var _Handsign2 = _interopRequireDefault(_Handsign);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _ImgUploader = require('./ImgUploader');

var _ImgUploader2 = _interopRequireDefault(_ImgUploader);

var _IndexBar = require('./IndexBar');

var _IndexBar2 = _interopRequireDefault(_IndexBar);

var _InputArea = require('./InputArea');

var _InputArea2 = _interopRequireDefault(_InputArea);

var _InputCity = require('./InputCity');

var _InputCity2 = _interopRequireDefault(_InputCity);

var _InputColor = require('./InputColor');

var _InputColor2 = _interopRequireDefault(_InputColor);

var _InputDate = require('./InputDate');

var _InputDate2 = _interopRequireDefault(_InputDate);

var _InputLocation = require('./InputLocation');

var _InputLocation2 = _interopRequireDefault(_InputLocation);

var _InputNumber = require('./InputNumber');

var _InputNumber2 = _interopRequireDefault(_InputNumber);

var _InputPassword = require('./InputPassword');

var _InputPassword2 = _interopRequireDefault(_InputPassword);

var _InputPhone = require('./InputPhone');

var _InputPhone2 = _interopRequireDefault(_InputPhone);

var _InputPicker = require('./InputPicker');

var _InputPicker2 = _interopRequireDefault(_InputPicker);

var _InputPre = require('./InputPre');

var _InputPre2 = _interopRequireDefault(_InputPre);

var _InputRange = require('./InputRange');

var _InputRange2 = _interopRequireDefault(_InputRange);

var _InputSafe = require('./InputSafe');

var _InputSafe2 = _interopRequireDefault(_InputSafe);

var _InputSelect = require('./InputSelect');

var _InputSelect2 = _interopRequireDefault(_InputSelect);

var _InputStar = require('./InputStar');

var _InputStar2 = _interopRequireDefault(_InputStar);

var _InputText = require('./InputText');

var _InputText2 = _interopRequireDefault(_InputText);

var _InputWaiqin = require('./InputWaiqin');

var _InputWaiqin2 = _interopRequireDefault(_InputWaiqin);

var _Legend = require('./Legend');

var _Legend2 = _interopRequireDefault(_Legend);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _ListPull = require('./ListPull');

var _ListPull2 = _interopRequireDefault(_ListPull);

var _Loading = require('./Loading');

var _Loading2 = _interopRequireDefault(_Loading);

var _Mark = require('./Mark');

var _Mark2 = _interopRequireDefault(_Mark);

var _Marquee = require('./Marquee');

var _Marquee2 = _interopRequireDefault(_Marquee);

var _MenuTiled = require('./MenuTiled');

var _MenuTiled2 = _interopRequireDefault(_MenuTiled);

var _MenuTree = require('./MenuTree');

var _MenuTree2 = _interopRequireDefault(_MenuTree);

var _NoNetwork = require('./NoNetwork');

var _NoNetwork2 = _interopRequireDefault(_NoNetwork);

var _Notice = require('./Notice');

var _Notice2 = _interopRequireDefault(_Notice);

var _NumBox = require('./NumBox');

var _NumBox2 = _interopRequireDefault(_NumBox);

var _NumBoxPop = require('./NumBoxPop');

var _NumBoxPop2 = _interopRequireDefault(_NumBoxPop);

var _NumBoxPopPointer = require('./NumBoxPopPointer');

var _NumBoxPopPointer2 = _interopRequireDefault(_NumBoxPopPointer);

var _OnOff = require('./OnOff');

var _OnOff2 = _interopRequireDefault(_OnOff);

var _Page = require('./Page');

var _Page2 = _interopRequireDefault(_Page);

var _PagePull = require('./PagePull');

var _PagePull2 = _interopRequireDefault(_PagePull);

var _Peg = require('./Peg');

var _Peg2 = _interopRequireDefault(_Peg);

var _Picker = require('./Picker');

var _Picker2 = _interopRequireDefault(_Picker);

var _PickerCity = require('./PickerCity');

var _PickerCity2 = _interopRequireDefault(_PickerCity);

var _PickerDate = require('./PickerDate');

var _PickerDate2 = _interopRequireDefault(_PickerDate);

var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

var _Popover = require('./Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _Price = require('./Price');

var _Price2 = _interopRequireDefault(_Price);

var _Progress = require('./Progress');

var _Progress2 = _interopRequireDefault(_Progress);

var _Radio = require('./Radio');

var _Radio2 = _interopRequireDefault(_Radio);

var _RouteComment = require('./RouteComment');

var _RouteComment2 = _interopRequireDefault(_RouteComment);

var _SearchBoard = require('./SearchBoard');

var _SearchBoard2 = _interopRequireDefault(_SearchBoard);

var _SelectPicker = require('./SelectPicker');

var _SelectPicker2 = _interopRequireDefault(_SelectPicker);

var _Star = require('./Star');

var _Star2 = _interopRequireDefault(_Star);

var _Stencil = require('./Stencil');

var _Stencil2 = _interopRequireDefault(_Stencil);

var _Sticker = require('./Sticker');

var _Sticker2 = _interopRequireDefault(_Sticker);

var _Tabbar = require('./Tabbar');

var _Tabbar2 = _interopRequireDefault(_Tabbar);

var _Ticket = require('./Ticket');

var _Ticket2 = _interopRequireDefault(_Ticket);

var _Timeline = require('./Timeline');

var _Timeline2 = _interopRequireDefault(_Timeline);

var _Timepart = require('./Timepart');

var _Timepart2 = _interopRequireDefault(_Timepart);

var _Titlebar = require('./Titlebar');

var _Titlebar2 = _interopRequireDefault(_Titlebar);

var _Toast = require('./Toast');

var _Toast2 = _interopRequireDefault(_Toast);

var _Tree = require('./Tree');

var _Tree2 = _interopRequireDefault(_Tree);

var _VideoUploader = require('./VideoUploader');

var _VideoUploader2 = _interopRequireDefault(_VideoUploader);

var _Weather = require('./Weather');

var _Weather2 = _interopRequireDefault(_Weather);

var _Ajax = require('./Ajax.js');

var _Ajax2 = _interopRequireDefault(_Ajax);

var _Animate = require('./Animate.js');

var _Animate2 = _interopRequireDefault(_Animate);

var _ApiAxios = require('./ApiAxios.js');

var _ApiAxios2 = _interopRequireDefault(_ApiAxios);

var _BackboneRoute = require('./BackboneRoute.js');

var _BackboneRoute2 = _interopRequireDefault(_BackboneRoute);

var _DB = require('./DB.js');

var _DB2 = _interopRequireDefault(_DB);

var _CanvasUtil = require('./CanvasUtil.js');

var _CanvasUtil2 = _interopRequireDefault(_CanvasUtil);

var _Clipboard = require('./Clipboard.js');

var _Clipboard2 = _interopRequireDefault(_Clipboard);

var _Device = require('./Device.js');

var _Device2 = _interopRequireDefault(_Device);

var _EditUtil = require('./EditUtil.js');

var _EditUtil2 = _interopRequireDefault(_EditUtil);

var _EventUtil = require('./EventUtil.js');

var _EventUtil2 = _interopRequireDefault(_EventUtil);

var _FastClick = require('./FastClick.js');

var _FastClick2 = _interopRequireDefault(_FastClick);

var _Form = require('./Form.js');

var _Form2 = _interopRequireDefault(_Form);

var _FullScreen = require('./FullScreen.js');

var _FullScreen2 = _interopRequireDefault(_FullScreen);

var _History = require('./History.js');

var _History2 = _interopRequireDefault(_History);

var _ImgLazy = require('./ImgLazy');

var _ImgLazy2 = _interopRequireDefault(_ImgLazy);

var _jsonp = require('./jsonp');

var _jsonp2 = _interopRequireDefault(_jsonp);

var _MediaUtil = require('./MediaUtil.js');

var _MediaUtil2 = _interopRequireDefault(_MediaUtil);

var _Pubsub = require('./Pubsub.js');

var _Pubsub2 = _interopRequireDefault(_Pubsub);

var _ValidateID = require('./ValidateID.js');

var _ValidateID2 = _interopRequireDefault(_ValidateID);

var _Validator = require('./Validator.js');

var _Validator2 = _interopRequireDefault(_Validator);

var _Bridge = require('./Bridge');

var _Bridge2 = _interopRequireDefault(_Bridge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 不常用
// 不常用
// 不常用
// 不常用

// import ApiSuperagent from './ApiSuperagent.js'; // 与Axios同类型,推荐使用Axios
// 不常用
// 不常用
// 不常用
// 不常用
// 不常用
// 不常用
// 不常用
// 不常用
// 不常用
// 不常用
// 不常用
// 不常用

// components
exports.Actionsheet = _Actionsheet2.default;
exports.Alert = _Alert2.default;
exports.Article = _Article2.default;
exports.Attribute = _Attribute2.default;
exports.Attributes = _Attributes2.default;
exports.Badge = _Badge2.default;
exports.BiClock = _BiClock2.default;
exports.BiDoughnut = _BiDoughnut2.default;
exports.BiGauge = _BiGauge2.default;
exports.Button = _Button2.default;
exports.Calendar = _Calendar2.default;
exports.Card = _Card2.default;
exports.Carrousel = _Carrousel2.default;
exports.Chat = _Chat2.default;
exports.Checkbox = _Checkbox2.default;
exports.Close = _Close2.default;
exports.Container = _Container2.default;
exports.Counter = _Counter2.default;
exports.Dialog = _Dialog2.default;
exports.Dot = _Dot2.default;
exports.Dragrefresh = _Dragrefresh2.default;
exports.Dropdown = _Dropdown2.default;
exports.Emoji = _Emoji2.default;
exports.Footer = _Footer2.default;
exports.Grid = _Grid2.default;
exports.Group = _Group2.default;
exports.Handsign = _Handsign2.default;
exports.Header = _Header2.default;
exports.Icon = _Icon2.default;
exports.ImgUploader = _ImgUploader2.default;
exports.IndexBar = _IndexBar2.default;
exports.InputArea = _InputArea2.default;
exports.InputCity = _InputCity2.default;
exports.InputColor = _InputColor2.default;
exports.InputDate = _InputDate2.default;
exports.InputLocation = _InputLocation2.default;
exports.InputNumber = _InputNumber2.default;
exports.InputPassword = _InputPassword2.default;
exports.InputPhone = _InputPhone2.default;
exports.InputPicker = _InputPicker2.default;
exports.InputPre = _InputPre2.default;
exports.InputRange = _InputRange2.default;
exports.InputSafe = _InputSafe2.default;
exports.InputSelect = _InputSelect2.default;
exports.InputStar = _InputStar2.default;
exports.InputText = _InputText2.default;
exports.InputWaiqin = _InputWaiqin2.default;
exports.Legend = _Legend2.default;
exports.List = _List2.default;
exports.ListPull = _ListPull2.default;
exports.Loading = _Loading2.default;
exports.Mark = _Mark2.default;
exports.Marquee = _Marquee2.default;
exports.MenuTiled = _MenuTiled2.default;
exports.MenuTree = _MenuTree2.default;
exports.NoNetwork = _NoNetwork2.default;
exports.Notice = _Notice2.default;
exports.NumBox = _NumBox2.default;
exports.NumBoxPop = _NumBoxPop2.default;
exports.NumBoxPopPointer = _NumBoxPopPointer2.default;
exports.OnOff = _OnOff2.default;
exports.Page = _Page2.default;
exports.PagePull = _PagePull2.default;
exports.Peg = _Peg2.default;
exports.Picker = _Picker2.default;
exports.PickerCity = _PickerCity2.default;
exports.PickerDate = _PickerDate2.default;
exports.Player = _Player2.default;
exports.Popover = _Popover2.default;
exports.Price = _Price2.default;
exports.Progress = _Progress2.default;
exports.Radio = _Radio2.default;
exports.RouteComment = _RouteComment2.default;
exports.SearchBoard = _SearchBoard2.default;
exports.SelectPicker = _SelectPicker2.default;
exports.Star = _Star2.default;
exports.Stencil = _Stencil2.default;
exports.Sticker = _Sticker2.default;
exports.Tabbar = _Tabbar2.default;
exports.Ticket = _Ticket2.default;
exports.Timeline = _Timeline2.default;
exports.Timepart = _Timepart2.default;
exports.Titlebar = _Titlebar2.default;
exports.Toast = _Toast2.default;
exports.Tree = _Tree2.default;
exports.VideoUploader = _VideoUploader2.default;
exports.Weather = _Weather2.default;
exports.Ajax = _Ajax2.default;
exports.Animate = _Animate2.default;
exports.ApiAxios = _ApiAxios2.default;
exports.BackboneRoute = _BackboneRoute2.default;
exports.CanvasUtil = _CanvasUtil2.default;
exports.Clipboard = _Clipboard2.default;
exports.DB = _DB2.default;
exports.Device = _Device2.default;
exports.EditUtil = _EditUtil2.default;
exports.EventUtil = _EventUtil2.default;
exports.FastClick = _FastClick2.default;
exports.Form = _Form2.default;
exports.FullScreen = _FullScreen2.default;
exports.History = _History2.default;
exports.ImgLazy = _ImgLazy2.default;
exports.jsonp = _jsonp2.default;
exports.MediaUtil = _MediaUtil2.default;
exports.Pubsub = _Pubsub2.default;
exports.ValidateID = _ValidateID2.default;
exports.Validator = _Validator2.default;
exports.Bridge = _Bridge2.default; // 不常用

// bridge
// 不常用
// 不常用
// 不常用
// 不常用
// 不常用
// 不常用
// 不常用
// 不常用
// 不常用

// utils
// 不常用
// 不常用
// 不常用
// 不常用
// 不常用
// 不常用,外勤专用
// import Jcrop from './Jcrop'; // 不常用,裁切功能,需要引入jcrop插件
// 不常用
// 不常用
// 不常用
// 不常用
// 不常用
// 不常用