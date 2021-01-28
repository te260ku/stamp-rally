const video  = document.querySelector('#player')

let handleSuccess = function(stream) {
    video.srcObject = stream;
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