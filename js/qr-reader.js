const video  = $("#camera"); 
const canvas = $("#picture");
const ctx = canvas.getContext("2d");

window.onload = () => {
  /** カメラ設定 */
  const constraints = {
    audio: false,
    video: {
      width: 300,
      height: 200,
      facingMode: "user"   // フロントカメラを利用する
    }
  };

  /**
   * カメラを<video>と同期
   */
   navigator.mediaDevices.getUserMedia(constraints)
  .then( (stream) => {
    video.srcObject = stream;
    video.onloadedmetadata = (e) => {
      video.play();

      // QRコードのチェック開始
      checkPicture();
    };
  })
  .catch( (err) => {
    console.log(err.name + ": " + err.message);
  });
};

/**
 * QRコードの読み取り
 */
function checkPicture(){
  // カメラの映像をCanvasに描画
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // QRコードの読み取り
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const code = jsQR(imageData.data, canvas.width, canvas.height);

  //----------------------
  // 存在する場合
  //----------------------
  if( code ){
    // 結果を表示
    setQRResult("#result", code.data);  // 文字列

  }
  //----------------------
  // 存在しない場合
  //----------------------
  else{
    // 0.3秒後にもう一度チェックする
    setTimeout( () => {
      checkPicture();
    }, 300);
  }
}




/**
 * QRコードの読み取り結果を表示する
 *
 * @param {String} id
 * @param {String} data
 * @return {void}
 */
function setQRResult(id, data){
  $(id).innerHTML = escapeHTML(data);
}

/**
 * jQuery style wrapper
 *
 * @param {string} selector
 * @return {Object}
 */
 function $(selector){
  return( document.querySelector(selector) );
}

/**
 * HTML表示用に文字列をエスケープする
 *
 * @param {string} str
 * @return {string}
 */
function escapeHTML(str){
  let result = "";
  result = str.replace("&", "&amp;");
  result = str.replace("'", "&#x27;");
  result = str.replace("`", "&#x60;");
  result = str.replace('"', "&quot;");
  result = str.replace("<", "&lt;");
  result = str.replace(">", "&gt;");
  result = str.replace(/\n/, "<br>");

  return(result);
}