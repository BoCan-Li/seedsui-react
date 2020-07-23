import React, { forwardRef, useContext, useRef, useImperativeHandle, useEffect, useState } from 'react';
import {createPortal} from 'react-dom';
import Context from './../Context/instance.js';
import CameraRecorder from './CameraRecorder.js';

const Camera = forwardRef(({
  portal,
  onHide,
  onRecord,
  maxDuration,
  children,
  ...others
}, ref) =>  {
  // context
  const context = useContext(Context) || {};
  const locale = context.locale || {};

  const [successResult, setSuccessResult] = useState({});

  const refEl = useRef(null);
  const refElStart = useRef(null);
  const refElStop = useRef(null);
  const refElTime = useRef(null);
  const refElTimeTarget = useRef(null);
  const refElSuccess = useRef(null);
  const refElError = useRef(null);
  const refElErrorTarget = useRef(null);
  useImperativeHandle(ref, () => {
    return refEl.current
  });
  function openCamera () {
    CameraRecorder.init({
      maxDuration: maxDuration,
      timer: refElTimeTarget.current,
      video: refEl.current,
      onOpened: function (e, stream) {
        if (refElStart.current) refElStart.current.style.display = 'block';
        // e.target.play();
      },
      onStop: function (e) {
        if (refElStop.current) refElStop.current.style.display = 'none';
        if (refElTime.current) refElTime.current.style.display = 'none';
        if (refElSuccess.current) refElSuccess.current.style.display = 'block';
        setSuccessResult(e);
      },
      onError: function (e, err) {
        if (refElError.current) refElError.current.style.display = 'block';
        if (refElErrorTarget.current) refElErrorTarget.current.innerHTML = err.errMsg;
      }
    })
  }
  function start () {
    CameraRecorder.startRecord();
    refElStart.current.style.display = 'none';
    refElStop.current.style.display = 'block';
    refElTime.current.style.display = 'block';
  }
  function stop (e) {
    CameraRecorder.stopRecord();
  }

  function closeCamera (e) {
    CameraRecorder.stopRecord(null); // 关闭不走停止onStop回调
    if (onHide) onHide(e);
  }

  function success () {
    onRecord(successResult)
  }

  useEffect(() => {
    openCamera();
  }, [])

  return createPortal(
  <div ref={ref} {...others} className={`camera${others.className ? ' ' + others.className : ''}`}>
    <video ref={refEl} width="100%" height="100%" autoPlay="" playsInline muted></video>

    <div ref={refElStart} className="camera-recorder-start" onClick={start}>
      <div className="camera-recorder-start-round">
        <div className="camera-recorder-start-dot"></div>
      </div>
    </div>

    <div ref={refElStop} className="camera-recorder-stop" onClick={stop}>
      <div className="camera-recorder-stop-dot"></div>
    </div>

    <div ref={refElSuccess} className="camera-success" onClick={success}>
      <div className="camera-success-icon"></div>
    </div>

    <div ref={refElTime} className="camera-recorder-timer">
      <span className="camera-recorder-timer-dot"></span>
      <span ref={refElTimeTarget} className="camera-recorder-timer-label">00:00</span>
    </div>

    <div ref={refElError} className="camera-recorder-error">
      <span ref={refElErrorTarget} className="camera-recorder-error-label"></span>
    </div>

    <div className="camera-close" onClick={closeCamera}></div>
    {children}
  </div>,
  portal || context.portal || document.getElementById('root') || document.body
  );
})

export default Camera
