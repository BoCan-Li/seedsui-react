import React, {forwardRef, useRef, useImperativeHandle, useEffect, useContext} from 'react';
import Context from './../Context/instance.js';

const VideoFull = forwardRef(({
    scriptSDK = '//g.alicdn.com/de/prismplayer/2.8.8/aliplayer-min.js',
    cssSDK = '//g.alicdn.com/de/prismplayer/2.8.8/skins/default/aliplayer-min.css',
    poster = '',
    src,
    autoPlay = true,
    params,
    onError,
    onLoad
}, ref) =>  {
  // context
  const context = useContext(Context) || {};
  const locale = context.locale || {};

  const refEl = useRef(null)
  useImperativeHandle(ref, () => {
    return refEl.current
  });
  const instance = useRef(null);

  const idSdkCss = '_seedsui_videofull_css_';
  const idSdkScript = '_seedsui_videofull_script_';
  const idSdkPlayer = '_seedsui_videofull_player_';

  function loadSdk () {
    return new Promise((resolve) => {
      var css = document.getElementById(idSdkCss);
      if (!css) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.id = idSdkCss;
        link.href = cssSDK;
        link.setAttribute('rel','stylesheet');
        link.setAttribute('type', 'text/css');
        head.appendChild(link);
      }
      var script = document.getElementById(idSdkScript);
      if (!script) {
        script = document.createElement('script')
        script.id = idSdkScript
        script.type = 'text/javascript'
        script.charset = 'utf-8'
        script.src = scriptSDK
        document.body.appendChild(script)
        script.onload = function () {
          resolve(true)
        }
        script.onerror = function () {
          resolve(false)
        }
      } else {
        resolve(true)
      }
    });
  }

  async function initInstance() {
    if (!src) {
      console.error(locale['hint_video_src'] || '请传入视频源');
      if (onError) onError(e, {errMsg: locale['hint_video_src'] || '请传入视频源'});
      return;
    }
    if (!await loadSdk()) {
      console.error(locale['hint_video_sdk_load_failed'] || '加载播放器库出错, 请稍后再试');
      if (onError) onError(e, {errMsg: locale['hint_video_sdk_load_failed'] || '加载播放器库出错, 请稍后再试'});
      return
    }
    let e = {target: refEl.current}
    const width = refEl.current.clientWidth;
    const height = refEl.current.clientHeight;
    console.log(width);
    console.log(height);
    // 构建参数
    let data = {
      id: idSdkPlayer,
      source: src,
      width: width,
      height: height,
      videoWidth: width,
      videoHeight: height,
      autoplay: autoPlay,

      isLive:true,
      preload: true,
      playsinline: true,
      showBuffer: true,
      defaultDefinition: 'FD',
      source: src,
      // source: 'https://player.alicdn.com/resource/player/big_buck_bunny.mp4',
      useH5Prism: true,
      useFlashPrism: false,
      cover: poster,
      // prismplayer 2.0.1版本支持的属性，主要用户实现在android 微信上的同层播放
      x5_type: 'h5',
      x5_fullscreen: false,
      ...params
    };
    instance.current = new Aliplayer(data, function (player) {
      if (autoPlay) {
        player.play()
      }
    });
    if (onLoad) onLoad(e, instance.current);
  }
  
  useEffect(() => {
    if (instance.current) return;
    initInstance();
  }, []) // eslint-disable-line

  return (
    <div className="videofull-page" ref={refEl}>
      <div x5-video-player-type="h5" className="prism-player" webkit-playsinline="true" playsInline={true} id={idSdkPlayer} style={{width:'100%', height:'100%'}}></div>
    </div>
  );
})

export default VideoFull
