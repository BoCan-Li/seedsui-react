'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// EditUtil 富文本编辑框
var EditUtil = {
  // 获取选区
  selection: function selection() {
    return document.getSelection();
  },
  // 获取文本框光标位置
  getTxtCusorPos: function getTxtCusorPos(txt) {
    var cusorPos = -1;
    // 非ie
    if (txt.selectionStart) {
      // 非IE浏览器
      cusorPos = txt.selectionStart;
      return cusorPos;
    }
    // 讨厌的ie
    if (document.selection && document.selection.createRange) {
      var range = document.selection.createRange();
      range.moveStart('character', -txt.value.length);
      cusorPos = range.text.length;
      return cusorPos;
    }
  },
  // 获取光标位置
  getDivCusorPos: function getDivCusorPos() {
    var cusorPos = 0; //  光标位置
    // 非ie
    if (window.getSelection) {
      var selection = window.getSelection();
      // console.log(selection.anchorNode) // 选中区域的“起点”
      // console.log(selection.focusNode) // 选中区域的“结束点”
      // console.log(selection.focusOffset) // “结束点”的偏移量
      // console.log(selection.isCollapsed) // 判断是否有选中区域
      // console.log(selection.rangeCount) // 一般一个页面只有一个range，也有可能是多个range(使用Ctrl健进行多选)

      // “起点”的偏移量
      cusorPos = selection.anchorOffset;
      return cusorPos;
    }
    // 讨厌的ie
    if (document.selection && document.selection.createRange) {
      var range = document.selection.createRange();
      var srcele = range.parentElement();
      var copy = document.body.createTextRange();
      copy.moveToElementText(srcele);
      for (cusorPos = 0; copy.compareEndPoints('StartToStart', range) < 0; cusorPos++) {
        copy.moveStart('character', 1);
      }
      return cusorPos;
    }
  },
  // 只支持高级浏览器
  selectionPos: function selectionPos(classname) {
    var selection = window.getSelection();
    var cursorOffset = 0;
    document.onselectionchange = function (e) {
      if (e.target.activeElement.className === classname) {
        cursorOffset = selection.anchorOffset;
      }
    };
    return cursorOffset;
  },
  /* --------------------------
  确定命令是否已经激活
  @method isenable
  @param commandName (命令名称，如：backcolor)
  @return boolean
  -------------------------- */
  isenable: function isenable(commandName) {
    return document.queryCommandEnabled(commandName);
  },
  backgroundcolor: function backgroundcolor(color) {
    document.execCommand('backcolor', false, color);
  },
  bold: function bold() {
    document.execCommand('bold', false, null);
  },
  italic: function italic() {
    document.execCommand('italic', false, null);
  },
  underline: function underline() {
    document.execCommand('underline', false, null);
  },
  copy: function copy() {
    document.execCommand('copy', false, null);
  },
  selectall: function selectall() {
    document.execCommand('selectall', false, null);
  },
  cut: function cut() {
    document.execCommand('cut', false, null);
  },
  paste: function paste() {
    document.execCommand('paste', false, null);
  },
  del: function del() {
    document.execCommand('delete', false, null);
  },
  link: function link(url) {
    document.execCommand('createlink', false, url);
  },
  unlink: function unlink() {
    document.execCommand('unlink', false, null);
  },
  fontname: function fontname(fontName) {
    document.execCommand('fontname', false, fontName);
  },
  fontsize: function fontsize(fontSize) {
    if (fontSize) {
      document.execCommand('fontsize', false, fontSize);
      return;
    }
    return document.queryCommandValue('fontsize');
  },
  fontcolor: function fontcolor(fontColor) {
    document.execCommand('forecolor', false, fontColor);
  },
  format: function format(tag) {
    document.execCommand('formatblock', false, tag);
  },
  unformat: function unformat() {
    document.execCommand('removeformat', false, null);
  },
  indent: function indent() {
    document.execCommand('indent', false, null);
  },
  outdent: function outdent() {
    document.execCommand('outdent', false, null);
  },
  hr: function hr() {
    document.execCommand('inserthorzizontalrule', false, null);
  },
  img: function img(url) {
    document.execCommand('insertimage', false, url);
  },
  ol: function ol() {
    document.execCommand('insertorderedlist', false, null);
  },
  ul: function ul() {
    document.execCommand('insertunorderedlist', false, null);
  },
  p: function p() {
    document.execCommand('insertparagraph', false, null);
  },
  center: function center() {
    document.execCommand('justifycenter', false, null);
  },
  left: function left() {
    document.execCommand('justifyleft', false, null);
  },
  right: function right() {
    document.execCommand('justifyright', false, null);
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
  },
  isEnter: function isEnter() {
    // 监听键盘输入
    window.addEventListener('keydown', function (e) {
      var keynum = e.which || e.keyCode;
      if (keynum === '13') {
        return true;
      }
      return false;
    }, false);
  },
  keyboard: function keyboard(extendCallBack, collapseCallBack) {
    var winHeight = window.innerHeight;
    var currentWinHeight = window.innerHeight;
    var listenerInput; // 监听输入框
    listenerInput = setInterval(function (e) {
      currentWinHeight = window.innerHeight;
      // 获得输入法高度
      if (window.localStorage.getItem('keyboardHeight') && window.localStorage.getItem('keyboardHeight') > 0) {
        console.log('读取数据库keyboardHeight:' + window.localStorage.getItem('inputHeight'));
        this.inputHeight = window.localStorage.getItem('keyboardHeight');
        clearInterval(listenerInput);
      } else {
        this.inputHeight = winHeight - currentWinHeight;
        console.log('注入数据库keyboardHeight:' + inputHeight);
        window.localStorage.setItem('keyboardHeight', inputHeight);
      }
      // 判断输入法是否收缩
      if (winHeight === currentWinHeight) {
        if (collapseCallBack) {
          collapseCallBack.call(this, e);
        }
        clearInterval(listenerInput);
      } else {
        if (extendCallBack) {
          extendCallBack.call(this, e);
        }
      }
    }, 500);
  }
};

exports.default = EditUtil;
module.exports = exports['default'];