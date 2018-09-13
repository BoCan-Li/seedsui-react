'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
// Emoji 表情管理
var Emoji = {
	// 图标对应表
	icons: {
		'[微笑]': '[weixiao]',
		'[难过]': '[nanguo]',
		'[色]': '[se]',
		'[发呆]': '[fadai]',
		'[酷]': '[cool]',
		'[大哭]': '[daku]',
		'[害羞]': '[haixiu]',

		'[闭嘴]': '[bizui]',
		'[睡觉]': '[shuijiao]',
		'[哭]': '[ku]',
		'[流汗]': '[liuhan]',
		'[发怒]': '[fanu]',
		'[眨眼]': '[zhayan]',
		'[龇牙]': '[ziya]',

		'[惊讶]': '[jingya]',
		'[傲慢]': '[aoman]',
		'[得意]': '[deyi]',
		'[可怜]': '[kelian]',
		'[拜拜]': '[baibai]',
		'[开心]': '[kaixin]',
		'[呕吐]': '[outu]',
		'[奋斗]': '[fendou]',
		'[坏笑]': '[huaixiao]',
		'[尴尬]': '[ganga]',
		'[惊吓]': '[jingxia]',
		'[打哈欠]': '[dahaqian]',
		'[白眼]': '[baiyan]',
		'[鄙视]': '[bishi]',

		'[抽烟]': '[chouyan]',
		'[敲头]': '[qiaotou]',
		'[亲亲]': '[qingqing]',
		'[恭喜]': '[gongxi]',
		'[奸笑]': '[jianxiao]',
		'[骂人]': '[maren]',
		'[糗]': '[qiu]',

		'[伤心]': '[shangxin]',
		'[受委屈]': '[shouweiqu]',
		'[偷笑]': '[touxiao]',
		'[挖鼻孔]': '[wabikong]',
		'[委屈]': '[weiqu]',
		'[问]': '[wen]',
		'[擦汗]': '[cahan]',
		'[左哼哼]': '[zuohengheng]',
		'[右哼哼]': '[youhengheng]',
		'[晕]': '[yun]',
		'[大笑]': '[daxiao]',
		'[吓]': '[xia]',
		'[困]': '[kun]',
		'[嘘]': '[xu]',

		'[加油]': '[jiayou]',
		'[强]': '[qiang]',
		'[我爱你]': '[iloveyou]',
		'[差劲]': '[chajin]',
		'[No]': '[no]',
		'[Ok]': '[ok]',
		'[弱]': '[ruo]',

		'[抱拳]': '[baoquan]',
		'[握手]': '[woshou]',
		'[Yeah]': '[yeah]',
		'[来]': '[lai]',
		'[猪头]': '[zhutou]',
		'[心]': '[xin]',
		'[心碎]': '[xinsui]',
		'[抱抱]': '[baobao]',
		'[红唇]': '[hongchun]',
		'[菜刀]': '[caidao]',
		'[太阳]': '[taiyang]',
		'[夜晚]': '[yewan]',
		'[花谢了]': '[huaxiele]',

		'[蛋糕]': '[dangao]',
		'[咖啡]': '[kafei]',
		'[足球]': '[zuqiu]',
		'[骷髅]': '[kulou]',
		'[西瓜]': '[xigua]',
		'[炸弹]': '[zhadan]',
		'[篮球]': '[lanqiu]',

		'[礼物]': '[liwu]',
		'[大便]': '[dabian]',
		'[玫瑰]': '[meigui]',
		'[米饭]': '[mifan]',
		'[瓢虫]': '[piaochong]',
		'[啤酒]': '[pijiu]',
		'[闪电]': '[shandian]'
	},
	// 将文件转成图片
	parse: function parse(str) {
		var emojiExpr = /(\[[\u4E00-\u9FA5]*\])/gm;
		var parseStr = str;
		while (emojiExpr.exec(str)) {
			if (this.icons[RegExp.$1]) {
				parseStr = parseStr.replace(RegExp.$1, '<span data-emoji=' + this.icons[RegExp.$1] + '></span>');
			}
		}
		return parseStr;
	},
	// 监听位置
	cursorOffset: 0,
	$input: null,
	init: function init(elInput) {
		var _this = this;

		this.$input = elInput;
		document.onselectionchange = function (e) {
			if (Object.prototype.toString.call(e.target.activeElement) === '[object HTMLTextAreaElement]') {
				// 获得光标位置
				_this.cursorOffset = _this.$input.selectionStart;
			}
		};
		this.$input.addEventListener('input', function (e) {
			// 获得光标位置
			_this.cursorOffset = e.target.selectionStart;
		}, false);
	},
	// 插入表情文字
	insertFace: function insertFace(emojiName) {
		// 设置value
		var value = this.$input.value;
		var valueBefore = value.substr(0, this.cursorOffset);
		var valueAfter = value.substr(this.cursorOffset, value.length);
		var valueInsert = emojiName;
		this.cursorOffset = this.cursorOffset + emojiName.length;
		this.$input.value = valueBefore + valueInsert + valueAfter;
		// 设置光杆位置
		this.$input.focus();
		this.setCaretPosition(this.$input, this.cursorOffset);
		return this.$input.value;
	},
	// 设置光标位置
	setCaretPosition: function setCaretPosition(elem, caretPos) {
		if (elem !== null) {
			if (elem.createTextRange) {
				var range = elem.createTextRange();
				range.move('character', caretPos);
				range.select();
			} else {
				if (elem.selectionStart) {
					elem.focus();
					elem.setSelectionRange(caretPos, caretPos);
				} else {
					elem.focus();
				}
			}
		}
	}
};
exports.default = Emoji;
module.exports = exports['default'];