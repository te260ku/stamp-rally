var detectionCount = 0;



AFRAME.registerComponent('registerevents', {
    init: function () {
        var marker = this.el;

        // マーカーを検出したイベントの登録
        marker.addEventListener('markerFound', function () {
            var markerId = marker.id;
            // console.log('markerFound', markerId);

            // アニメーションの開始
            // document.querySelector('#box').emit('markerfound');
            detectionCount ++;
            console.log(detectionCount);

            
        });

        // マーカーを見失ったイベントの登録
        marker.addEventListener('markerLost', function () {
            var markerId = marker.id;
            // console.log('markerLost', markerId);

            // アニメーションの停止
            // document.querySelector('#box').emit('markerlost');
        });
    }
});