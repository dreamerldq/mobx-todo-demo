import { observer, inject } from "mobx-react";
import React from "react";
import TodoView from "../TodoView/index";
@inject("todoStore")
@observer
class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // var constraints = { audio: true, video: { width: 1280, height: 720 } };

    // navigator.mediaDevices
    //   .getUserMedia(constraints)
    //   .then(function(mediaStream) {
    //     var video = document.querySelector("video");
    //     video.srcObject = mediaStream;
    //     video.onloadedmetadata = function(e) {
    //       video.play();
    //     };
    //   })
    //   .catch(function(err) {
    //     console.log(err.name + ": " + err.message);
    //   }); // 总是在最后检查错误
    const { todoStore } = this.props;
    return (
      <React.Fragment>
        <span>待办事项总数是: {todoStore.todolistLength}</span>
        <div>
          {todoStore.todos.map((todo, index) => {
            return <TodoView key={index} todo={todo} />;
          })}
        </div>
        <button onClick={todoStore.addTodo.bind(todoStore, "新的任务")}>
          添加
        </button>
      </React.Fragment>
    );
  }
}
var recorder, mediaStream;

// 用于存放录制后的音频文件对象和录制结束回调
var recorderFile, stopRecordCallback;

// 用于存放是否开启了视频录制
var videoEnabled = false;

const  getUserMedia = function (videoEnable, audioEnable, callback) {
  console.log(111, videoEnable, audioEnable, callback)
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
      || navigator.msGetUserMedia || window.getUserMedia;
  var constraints = {video: videoEnable, audio: audioEnable};
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
          callback(false, stream);
      })['catch'](function(err) {
          callback(err);
      });
  } else if (navigator.getUserMedia) {
      navigator.getUserMedia(constraints, function (stream) {
          callback(false, stream);
      }, function (err) {
          callback(err);
      });
  } else {
      callback(new Error('Not support userMedia'));
  }
}
const closeStream =  function (stream) {
  if (typeof stream.stop === 'function') {
      stream.stop();
  }
  else {
      let trackList = [stream.getAudioTracks(), stream.getVideoTracks()];

      for (let i = 0; i < trackList.length; i++) {
          let tracks = trackList[i];
          if (tracks && tracks.length > 0) {
              for (let j = 0; j < tracks.length; j++) {
                  let track = tracks[j];
                  if (typeof track.stop === 'function') {
                      track.stop();
                  }
              }
          }
      }
  }
}
function startRecord(enableVideo) { // 开始录制函数
  videoEnabled = enableVideo;
  getUserMedia(enableVideo, videoEnabled, function (err, stream) {
      if (err) {
          throw err;
      } else {
        console.log("获取到视频流", stream)
          // 通过 MediaRecorder 记录获取到的媒体流
          recorder = new MediaRecorder(stream);
          mediaStream = stream;
          var chunks = [], startTime = 0;
          recorder.ondataavailable = function(e) {
              chunks.push(e.data);
          };
          recorder.onstop = function (e) {
              recorderFile = new Blob(chunks, { 'type' : recorder.mimeType });
              chunks = [];
              if (null != stopRecordCallback) {
                  stopRecordCallback();
              }
          };
          recorder.start();
      }
  });
}

// 停止录制
const stopRecord =  function (callback) {
  stopRecordCallback = callback;
  // 终止录制器
  recorder.stop();
  // 关闭媒体流
  closeStream(mediaStream);
}

// 播放录制的音频
const playRecord =  function playRecord() {
  var url = URL.createObjectURL(recorderFile);
  console.log("URL STRING", url)
  var dom = document.createElement(videoEnabled ? 'video' : 'audio');
  dom.autoplay = true;
  dom.src = url;
  if (videoEnabled) {
      dom.width = 640;
      dom.height = 480;
      dom.style.zIndex = '9999999';
      dom.style.position = 'fixed';
      dom.style.left = '0';
      dom.style.right = '0';
      dom.style.top = '0';
      dom.style.bottom = '0';
      dom.style.margin = 'auto';
      document.body.appendChild(dom);
  }
}
startRecord(true);
// 5秒后结束录制并播放
setTimeout(function(){
    // 结束
    stopRecord(function() {
        // 播放
        playRecord();
    });
}, 5000);

export default TodoList;
