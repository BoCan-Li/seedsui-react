var BridgeBrowser = {
  /* -------------------
  打开关闭窗口
  ------------------- */
  openWindow: function (url) {
    location.href = url
  },
  closeWindow: function () {
    history.go(-1)
  },
  onBack: function (callback) {
    // 如果按下物理返回按键，则返回
  }
}

export default BridgeBrowser
