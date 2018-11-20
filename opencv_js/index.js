var videoStream;
var canvasFrame;
var canvasOutput;
var context;
var src;
var dst;
const fps=30;

function onOpenCVReady(){
  let opencvReadyMessage = document.getElementById("opencvLoad");
  opencvReadyMessage.innerHTML="OpenCV is Loaded now";
  startVideo();
}

function startVideo(){
  videoStream=document.getElementById("camera");
  if(navigator.getUserMedia){
    navigator.mediaDevices.getUserMedia({video:true,audio:false})
    .then(function(stream){
      videoStream.srcObject=stream;
      videoStream.play();  
      processVideo();
    }).catch(function(error){
      console.log("error:"+error);
    });
  }
}
function processVideo(){
  canvasFrame=document.getElementById("canvasFrame");
  context=canvasFrame.getContext("2d");
  src=new cv.Mat(canvasFrame.clientHeight,canvasFrame.clientWidth,cv.CV_8UC4);
  dst= new cv.Mat(canvasFrame.clientHeight,canvasFrame.clientWidth,cv.CV_8UC1);  
  let being = Date.now();
  context.drawImage(videoStream,0,0,videoStream.width,videoStream.height);
  src.data.set(context.getImageData(0,0,videoStream.width,videoStream.height).data);
  cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
  cv.imshow("canvasOuput",dst);
  
}

