import client from 'helpers/api.js'
var BridgeWeiXin = {
  /* -------------------
  初始化配置
  ------------------- */
  config: function (onSuccess) {
    var url = '/xx/getSignature.action'
    var params = {
      url: window.location.href.split('#')[0]
    }
    client.post(url, params).then(response => {
      let result = response
      if (result.code === '1') {
        var conf = {
          appId: result.corpId,
          timestamp: result.timestamp,
          nonceStr: result.nonceStr,
          signature: result.signature,
          jsApiList: ['chooseImage', 'uploadImage', 'getLocation']
        }
        conf.debug = false
        /* eslint-disable */
        wx.config(conf)
        /* eslint-enable */
        if (onSuccess) onSuccess()
      } else {
        console.log('微信配置错误，请检查是否取得证书')
      }
    })
    .catch(err => {
      console.log('微信配置错误，请检查是否取得证书' + err)
    })
  },
  /* -------------------
  定位
  ------------------- */
  getLocation: function (callback) {
    /* eslint-disable */
    wx.getLocation({
      // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      type: 'wgs84',
      success: function (res) {
        if(callback)callback(res)
      },
      fail: function (res) {
        if(callback)callback(res)
      }
    })
    /* eslint-enable */
  },
  /* -------------------
  图片上传
  ------------------- */
  Image: function (params) {
    var defaults = {
      max: 5,
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed']
      /*
      Callbacks:
      onChooseSuccess:function(imgs,imgMap,res) // 选择成功
      onChooseFail:function(imgs,imgMap,res) // 选择失败
      onChooseCancel:function() // 取消选择
      onUploadSuccess:function(imgs,imgMap,res) // 单张上传成功
      onUploadFail:function(imgs,imgMap,res) // 单张上传失败
      onUploadsSuccess:function(imgs,imgMap) // 全部上传成功
      onDeleteSuccess:function(imgs,imgMap,key) // 全部删除成功
      */
    }
    params = params || {}
    for (var def in defaults) {
      if (!params[def]) {
        params[def] = defaults[def]
      }
    }
    var s = this
    s.params = params
    // 防双击
    s.isClicked = false
    s.imgs = []
    s.imgMap = {} // 格式{'localIdxxx':{serverId:'xxx',sourceType:'camera'}}
    s.choose = function () {
      if (s.isClicked) {
        /* eslint-disable */
        alert('微信正在检测环境，请稍等...')
        /* eslint-enable */
        return
      }
      s.isClicked = true
      let leftPic = s.params.max - s.imgs.length
      var count = leftPic > s.params.max ? s.params.max : leftPic
      if (count < 0) count = 0
      /* eslint-disable */
      wx.chooseImage({
        count: count, // 默认5
        sizeType: s.params.sizeType, // 可以指定是原图还是压缩图，默认二者都有
        sourceType: s.params.sourceType, // 可以指定来源是相册还是相机，默认二者都有camera|album
        success: function (res) {
          for(var i=0,localId;localId=res.localIds[i++];){
            if(s.imgMap[localId]){
              alert('照片已存在，请勿重复上传！')
              continue
            }
            s.imgMap[localId]={
              serverId:'',
              sourceType:res.sourceType
            }
          }
          s.imgs = Object.keys(s.imgMap)
          s.isClicked = false
          if(s.params.onChooseSuccess)s.params.onChooseSuccess(s.imgs, s.imgMap, res)
          s.upload()
        },
        fail: function (res) {
          s.isClicked = false
          if(s.params.onChooseFail)s.params.onChooseFail(s.imgs, s.imgMap, res)
        },
        cancel: function () {
          s.isClicked = false
          if(s.params.onChooseCancel)s.params.onChooseCancel()
        },
        complete: function () {
          s.isClicked = false
        }
      })
      /* eslint-enable */
    }
    s.deleteImg = function (key) {
      delete s.imgMap[key]
      s.imgs = Object.keys(s.imgMap)
      if (s.params.onDeleteSuccess) s.params.onDeleteSuccess(s.imgs, s.imgMap, key)
    }
    s.deleteAfterImg = function (index) {
      for (var i = index, img; s.imgs[i++];) {
        delete s.imgMap[img]
      }
      s.imgs = Object.keys(s.imgMap)
      if (s.params.onDeleteSuccess) s.params.onDeleteSuccess(s.imgs, s.imgMap)
    }
    s.destory = function () {
      s.imgMap = {}
      s.imgs = []
      if (s.params.onDeleteSuccess) s.params.onDeleteSuccess(s.imgs, s.imgMap)
    }
    s.upload = function () {
      let imgs = s.imgs
      let loop = function (index) {
        /* eslint-disable */
        if (index >= imgs.length) {
          return
        }
        let img = imgs[index]
        if (s.imgMap[img].serverId) {
          loop(++index)
          return
        }
        wx.uploadImage({
          localId: img, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            let serverId = res.serverId; // 返回图片的服务器端ID
            s.imgMap[img].serverId = serverId
            if (s.params.onUploadSuccess) s.params.onUploadSuccess(s.imgs, s.imgMap, res)
            if (index >= imgs.length-1 && s.params.onUploadsSuccess) s.params.onUploadsSuccess(s.imgs, s.imgMap)
            loop(++index)
          },
          fail: function (res) {
            alert('您选择的第'+index+'张图片上传失败，稍后请重试')
            s.deleteImg(img)
            if (s.params.onUploadFail) s.params.onUploadFail(s.imgs, s.imgMap, res)
            loop(++index)
          }
        })
        /* eslint-enable */
      }
      loop(0)
    }
  },
  /* -------------------
  二维码扫描
  ------------------- */
  scanQRCode (callback) {
    /* eslint-disable */
    wx.scanQRCode({
      needResult: 1,
      desc: 'scanQRCode desc',
      success: function (res) {
        callback && callback(res)
      }
    })
    /* eslint-enable */
  },
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

export default BridgeWeiXin
