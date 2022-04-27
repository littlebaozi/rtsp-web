const express = require('express');
const expressWebSocket = require("express-ws");
import ffmpeg from "fluent-ffmpeg";
import webSocketStream from "websocket-stream/stream";

function localServer() {
  let app = express();
  app.use(express.static(__dirname));
  // extend express app with app.ws()
  expressWebSocket(app, null, {
    perMessageDeflate: true
  });
  app.ws("/rtsp/:id", rtspRequestHandle)
  app.listen(8888);
  console.log("express listened")
}

function rtspRequestHandle(ws, req) {
  console.log("rtsp request handle");
  // convert ws instance to stream
  const stream = webSocketStream(ws, {
    binary: true,
    browserBufferTimeout: 1000000
  }, {
    browserBufferTimeout: 1000000
  });
  let url = decodeURIComponent(req.query.url);
  console.log("rtsp url:", url);
  console.log("rtsp params:", req.params);
  
  // ffmpet转码
  let ffmpegCommand = ffmpeg(url)
    .addInputOption("-rtsp_transport", "tcp", "-buffer_size", "102400")  // 这里可以添加一些 RTSP 优化的参数
    .on("start", function () {
      console.log(url, "Stream started.");
      ws.send('')
    })
    .on("codecData", function () {
      console.log(url, "Stream codecData.")
      // 摄像机在线处理
    })
    .on("error", function (err) {
      console.log(url, "An error occured: ", err.message);
      stream.end();
    })
    .on("end", function () {
      console.log(url, "Stream end!");
      stream.end();
      // 摄像机断线的处理
    })
    .outputFormat("flv").videoCodec("copy").noAudio(); // 输出格式flv 无音频

  stream.on("close", function () {
    ffmpegCommand.kill('SIGKILL');
  });
  try {
    ffmpegCommand.pipe(stream);
  } catch (error) {
    console.log(error);
  }
 
}

localServer()