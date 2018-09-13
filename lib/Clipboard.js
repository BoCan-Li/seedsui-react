'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Clipboard 剪贴板
var Clipboard = {
  // 选择元素的内容
  selectContent: function selectContent(element) {
    // 首先创建一个范围
    var rangeToSelect = document.createRange();
    rangeToSelect.selectNodeContents(element);

    // 选择内容
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(rangeToSelect);
  },
  // 为execCommand方法创建一个临时元素
  createElementForExecCommand: function createElementForExecCommand(textToClipboard) {
    var forExecElement = document.createElement('div');
    // 放置在可见区域之外
    forExecElement.style.position = 'absolute';
    forExecElement.style.left = '-10000px';
    forExecElement.style.top = '-10000px';
    // 将必要的文本写入元素并追加到文档中
    forExecElement.textContent = textToClipboard;
    document.body.appendChild(forExecElement);
    // contentEditable模式对于Firefox中的execCommand方法是必需的
    forExecElement.contentEditable = true;

    return forExecElement;
  },
  // 复制到剪贴板
  copy: function copy(input) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var textToClipboard = input;

    var success = true;
    if (window.clipboardData) {
      // Internet Explorer
      window.clipboardData.setData('Text', textToClipboard);
    } else {
      // 为execCommand方法创建一个临时元素
      var forExecElement = this.createElementForExecCommand(textToClipboard);

      // 选择元素的内容 ('copy'方法的execCommand在选择上起作用)
      this.selectContent(forExecElement);

      // UniversalXPConnect是Firefox中剪贴板访问所必需的
      try {
        if (window.netscape && window.netscape.security) {
          window.netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
        }
        // 将选定内容复制到剪贴板
        // 适用于Firefox和Safari 5之前的版本
        success = document.execCommand('copy', false, null);
      } catch (e) {
        success = false;
      }

      // 删除临时元素
      document.body.removeChild(forExecElement);
    }

    if (success) {
      if (params && params.onSuccess) params.onSuccess(params.successMsg || '复制到剪贴板成功');
    } else {
      if (params && params.onError) params.onError(params.errorMsg || '当前设备不允许访问剪贴板');
    }
  }
};

exports.default = Clipboard;
module.exports = exports['default'];