import React, { forwardRef, useContext, useRef, useImperativeHandle, useEffect } from 'react';
import {createPortal} from 'react-dom';
import Context from './../Context/instance.js';
import CameraRecorder from './CameraRecorder.js';

const Camera = forwardRef(({
  portal,
  onHide,
  onRecord,
  children,
  ...others
}, ref) =>  {
  // context
  const context = useContext(Context) || {};
  const locale = context.locale || {};

  const refEl = useRef(null);
  const refElStart = useRef(null);
  const refElStop = useRef(null);
  const refElTime = useRef(null);
  const refElTimeTarget = useRef(null);
  useImperativeHandle(ref, () => {
    return refEl.current
  });
  function openCamera () {
    CameraRecorder.init({
      timer: refElTimeTarget.current,
      video: refEl.current,
      onOpened: function (e, stream) {
        if (refElStart.current) refElStart.current.style.display = 'block';
        // e.target.play();
      },
      onStop: function (e, file) {
        onRecord(e, file)
      }
    })
  }
  function start () {
    CameraRecorder.startRecord();
    refElStart.current.style.display = 'none';
    refElStop.current.style.display = 'block';
    refElTime.current.style.display = 'block';
  }
  function stop () {
    refElStop.current.style.display = 'none';
    refElTime.current.style.display = 'none';
    CameraRecorder.stopRecord();
  }

  function closeRecorder (e) {
    refElStop.current.style.display = 'none';
    refElTime.current.style.display = 'none';
    CameraRecorder.stopRecord(null);
    if (onHide) onHide(e);
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

    <div ref={refElTime} className="camera-recorder-timer">
      <span className="camera-recorder-timer-dot"></span>
      <span ref={refElTimeTarget} className="camera-recorder-timer-label">00:03</span>
    </div>
    <div className="camera-close" onClick={closeRecorder}></div>
    {children}
  </div>,
  portal || context.portal || document.getElementById('root') || document.body
  );
})

export default Camera
