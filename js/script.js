const video = document.querySelector("#js-video")

navigator.mediaDevices
    .getUserMedia({
        audio: false, 
        video: {
            facingMode: {
                exact: "environment"
            }
        }
    })
    .then(function(stream) {
        video.srcObject = stream
        video.onloadedemetadata = function(e) {
            video.play()
        }
    })
    .catch(function(err) {
        alert("Error");
    })