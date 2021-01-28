const video = document.getElementById('player');
const snapshotCanvas = document.getElementById('snapshot');
const width = snapshotCanvas.width;
const height = snapshotCanvas.height;

let handleSuccess = function(stream) {
    video.srcObject = stream;

    startScan((scanResult) => {
        // このページの呼び出し元に読み取り結果を返す
    });
};


let startScan = function(callback) {
    const canvasContext = snapshotCanvas.getContext("2d");
    // 500ms間隔でスナップショットを取得し、QRコードの読み取りを行う
    let intervalHandler = setInterval(() => {
      canvasContext.drawImage(video, 0, 0, width, height);
      const imageData = canvasContext.getImageData(0, 0, width, height);
      const scanResult = jsQR(imageData.data, imageData.width, imageData.height);

      if (scanResult) {
        clearInterval(intervalHandler);
        console.log(scanResult);

        if (callback) {
          callback(scanResult);
        }
      }
    }, 500)
  };

navigator.mediaDevices
    .getUserMedia({
        audio: false,
        video: {facingMode: "environment"},
    })
    .then(handleSuccess)
    .catch(function(err) {
        alert('Error!!')
    })
    